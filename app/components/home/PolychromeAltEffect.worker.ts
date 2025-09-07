/**
 * Dedicated worker for caustics rendering. Uses OffscreenCanvas when provided.
 * Messages :
 * - init { canvas, width, height, fps, quality }
 * - resize { width, height }
 * - setIntensity { intensity }
 * - start
 * - stop
 */

let ctx: OffscreenCanvasRenderingContext2D | null = null
let width = 0
let height = 0
let running = false
let fps = 30
let frameInterval = 1000 / fps
let intensity = 0
let quality = 1
let lastTime = 0

// utility helpers
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

// Shader-inspired dynamic field from Balatro holographic shader
function holographicField(px: number, py: number, t: number, grid: number, scale: number) {
  // uv in [0..1]
  // quantize like shader floors by texture grid to stabilize
  const uQuantized = Math.floor(px * grid) / grid
  const vQuantized = Math.floor(py * grid) / grid
  // center and scale
  const cx = (uQuantized - 0.5) * scale
  const cy = (vQuantized - 0.5) * scale

  const fp1x = cx + (50 * Math.sin(-(t / 143.6340)))
  const fp1y = cy + (50 * Math.cos(-(t / 99.4324)))
  const fp2x = cx + (50 * Math.cos(t / 53.1532))
  const fp2y = cy + (50 * Math.cos(t / 61.4532))
  const fp3x = cx + (50 * Math.sin(-(t / 87.53218)))
  const fp3y = cy + (50 * Math.sin(-(t / 49.0)))

  const len1 = Math.hypot(fp1x, fp1y)
  const len2 = Math.hypot(fp2x, fp2y)
  const len3 = Math.hypot(fp3x, fp3y)

  const term1 = Math.cos(len1 / 19.483)
  const term2 = Math.sin(len2 / 33.155) * Math.cos(fp2y / 15.73)
  const term3 = Math.cos(len3 / 27.193) * Math.sin(fp3x / 21.92)
  // field in [0..1]
  const field = (1 + (term1 + term2 + term3)) / 2

  return field
}

function drawFrame(now: number) {
  if (!running || !ctx) {
    return
  }

  if (now - lastTime < frameInterval) {
    // schedule next
    setTimeout(() => {
      drawFrame(performance.now())
    }, Math.max(0, frameInterval - (now - lastTime)))

    return
  }

  lastTime = now
  const img = ctx.createImageData(width, height)
  const data = img.data
  const invW = 1 / width
  const invH = 1 / height
  let pointer = 0

  // Grid and scale parameters derived from the Balatro holographic shader
  // Larger scale -> wider swirls, grid controls quantization stability
  const GRID = Math.max(16, Math.floor(Math.min(width, height) / 6))
  const SCALE = 250 * quality

  // holo uniforms approximation
  // driven by proximity/intensity (0..1)
  const holoX = clamp(intensity)
  const holoY = clamp(intensity)
  const tSeconds = (holoY * 7.221) + (now / 1000)

  for (let y = 0; y < height; y++) {
    const py = (y + 0.5) * invH

    for (let x = 0; x < width; x++) {
      const px = (x + 0.5) * invW

      // compute shader-like field
      const field = holographicField(px, py, tSeconds, GRID, SCALE)
      // res per shader: (.5 + .5*cos(holo.x*2.612 + (field - .5)*PI))
      const res = 0.5 + (0.5 * Math.cos((holoX * 2.612) + ((field - 0.5) * Math.PI)))

      // Shape into bright, silky lines with soft falloff
      // Peak around res ~ 1.0, with sigma controlling width
      const center = 0.92
      const sigma = 0.07
      let alphaMask = Math.exp(-(((res - center) * (res - center)) / (2 * sigma * sigma)))

      // amplify with intensity and quality
      alphaMask = Math.pow(alphaMask, 0.85) * (0.45 + (intensity * 0.8))
      alphaMask = clamp(alphaMask, 0, 1)

      // subtle holographic tint
      data[pointer++] = 225
      data[pointer++] = 238
      data[pointer++] = 255
      data[pointer++] = Math.floor(alphaMask * 255)
    }
  }

  ctx.clearRect(0, 0, width, height)
  ctx.putImageData(img, 0, 0)

  setTimeout(() => {
    drawFrame(performance.now())
  }, frameInterval)
}

addEventListener("message", (e: MessageEvent) => {
  const msg = e.data

  switch (msg.type) {
    case "init": {
      // oxlint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      const canvas = msg.canvas as OffscreenCanvas

      fps = Math.max(10, Math.min(60, msg.fps ?? 30))
      frameInterval = 1000 / fps
      quality = typeof msg.quality === "number"
        ? msg.quality
        : 1
      ctx = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      })
      width = msg.width
      height = msg.height
      running = true
      lastTime = 0
      setTimeout(() => {
        drawFrame(performance.now())
      }, frameInterval)

      break
    }
    case "resize": {
      width = msg.width
      height = msg.height

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
    case "default": {
      break
    }
  }
})
