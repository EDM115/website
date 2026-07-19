/* oxlint-disable typescript-eslint/no-unnecessary-type-assertion */

const BUFFER_CAPACITY: i32 = 4 * 1024 * 1024
const GRID_SIZE: i32 = 144
const CHANNELS: i32 = 4
const MAX_CAUSTIC_SITES: i32 = 32 * 32
const outputBuffer = new StaticArray<u8>(BUFFER_CAPACITY)
const fieldGrid = new StaticArray<f32>(GRID_SIZE * GRID_SIZE * CHANNELS)
const causticSitesX = new StaticArray<f32>(MAX_CAUSTIC_SITES)
const causticSitesY = new StaticArray<f32>(MAX_CAUSTIC_SITES)
const TAU: f32 = Mathf.PI * 2.0
let causticSiteColumns: i32 = 0
let causticSiteOriginX: i32 = 0
let causticSiteOriginY: i32 = 0

function fract(value: f32): f32 {
  return value - Mathf.floor(value)
}

function hash1(i: i32, j: i32): f32 {
  return fract(Mathf.sin(((f32(i) * 127.1) + (f32(j) * 311.7)) + 134.1) * 43758.5453123)
}

function rand2x(i: i32, j: i32): f32 {
  return fract(Mathf.sin((f32(i) * 269.5) + (f32(j) * 183.3)) * 43758.5453123)
}

function rand2y(i: i32, j: i32): f32 {
  return fract(Mathf.sin((f32(i) * 113.5) + (f32(j) * 271.9)) * 43758.5453123)
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

function prepareCausticSites(scale: f32, aspect: f32, time: f32): void {
  causticSiteOriginX = -1
  causticSiteOriginY = -1
  causticSiteColumns = i32(Mathf.ceil(scale * aspect)) + 3
  const rows: i32 = i32(Mathf.ceil(scale)) + 3

  for (let row = 0; row < rows; row++) {
    const cellY: i32 = causticSiteOriginY + row

    for (let column = 0; column < causticSiteColumns; column++) {
      const cellX: i32 = causticSiteOriginX + column
      const phase: f32 = hash1(cellX, cellY) * TAU
      const index: i32 = (row * causticSiteColumns) + column

      unchecked(causticSitesX[index] = f32(cellX) + rand2x(cellX, cellY) + (Mathf.sin((time * 1.2) + phase) * 0.28))
      unchecked(causticSitesY[index] = f32(cellY) + rand2y(cellX, cellY) + (Mathf.cos((time * 1.35) + phase) * 0.28))
    }
  }
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

export function render(width: i32, height: i32, time: f32, intensity: f32, quality: f32, pointerX: f32, pointerY: f32): i32 {
  if (width <= 0 || height <= 0) {
    return 0
  }

  const total = width * height * CHANNELS

  if (total > BUFFER_CAPACITY) {
    return -1
  }

  const gridMaximum: f32 = f32(GRID_SIZE - 1)
  const aspect: f32 = f32(width) / f32(height)
  const scale: f32 = 8.5 * quality
  const interaction: f32 = 0.35 + (clamp(intensity) * 0.65)
  const lightX: f32 = clamp(pointerX)
  const lightY: f32 = clamp(pointerY)
  let pointer = 0

  prepareCausticSites(scale, aspect, time)

  for (let gridY = 0; gridY < GRID_SIZE; gridY++) {
    const v: f32 = f32(gridY) / gridMaximum
    const positionY: f32 = v * scale

    for (let gridX = 0; gridX < GRID_SIZE; gridX++) {
      const u: f32 = f32(gridX) / gridMaximum
      const positionX: f32 = u * scale * aspect
      const cellX: i32 = i32(Mathf.floor(positionX))
      const cellY: i32 = i32(Mathf.floor(positionY))
      let firstDistance: f32 = 1.0e9
      let secondDistance: f32 = 1.0e9

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const neighbourX: i32 = cellX + offsetX
          const neighbourY: i32 = cellY + offsetY
          const siteIndex: i32 = ((neighbourY - causticSiteOriginY) * causticSiteColumns) + (neighbourX - causticSiteOriginX)
          const deltaX: f32 = unchecked(causticSitesX[siteIndex]) - positionX
          const deltaY: f32 = unchecked(causticSitesY[siteIndex]) - positionY
          const distance: f32 = (deltaX * deltaX) + (deltaY * deltaY)

          if (distance < firstDistance) {
            secondDistance = firstDistance
            firstDistance = distance
          } else if (distance < secondDistance) {
            secondDistance = distance
          }
        }
      }

      const causticDistance: f32 = Mathf.sqrt(secondDistance) - Mathf.sqrt(firstDistance)
      const causticOffset: f32 = causticDistance - 0.09
      const caustic: f32 = Mathf.pow(Mathf.exp(-((causticOffset * causticOffset) / (2.0 * 0.045 * 0.045))), 0.85)
      const interference: f32 = (Mathf.sin(((u * 15.7) + (v * 9.2)) - (time * 0.34)) + Mathf.cos(((u * 8.1) - (v * 17.3)) + (time * 0.27))) * 0.5
      const hue: f32 = fract((u * 0.86) - (v * 0.58) + (time * 0.018) + (lightX * 0.22) - (lightY * 0.14) + (interference * 0.055))
      const sweepDistance: f32 = ((u - lightX) * 0.78) + ((v - lightY) * 0.42)
      const sweep: f32 = Mathf.exp(-((sweepDistance * sweepDistance) / 0.055))
      const foilLine: f32 = Mathf.pow(Mathf.abs(Mathf.sin((((u * aspect) * 39.0) - (v * 31.0)) + (time * 0.45))), 18.0)
      const sparkleX: f32 = u * 46.0 * aspect
      const sparkleY: f32 = v * 46.0
      const sparkleCellX: i32 = i32(Mathf.floor(sparkleX))
      const sparkleCellY: i32 = i32(Mathf.floor(sparkleY))
      const sparkleDeltaX: f32 = fract(sparkleX) - rand2x(sparkleCellX, sparkleCellY)
      const sparkleDeltaY: f32 = fract(sparkleY) - rand2y(sparkleCellX, sparkleCellY)
      const sparklePulse: f32 = clamp(1.0 - (Mathf.abs(fract((time * 0.27) + hash1(sparkleCellX, sparkleCellY)) - 0.5) * 5.0))
      const sparkleDistance: f32 = (sparkleDeltaX * sparkleDeltaX) + (sparkleDeltaY * sparkleDeltaY)
      const sparkle: f32 = Mathf.pow(clamp(1.0 - (sparkleDistance * 55.0)), 4.0) * Mathf.pow(sparklePulse, 3.0)
      const white: f32 = clamp((sweep * 0.22) + (sparkle * 0.82) + (foilLine * caustic * 0.18))
      const brightness: f32 = 0.72 + (caustic * 0.28) + (sweep * 0.12)
      const alpha: f32 = interaction * (0.10 + (caustic * 0.32) + (sweep * 0.17) + (foilLine * 0.08) + (sparkle * 0.62))

      writeGridPixel(pointer, hue, brightness, white, alpha)
      pointer += CHANNELS
    }
  }

  rasterizeGrid(width, height)

  return total
}
