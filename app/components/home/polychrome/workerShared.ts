import type { PolychromeWasmInstance } from "./wasmLoader"

export interface PolychromeWorkerInitMessage {
  type: "init";
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  fps: number;
  quality: number;
}

export interface PolychromeWorkerResizeMessage {
  type: "resize";
  width: number;
  height: number;
}

export interface PolychromeWorkerSetIntensityMessage {
  type: "setIntensity";
  intensity: number;
}

export interface PolychromeWorkerControlMessage {
  type: "start" | "stop";
}

export type PolychromeWorkerMessage
  = | PolychromeWorkerInitMessage
    | PolychromeWorkerResizeMessage
    | PolychromeWorkerSetIntensityMessage
    | PolychromeWorkerControlMessage

export interface PolychromeWorkerConfig<State> {
  loadWasm: ()=> Promise<PolychromeWasmInstance | null>;
  fallbackRenderer: (
    buffer: Uint8ClampedArray,
    width: number,
    height: number,
    time: number,
    intensity: number,
    quality: number,
  )=> void;
  computeFrameTime: (now: number, state: State)=> number;
  createState: ()=> State;
}

interface FallbackBuffers {
  image: ImageData;
  buffer: Uint8ClampedArray;
}

export function setupPolychromeWorker<State>(config: PolychromeWorkerConfig<State>) {
  let ctx: OffscreenCanvasRenderingContext2D | null = null
  let width = 0
  let height = 0
  let running = false
  let fps = 60
  let frameInterval = 1000 / fps
  let intensity = 0
  let quality = 1
  let lastTime = 0
  let workerState = config.createState()

  let wasmPromise: Promise<PolychromeWasmInstance | null> | null = null
  let wasmInstance: PolychromeWasmInstance | null = null
  let wasmPointer = 0
  let wasmCapacity = 0
  let wasmBytes = 0
  let wasmBuffer: Uint8ClampedArray | null = null
  let wasmImage: ImageData | null = null
  let wasmSupported = true
  let hasSuccessfulWasmFrame = false

  let fallbackBuffers: FallbackBuffers | null = null

  function startLoadingWasm() {
    if (wasmPromise || !wasmSupported) {
      return
    }

    wasmPromise = config.loadWasm()
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
    fallbackBuffers = null
    hasSuccessfulWasmFrame = false
    workerState = config.createState()
  }

  function ensureFallbackBuffers(context: OffscreenCanvasRenderingContext2D | null): FallbackBuffers | null {
    if (!context) {
      return null
    }

    if (!fallbackBuffers || fallbackBuffers.image.width !== width || fallbackBuffers.image.height !== height) {
      const image = context.createImageData(width, height)

      fallbackBuffers = {
        image,
        buffer: image.data,
      }
    }

    return fallbackBuffers
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
    const renderTime = config.computeFrameTime(now, workerState)
    let renderedWithWasm = false

    if (wasmInstance && tryPrepareWasm()) {
      const bytesWritten = wasmInstance.render(width, height, renderTime, intensity, quality)

      if (bytesWritten > 0 && wasmImage) {
        ctx.putImageData(wasmImage, 0, 0)
        hasSuccessfulWasmFrame = true
        renderedWithWasm = true
      } else if (bytesWritten < 0) {
        wasmSupported = false
        wasmInstance = null
        wasmPromise = null
        wasmBuffer = null
        wasmImage = null
        hasSuccessfulWasmFrame = false
      }
    }

    if (!renderedWithWasm) {
      const shouldRenderFallback = !wasmSupported || !hasSuccessfulWasmFrame

      if (shouldRenderFallback) {
        const buffers = ensureFallbackBuffers(ctx)

        if (buffers) {
          config.fallbackRenderer(buffers.buffer, width, height, renderTime, intensity, quality)
          ctx.putImageData(buffers.image, 0, 0)
        }
      }
    }

    scheduleNext()
  }

  addEventListener("message", (e: MessageEvent<PolychromeWorkerMessage>) => {
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
        resetBuffers()
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
          resetBuffers()
          startLoadingWasm()
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
}
