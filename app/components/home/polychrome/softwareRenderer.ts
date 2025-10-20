const sin = Math.sin
const cos = Math.cos
const sqrt = Math.sqrt
const exp = Math.exp
const pow = Math.pow
const floor = Math.floor
const hypot = Math.hypot

function fract(value: number) {
  return value - floor(value)
}

function hash(i: number, j: number) {
  return fract(sin(((i * 127.1) + (j * 311.7)) + 134.1) * 43758.5453123)
}

function rand2x(i: number, j: number) {
  return fract(sin((i * 269.5) + (j * 183.3)) * 43758.5453123)
}

function rand2y(i: number, j: number) {
  return fract(sin((i * 113.5) + (j * 271.9)) * 43758.5453123)
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function renderPolychromeCaustics(
  buffer: Uint8ClampedArray,
  width: number,
  height: number,
  time: number,
  intensity: number,
  quality: number,
) {
  const invW = 1 / width
  const invH = 1 / height
  const scale = 8.5 * quality
  let pointer = 0

  for (let y = 0; y < height; y++) {
    const py = (y + 0.5) * invH * scale

    for (let x = 0; x < width; x++) {
      const px = (x + 0.5) * invW * scale
      const ix = floor(px)
      const iy = floor(py)
      const fx = px - ix
      const fy = py - iy

      let f1 = 1e9
      let f2 = 1e9

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const cx = ix + ox
          const cy = iy + oy
          const rx = rand2x(cx, cy)
          const ry = rand2y(cx, cy)
          const phase = hash(cx, cy) * Math.PI * 2
          const offx = sin((time * 1.2) + phase) * 0.28
          const offy = cos((time * 1.35) + phase) * 0.28
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

      const d1 = sqrt(f1)
      const d2s = sqrt(f2)
      const diff = d2s - d1
      const center = 0.09
      const sigma = 0.045
      const diffCentered = diff - center
      let edge = exp(-((diffCentered * diffCentered) / (2 * sigma * sigma)))

      edge = pow(edge, 0.85)
      const alphaMask = clamp(edge * (0.5 + (intensity * 0.7)))

      buffer[pointer++] = 235
      buffer[pointer++] = 245
      buffer[pointer++] = 255
      buffer[pointer++] = Math.floor(alphaMask * 255)
    }
  }
}

export function renderPolychromeAlt(
  buffer: Uint8ClampedArray,
  width: number,
  height: number,
  timeSeconds: number,
  intensity: number,
  quality: number,
) {
  const invW = 1 / width
  const invH = 1 / height
  const minDim = Math.min(width, height)
  const grid = Math.max(16, Math.floor(minDim / 6))
  const scale = quality * 250
  const holoX = clamp(intensity)
  const holoY = clamp(intensity)
  const time = (holoY * 7.221) + timeSeconds
  let pointer = 0

  for (let y = 0; y < height; y++) {
    const py = (y + 0.5) * invH

    for (let x = 0; x < width; x++) {
      const px = (x + 0.5) * invW
      const field = holographicField(px, py, time, grid, scale)
      const res = 0.5 + (0.5 * Math.cos((holoX * 2.612) + ((field - 0.5) * Math.PI)))
      const center = 0.92
      const sigma = 0.07
      const diff = res - center
      let alpha = exp(-((diff * diff) / (2 * sigma * sigma)))

      alpha = pow(alpha, 0.85) * (0.45 + (intensity * 0.8))
      alpha = clamp(alpha)

      buffer[pointer++] = 225
      buffer[pointer++] = 238
      buffer[pointer++] = 255
      buffer[pointer++] = Math.floor(alpha * 255)
    }
  }
}

function holographicField(px: number, py: number, t: number, grid: number, scale: number) {
  const uQuantized = Math.floor(px * grid) / grid
  const vQuantized = Math.floor(py * grid) / grid
  const cx = (uQuantized - 0.5) * scale
  const cy = (vQuantized - 0.5) * scale

  const fp1x = cx + (50 * sin(-(t / 143.6340)))
  const fp1y = cy + (50 * cos(-(t / 99.4324)))
  const fp2x = cx + (50 * cos(t / 53.1532))
  const fp2y = cy + (50 * cos(t / 61.4532))
  const fp3x = cx + (50 * sin(-(t / 87.53218)))
  const fp3y = cy + (50 * sin(-(t / 49.0)))

  const len1 = hypot(fp1x, fp1y)
  const len2 = hypot(fp2x, fp2y)
  const len3 = hypot(fp3x, fp3y)

  const term1 = cos(len1 / 19.483)
  const term2 = sin(len2 / 33.155) * cos(fp2y / 15.73)
  const term3 = cos(len3 / 27.193) * sin(fp3x / 21.92)

  return (1 + (term1 + term2 + term3)) * 0.5
}
