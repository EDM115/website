/* oxlint-disable typescript-eslint/no-unnecessary-type-assertion */

const BUFFER_CAPACITY: i32 = 4 * 1024 * 1024
const GRID_SIZE: i32 = 128
const CHANNELS: i32 = 4
const OFFSETS_SIZE: i32 = 6
const outputBuffer = new StaticArray<u8>(BUFFER_CAPACITY)
const fieldGrid = new StaticArray<f32>(GRID_SIZE * GRID_SIZE * CHANNELS)
const polychromeOffsets = new StaticArray<f32>(OFFSETS_SIZE)
const holographicOffsets = new StaticArray<f32>(OFFSETS_SIZE)
const TAU: f32 = Mathf.PI * 2.0

function fract(value: f32): f32 {
  return value - Mathf.floor(value)
}

function clamp(value: f32, minimum: f32 = 0.0, maximum: f32 = 1.0): f32 {
  return Mathf.min(maximum, Mathf.max(minimum, value))
}

function lerp(from: f32, to: f32, amount: f32): f32 {
  return from + ((to - from) * amount)
}

function spectralRed(hue: f32): f32 {
  return 0.5 + (0.5 * Mathf.cos(TAU * hue))
}

function spectralGreen(hue: f32): f32 {
  return 0.5 + (0.5 * Mathf.cos(TAU * (hue - (1.0 / 3.0))))
}

function spectralBlue(hue: f32): f32 {
  return 0.5 + (0.5 * Mathf.cos(TAU * (hue - (2.0 / 3.0))))
}

function writeGridPixel(pointer: i32, hue: f32, brightness: f32, white: f32, alpha: f32): void {
  unchecked(fieldGrid[pointer] = clamp(lerp(spectralRed(hue) * brightness, 1.0, white)) * 255.0)
  unchecked(fieldGrid[pointer + 1] = clamp(lerp(spectralGreen(hue) * brightness, 1.0, white)) * 255.0)
  unchecked(fieldGrid[pointer + 2] = clamp(lerp(spectralBlue(hue) * brightness, 1.0, white)) * 255.0)
  unchecked(fieldGrid[pointer + 3] = clamp(alpha) * 255.0)
}

function setFieldOffsets(offsets: StaticArray<f32>, time: f32): void {
  unchecked(offsets[0] = 50.0 * Mathf.sin(-(time / 143.6340)))
  unchecked(offsets[1] = 50.0 * Mathf.cos(-(time / 99.4324)))
  unchecked(offsets[2] = 50.0 * Mathf.cos(time / 53.1532))
  unchecked(offsets[3] = 50.0 * Mathf.cos(time / 61.4532))
  unchecked(offsets[4] = 50.0 * Mathf.sin(-(time / 87.53218)))
  unchecked(offsets[5] = 50.0 * Mathf.sin(-(time / 49.0)))
}

function holographicField(u: f32, v: f32, scale: f32, offsets: StaticArray<f32>): f32 {
  const centerX: f32 = (u - 0.5) * scale
  const centerY: f32 = (v - 0.5) * scale
  const fieldPart1X: f32 = centerX + unchecked(offsets[0])
  const fieldPart1Y: f32 = centerY + unchecked(offsets[1])
  const fieldPart2X: f32 = centerX + unchecked(offsets[2])
  const fieldPart2Y: f32 = centerY + unchecked(offsets[3])
  const fieldPart3X: f32 = centerX + unchecked(offsets[4])
  const fieldPart3Y: f32 = centerY + unchecked(offsets[5])
  const term1: f32 = Mathf.cos(Mathf.sqrt((fieldPart1X * fieldPart1X) + (fieldPart1Y * fieldPart1Y)) / 19.483)
  const term2: f32 = Mathf.sin(Mathf.sqrt((fieldPart2X * fieldPart2X) + (fieldPart2Y * fieldPart2Y)) / 33.155) * Mathf.cos(fieldPart2Y / 15.73)
  const term3: f32 = Mathf.cos(Mathf.sqrt((fieldPart3X * fieldPart3X) + (fieldPart3Y * fieldPart3Y)) / 27.193) * Mathf.sin(fieldPart3X / 21.92)

  return (1.0 + term1 + term2 + term3) * 0.5
}

