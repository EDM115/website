/**
 * Dedicated worker for caustics rendering. Uses WebAssembly when available with a software fallback that mirrors the shader-inspired effect.
 * Messages :
 * - init { canvas, width, height, fps, quality }
 * - resize { width, height }
 * - setIntensity { intensity }
 * - start
 * - stop
 */

import {
  loadStandardPolychromeWasm, type PolychromeWasmInstance,
} from "./polychrome/wasmLoader"
import { renderPolychromeCaustics } from "./polychrome/softwareRenderer"

interface InitMessage {
  type: "init";
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  fps: number;
  quality: number;
}

interface ResizeMessage {
  type: "resize";
  width: number;
  height: number;
}

interface SetIntensityMessage {
  type: "setIntensity";
  intensity: number;
}

interface StartMessage { type: "start" }

interface StopMessage { type: "stop" }

type Message = InitMessage | ResizeMessage | SetIntensityMessage | StartMessage | StopMessage

let ctx: OffscreenCanvasRenderingContext2D | null = null
let width = 0
let height = 0
let running = false
let fps = 60
let frameInterval = 1000 / fps
let tCaustics = 0
let intensity = 0
let quality = 1
let lastTime = 0

let wasmPromise: Promise<PolychromeWasmInstance | null> | null = null
let wasmInstance: PolychromeWasmInstance | null = null
let wasmPointer = 0
let wasmCapacity = 0
let wasmBytes = 0
let wasmBuffer: Uint8ClampedArray | null = null
let wasmImage: ImageData | null = null
let wasmSupported = true

let fallbackImage: ImageData | null = null
let fallbackBuffer: Uint8ClampedArray | null = null

function startLoadingWasm() {
  if (wasmPromise || !wasmSupported) {
    return
  }

  wasmPromise = loadStandardPolychromeWasm()
    .then((instance) => {
      if (!instance) {
        wasmSupported = false

        return null
      }

      wasmInstance = instance
      wasmPointer = instance.getBufferPointer()
      wasmCapacity = instance.getBufferCapacity()

      return instance
    })
    .catch(() => {
      wasmSupported = false

      return null
    })
}

function tryPrepareWasm(): boolean {
  if (!wasmSupported || !wasmInstance) {
    return false
  }

  const required = width * height * 4

  if (required <= 0 || required > wasmCapacity) {
    return false
  }

  const memoryBuffer = wasmInstance.memory.buffer as ArrayBuffer

  if (!wasmBuffer || wasmBytes !== required) {
    const bufferView = new Uint8ClampedArray(memoryBuffer, wasmPointer, required) as Uint8ClampedArray<ArrayBuffer>

    wasmBuffer = bufferView
    wasmImage = new ImageData(bufferView, width, height)
    wasmBytes = required
  } else if (!wasmImage || wasmImage.width !== width || wasmImage.height !== height) {
    const bufferView = new Uint8ClampedArray(memoryBuffer, wasmPointer, required) as Uint8ClampedArray<ArrayBuffer>

    wasmBuffer = bufferView
    wasmImage = new ImageData(bufferView, width, height)
    wasmBytes = required
  }

  return Boolean(wasmImage)
}

function resetBuffers() {
  wasmBuffer = null
  wasmImage = null
  wasmBytes = 0
  fallbackImage = null
  fallbackBuffer = null
}

function ensureFallbackBuffers(context: OffscreenCanvasRenderingContext2D) {
  if (!fallbackImage || fallbackImage.width !== width || fallbackImage.height !== height) {
    fallbackImage = context.createImageData(width, height)
    fallbackBuffer = fallbackImage.data
  }
}

function scheduleNext() {
  setTimeout(() => {
    drawFrame(performance.now())
  }, frameInterval)
}

function drawFrame(now: number) {
  if (!running || !ctx) {
    return
  }

  const delta = now - lastTime

  if (delta < frameInterval) {
    setTimeout(() => {
      drawFrame(performance.now())
    }, Math.max(0, frameInterval - delta))

    return
  }

  lastTime = now
  tCaustics += 0.03

  if (wasmInstance && tryPrepareWasm()) {
    const bytesWritten = wasmInstance.render(width, height, tCaustics, intensity, quality)

    if (bytesWritten > 0 && wasmImage) {
      ctx.putImageData(wasmImage, 0, 0)
      scheduleNext()

      return
    }

    if (bytesWritten < 0) {
      // Canvas is larger than the preallocated buffer, fall back to JS renderer.
      wasmSupported = false
      wasmInstance = null
      wasmPromise = null
      wasmBuffer = null
      wasmImage = null
    }
  }

  ensureFallbackBuffers(ctx)

  if (!fallbackBuffer || !fallbackImage) {
    scheduleNext()

    return
  }

  renderPolychromeCaustics(fallbackBuffer, width, height, tCaustics, intensity, quality)
  ctx.putImageData(fallbackImage, 0, 0)
  scheduleNext()
}

addEventListener("message", (e: MessageEvent<Message>) => {
  const msg = e.data

  switch (msg.type) {
    case "init": {
      const canvas = msg.canvas

      fps = Math.max(10, Math.min(60, msg.fps))
      frameInterval = 1000 / fps
      quality = msg.quality
      ctx = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      })
      width = msg.width
      height = msg.height
      running = true
      lastTime = 0
      startLoadingWasm()
      setTimeout(() => {
        drawFrame(performance.now())
      }, frameInterval)

      break
    }
    case "resize": {
      width = msg.width
      height = msg.height
      resetBuffers()

      // nothing else to do, next frame will draw at new size
      break
    }
    case "setIntensity": {
      intensity = Math.max(0, Math.min(1, msg.intensity))

      break
    }
    case "start": {
      if (!running) {
        running = true
        lastTime = 0
        setTimeout(() => {
          drawFrame(performance.now())
        }, frameInterval)
      }

      break
    }
    case "stop": {
      running = false

      break
    }
    default: {
      break
    }
  }
})
