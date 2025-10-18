const BUFFER_CAPACITY: i32 = 4 * 1024 * 1024
const outputBuffer = new StaticArray<u8>(BUFFER_CAPACITY)

function clamp(value: f32, min: f32 = 0.0, max: f32 = 1.0): f32 {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}

function holographicField(px: f32, py: f32, t: f32, grid: f32, scale: f32): f32 {
  const px64 = f64(px)
  const py64 = f64(py)
  const t64 = f64(t)
  const grid64 = f64(grid)
  const scale64 = f64(scale)

  const uQuantized = Math.floor(px64 * grid64) / grid64
  const vQuantized = Math.floor(py64 * grid64) / grid64
  const cx = (uQuantized - 0.5) * scale64
  const cy = (vQuantized - 0.5) * scale64

  const fp1x = cx + (50.0 * Math.sin(-t64 / 143.6340))
  const fp1y = cy + (50.0 * Math.cos(-t64 / 99.4324))
  const fp2x = cx + (50.0 * Math.cos(t64 / 53.1532))
  const fp2y = cy + (50.0 * Math.cos(t64 / 61.4532))
  const fp3x = cx + (50.0 * Math.sin(-t64 / 87.53218))
  const fp3y = cy + (50.0 * Math.sin(-t64 / 49.0))

  const len1 = Math.hypot(fp1x, fp1y)
  const len2 = Math.hypot(fp2x, fp2y)
  const len3 = Math.hypot(fp3x, fp3y)

  const term1 = Math.cos(len1 / 19.483)
  const term2 = Math.sin(len2 / 33.155) * Math.cos(fp2y / 15.73)
  const term3 = Math.cos(len3 / 27.193) * Math.sin(fp3x / 21.92)
  const field = (1.0 + (term1 + term2 + term3)) * 0.5

  return <f32>field
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

  const invW = <f32>(1.0 / f32(width))
  const invH = <f32>(1.0 / f32(height))
  const minDim = Mathf.min(f32(width), f32(height))
  const grid = Mathf.max(16.0, Mathf.floor(minDim / 6.0))
  const scale = <f32>(f64(quality) * 250.0)
  const holoX = clamp(intensity)
  const holoY = clamp(intensity)
  const tSeconds = <f32>((f64(holoY) * 7.221) + f64(time))
  let pointer = 0

  for (let y = 0; y < height; y++) {
    const py = <f32>((f32(y) + 0.5) * invH)

    for (let x = 0; x < width; x++) {
      const px = <f32>((f32(x) + 0.5) * invW)
      const field = holographicField(px, py, tSeconds, <f32>grid, scale)
      const res = <f32>(0.5 + (0.5 * Math.cos((f64(holoX) * 2.612) + ((f64(field) - 0.5) * Math.PI))))
      const center: f32 = 0.92
      const sigma: f32 = 0.07
      const diff = res - center
      let alpha = <f32>Math.exp(-((f64(diff) * f64(diff)) / (2.0 * f64(sigma) * f64(sigma))))

      alpha = Mathf.pow(alpha, 0.85) * (0.45 + (intensity * 0.8))
      alpha = clamp(alpha, 0.0, 1.0)
      const alphaByte = <u8>Mathf.floor((alpha * 255.0) + 0.5)

      unchecked(outputBuffer[pointer++] = 225)
      unchecked(outputBuffer[pointer++] = 238)
      unchecked(outputBuffer[pointer++] = 255)
      unchecked(outputBuffer[pointer++] = alphaByte)
    }
  }

  return total
}
