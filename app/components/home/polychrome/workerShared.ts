import type {
  PolychromeWasmInstance,
  PolychromeWorkerMessage,
  PolychromeWorkerConfig,
  FallbackBuffers,
} from "~/types"

export function setupPolychromeWorker<State>(config: PolychromeWorkerConfig<State>) {
  let ctx: OffscreenCanvasRenderingContext2D | null = null
  let width = 0
  let height = 0
  let running = false
  let fps = 60
  let frameInterval = 1000 / fps
  let intensity = 0
  let pointerX = 0.5
  let pointerY = 0.5
  let quality = 1
  let baseURL = "/"
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null
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

    wasmPromise = config.loadWasm(baseURL)
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

    const memoryBuffer = wasmInstance.memory.buffer

    if (!wasmBuffer || wasmBytes !== required) {
      const bufferView = new Uint8ClampedArray(memoryBuffer, wasmPointer, required)

      wasmBuffer = bufferView
      wasmImage = new ImageData(bufferView, width, height)
      wasmBytes = required
    } else if (!wasmImage || wasmImage.width !== width || wasmImage.height !== height) {
      const bufferView = new Uint8ClampedArray(memoryBuffer, wasmPointer, required)

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

  function scheduleNext(delay: number) {
    timer = setTimeout(() => {
      timer = null
      drawFrame(performance.now())
    }, delay)
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
      const bytesWritten = wasmInstance.render(width, height, renderTime, intensity, quality, pointerX, pointerY)

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
          config.fallbackRenderer(buffers.buffer, width, height, renderTime, intensity, quality, pointerX, pointerY)
          ctx.putImageData(buffers.image, 0, 0)
        }
      }
    }

    const elapsed = performance.now() - now

    scheduleNext(Math.max(0, frameInterval - elapsed))
  }

  addEventListener("message", (e: MessageEvent<PolychromeWorkerMessage>) => {
    const msg = e.data

    switch (msg.type) {
      case "init": {
        const canvas = msg.canvas

        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        fps = Math.max(10, Math.min(60, msg.fps))
        frameInterval = 1000 / fps
        quality = msg.quality
        baseURL = msg.baseURL
        canvas.width = msg.width
        canvas.height = msg.height
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
        scheduleNext(frameInterval)

        break
      }
      case "resize": {
        width = msg.width
        height = msg.height

        if (ctx) {
          ctx.canvas.width = width
          ctx.canvas.height = height
        }

        resetBuffers()

        break
      }
      case "setIntensity": {
        intensity = Math.max(0, Math.min(1, msg.intensity))
        pointerX = Math.max(0, Math.min(1, msg.pointerX))
        pointerY = Math.max(0, Math.min(1, msg.pointerY))

        break
      }
      case "start": {
        if (!running) {
          running = true
          lastTime = 0
          resetBuffers()
          startLoadingWasm()
          scheduleNext(frameInterval)
        }

        break
      }
      case "stop": {
        running = false

        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        break
      }
      default: {
        break
      }
    }
  })
}
