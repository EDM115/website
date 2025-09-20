/**
 * Dedicated worker for caustics rendering. Uses OffscreenCanvas when provided.
 * Messages :
 * - init { canvas, width, height, fps, quality }
 * - resize { width, height }
 * - setIntensity { intensity }
 * - start
 * - stop
 */

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

// small utility: fractional part
const fract = (v: number) => v - Math.floor(v)
// hash to 0..1
const hash1 = (i: number, j: number) => fract(Math.sin(((i * 127.1) + (j * 311.7)) + 134.1) * 43758.5453123)
// two randoms 0..1 per cell
const rand2 = (i: number, j: number) => {
  const fractA = fract(Math.sin((i * 269.5) + (j * 183.3)) * 43758.5453123)
  const fractB = fract(Math.sin((i * 113.5) + (j * 271.9)) * 43758.5453123)

  return [ fractA, fractB ] as const
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
  tCaustics += 0.03
  const img = ctx.createImageData(width, height)
  const data = img.data
  const invW = 1 / width
  const invH = 1 / height
  let pointer = 0

  // Scale controls how many cells across. Adjust slightly with quality.
  const SCALE = 8.5 * quality

  for (let y = 0; y < height; y++) {
    const py = (y + 0.5) * invH * SCALE

    for (let x = 0; x < width; x++) {
      const px = (x + 0.5) * invW * SCALE

      const ix = Math.floor(px)
      const iy = Math.floor(py)
      const fx = px - ix
      const fy = py - iy

      // track nearest and second-nearest distances (squared)
      let f1 = 1e9
      let f2 = 1e9

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const cx = ix + ox
          const cy = iy + oy
          const [ rx, ry ] = rand2(cx, cy)
          // subtle per-cell motion
          const ph = hash1(cx, cy) * Math.PI * 2
          const offx = Math.sin((tCaustics * 1.2) + ph) * 0.28
          const offy = Math.cos((tCaustics * 1.35) + ph) * 0.28
          const sx = (ox + rx + offx) - fx
          const sy = (oy + ry + offy) - fy
          const d2 = (sx * sx) + (sy * sy)

          if (d2 < f1) {
            f2 = f1
            f1 = d2
          } else if (d2 < f2) {
            f2 = d2
          }
        }
      }

      // Use Euclidean distances for smoother, rounder cells
      const d1 = Math.sqrt(f1)
      const d2s = Math.sqrt(f2)
      const diff = d2s - d1
      // Smooth, rounded edges via Gaussian shaping around a center
      const center = 0.09
      const sigma = 0.045
      let edge = Math.exp(-(((diff - center) * (diff - center)) / (2 * sigma * sigma)))

      // gentle softening
      edge = Math.pow(edge, 0.85)
      // final intensity, modulated by approach intensity for subtlety
      const alphaMask = Math.max(0.0, Math.min(1.0, edge * (0.5 + (intensity * 0.7))))

      data[pointer++] = 235
      data[pointer++] = 245
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
    default: {
      break
    }
  }
})