function rasterizeGrid(width: i32, height: i32): void {
  const gridMaximum: i32 = GRID_SIZE - 1
  const widthMaximum: f32 = f32(Math.max(1, width - 1))
  const heightMaximum: f32 = f32(Math.max(1, height - 1))
  let pointer = 0

  for (let y = 0; y < height; y++) {
    const gridY: f32 = (f32(y) * f32(gridMaximum)) / heightMaximum
    const y0: i32 = i32(Mathf.floor(gridY))
    const y1: i32 = y0 < gridMaximum
      ? y0 + 1
      : gridMaximum
    const blendY: f32 = gridY - f32(y0)
    const row0: i32 = y0 * GRID_SIZE * CHANNELS
    const row1: i32 = y1 * GRID_SIZE * CHANNELS

    for (let x = 0; x < width; x++) {
      const gridX: f32 = (f32(x) * f32(gridMaximum)) / widthMaximum
      const x0: i32 = i32(Mathf.floor(gridX))
      const x1: i32 = x0 < gridMaximum
        ? x0 + 1
        : gridMaximum
      const blendX: f32 = gridX - f32(x0)
      const topLeft: i32 = row0 + (x0 * CHANNELS)
      const topRight: i32 = row0 + (x1 * CHANNELS)
      const bottomLeft: i32 = row1 + (x0 * CHANNELS)
      const bottomRight: i32 = row1 + (x1 * CHANNELS)

      for (let channel = 0; channel < CHANNELS; channel++) {
        const top: f32 = lerp(unchecked(fieldGrid[topLeft + channel]), unchecked(fieldGrid[topRight + channel]), blendX)
        const bottom: f32 = lerp(unchecked(fieldGrid[bottomLeft + channel]), unchecked(fieldGrid[bottomRight + channel]), blendX)
        const value: f32 = lerp(top, bottom, blendY)

        unchecked(outputBuffer[pointer++] = <u8>Mathf.floor(value + 0.5))
      }
    }
  }
}

export function getBufferPointer(): i32 {
  return changetype<i32>(outputBuffer)
}

export function getBufferCapacity(): i32 {
  return BUFFER_CAPACITY
}

export function render(width: i32, height: i32, timeSeconds: f32, intensity: f32, quality: f32, pointerX: f32, pointerY: f32): i32 {
  if (width <= 0 || height <= 0) {
    return 0
  }

  const total = width * height * CHANNELS

  if (total > BUFFER_CAPACITY) {
    return -1
  }

  const gridMaximum: f32 = f32(GRID_SIZE - 1)
  const polychromeScale: f32 = quality * 50.0
  const holographicScale: f32 = quality * 250.0
  const interaction: f32 = clamp(intensity)
  const lightX: f32 = clamp(pointerX)
  const lightY: f32 = clamp(pointerY)

  setFieldOffsets(polychromeOffsets, timeSeconds + (lightY * 2.221))
  setFieldOffsets(holographicOffsets, timeSeconds + (lightY * 7.221))

  let pointer = 0

  for (let gridY = 0; gridY < GRID_SIZE; gridY++) {
    const v: f32 = f32(gridY) / gridMaximum

    for (let gridX = 0; gridX < GRID_SIZE; gridX++) {
      const u: f32 = f32(gridX) / gridMaximum
      const polychromeField: f32 = holographicField(u, v, polychromeScale, polychromeOffsets)
      const holographicFieldValue: f32 = holographicField(u, v, holographicScale, holographicOffsets)
      const polychrome: f32 = 0.5 + (0.5 * Mathf.cos((lightX * 2.612) + ((polychromeField - 0.5) * Mathf.PI)))
      const holographic: f32 = 0.5 + (0.5 * Mathf.cos((lightX * 2.612) + ((holographicFieldValue - 0.5) * Mathf.PI)))
      const gridScale: f32 = 0.79
      const diagonalA: f32 = Mathf.max(0.0, (7.0 * Mathf.cos((v * gridScale * 45.0) + (u * gridScale * 20.0))) - 6.0)
      const diagonalB: f32 = Mathf.max(0.0, (7.0 * Mathf.cos((v * gridScale * 45.0) - (u * gridScale * 20.0))) - 6.0)
      const vertical: f32 = Mathf.max(0.0, (7.0 * Mathf.abs(Mathf.cos(u * gridScale * 20.0))) - 6.0)
      const lattice: f32 = 0.5 * Mathf.max(vertical, Mathf.max(diagonalA, diagonalB))
      const edgeDistance: f32 = Mathf.max(Mathf.abs((u - 0.5) * 2.0), Mathf.abs((v - 0.5) * 2.0))
      const edgeRamp: f32 = clamp((edgeDistance - 0.42) / 0.58)
      const edgeEmphasis: f32 = edgeRamp * edgeRamp * (3.0 - (2.0 * edgeRamp))
      const hue: f32 = fract(polychrome + (holographic * 0.34) + (lattice * 0.18) + (timeSeconds * 0.04))
      const white: f32 = clamp((lattice * 0.34) + (Mathf.pow(holographic, 10.0) * 0.16))
      const brightness: f32 = 0.42 + (polychrome * 0.18) + (holographic * 0.08) + (lattice * 0.10) + (edgeEmphasis * 0.08)
      const alpha: f32 = ((0.22 + (interaction * 0.38)) * (0.28 + (polychrome * 0.18) + (holographic * 0.14) + (lattice * 0.22))) + (edgeEmphasis * 0.10)

      writeGridPixel(pointer, hue, brightness, white, alpha)
      pointer += CHANNELS
    }
  }

  rasterizeGrid(width, height)

  return total
}
