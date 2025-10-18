/* oxlint-disable typescript-eslint/no-unnecessary-type-assertion */

// 4 MiB buffer for RGBA pixels
const BUFFER_CAPACITY: i32 = 4 * 1024 * 1024
const outputBuffer = new StaticArray<u8>(BUFFER_CAPACITY)

function fract(v: f32): f32 {
  return v - Mathf.floor(v)
}

function hash1(i: i32, j: i32): f32 {
  const fi = f32(i)
  const fj = f32(j)
  const value = Mathf.sin(((fi * 127.1) + (fj * 311.7)) + 134.1) * 43758.5453123

  return fract(value)
}

function rand2x(i: i32, j: i32): f32 {
  const fi = f32(i)
  const fj = f32(j)
  const value = Mathf.sin((fi * 269.5) + (fj * 183.3)) * 43758.5453123

  return fract(value)
}

function rand2y(i: i32, j: i32): f32 {
  const fi = f32(i)
  const fj = f32(j)
  const value = Mathf.sin((fi * 113.5) + (fj * 271.9)) * 43758.5453123

  return fract(value)
}

export function getBufferPointer(): i32 {
  return changetype<i32>(outputBuffer)
}

export function getBufferCapacity(): i32 {
  return BUFFER_CAPACITY
}

export function render(width: i32, height: i32, time: f32, intensity: f32, quality: f32): i32 {
  if (width <= 0 || height <= 0) {
    return 0
  }

  const total = width * height * 4

  if (total > BUFFER_CAPACITY) {
    return -1
  }

  const invW = 1.0 / f32(width)
  const invH = 1.0 / f32(height)
  let pointer = 0

  const scale = 8.5 * quality

  for (let y = 0; y < height; y++) {
    const py = (f32(y) + 0.5) * invH * scale

    for (let x = 0; x < width; x++) {
      const px = (f32(x) + 0.5) * invW * scale
      const ix = i32(Math.floor(f64(px)))
      const iy = i32(Math.floor(f64(py)))
      const fx = px - f32(ix)
      const fy = py - f32(iy)

      let f1: f32 = 1.0e9
      let f2: f32 = 1.0e9

      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          const cx = ix + ox
          const cy = iy + oy
          const rx = rand2x(cx, cy)
          const ry = rand2y(cx, cy)
          const phase = hash1(cx, cy) * Mathf.PI * 2.0
          const offx = Mathf.sin((time * 1.2) + phase) * 0.28
          const offy = Mathf.cos((time * 1.35) + phase) * 0.28
          const sx = (f32(ox) + rx + offx) - fx
          const sy = (f32(oy) + ry + offy) - fy
          const d2 = (sx * sx) + (sy * sy)

          if (d2 < f1) {
            f2 = f1
            f1 = <f32>d2
          } else if (d2 < f2) {
            f2 = <f32>d2
          }
        }
      }

      const d1 = Mathf.sqrt(f1)
      const d2s = Mathf.sqrt(f2)
      const diff = d2s - d1
      const center: f32 = 0.09
      const sigma: f32 = 0.045
      const diffCentered = diff - center
      let edge = Mathf.exp(-((diffCentered * diffCentered) / (2.0 * sigma * sigma)))

      edge = Mathf.pow(edge, 0.85)
      let alpha = edge * (0.5 + (intensity * 0.7))

      if (alpha < 0.0) {
        alpha = 0.0
      }

      if (alpha > 1.0) {
        alpha = 1.0
      }

      const alphaByte = <u8>Mathf.floor((alpha * 255.0) + 0.5)

      unchecked(outputBuffer[pointer++] = 235)
      unchecked(outputBuffer[pointer++] = 245)
      unchecked(outputBuffer[pointer++] = 255)
      unchecked(outputBuffer[pointer++] = alphaByte)
    }
  }

  return total
}
