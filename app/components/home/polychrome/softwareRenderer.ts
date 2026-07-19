const sin = Math.sin
const cos = Math.cos
const sqrt = Math.sqrt
const exp = Math.exp
const pow = Math.pow
const floor = Math.floor
const ceil = Math.ceil
const hypot = Math.hypot
const PI = Math.PI
const TAU = PI * 2
const STANDARD_GRID_SIZE = 144
const ALT_GRID_SIZE = 128
const CHANNELS = 4
const standardGrid = new Float32Array(STANDARD_GRID_SIZE * STANDARD_GRID_SIZE * CHANNELS)
const altGrid = new Float32Array(ALT_GRID_SIZE * ALT_GRID_SIZE * CHANNELS)
let causticSitesX = new Float32Array(0)
let causticSitesY = new Float32Array(0)
let causticSiteColumns = 0
let causticSiteOriginX = 0
let causticSiteOriginY = 0

interface FieldOffsets {
  part1X: number;
  part1Y: number;
  part2X: number;
  part2Y: number;
  part3X: number;
  part3Y: number;
}

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

function lerp(from: number, to: number, amount: number) {
  return from + ((to - from) * amount)
}

function spectralRed(hue: number) {
  return 0.5 + (0.5 * cos(TAU * hue))
}

function spectralGreen(hue: number) {
  return 0.5 + (0.5 * cos(TAU * (hue - (1 / 3))))
}

function spectralBlue(hue: number) {
  return 0.5 + (0.5 * cos(TAU * (hue - (2 / 3))))
}

function writeGridPixel(grid: Float32Array, pointer: number, hue: number, brightness: number, white: number, alpha: number) {
  grid[pointer] = clamp(lerp(spectralRed(hue) * brightness, 1, white)) * 255
  grid[pointer + 1] = clamp(lerp(spectralGreen(hue) * brightness, 1, white)) * 255
  grid[pointer + 2] = clamp(lerp(spectralBlue(hue) * brightness, 1, white)) * 255
  grid[pointer + 3] = clamp(alpha) * 255
}

// Voronoi sites depend only on their cell and the current frame. Cache them once instead of recalculating six trigonometric hashes for every neighbouring sample.
function prepareCausticSites(scale: number, aspect: number, time: number) {
  causticSiteOriginX = -1
  causticSiteOriginY = -1
  causticSiteColumns = ceil(scale * aspect) + 3
  const rows = ceil(scale) + 3
  const required = causticSiteColumns * rows

  if (causticSitesX.length < required) {
    causticSitesX = new Float32Array(required)
    causticSitesY = new Float32Array(required)
  }

  for (let row = 0; row < rows; row++) {
    const cellY = causticSiteOriginY + row

    for (let column = 0; column < causticSiteColumns; column++) {
      const cellX = causticSiteOriginX + column
      const phase = hash(cellX, cellY) * TAU
      const index = (row * causticSiteColumns) + column

      causticSitesX[index] = cellX + rand2x(cellX, cellY) + (sin((time * 1.2) + phase) * 0.28)
      causticSitesY[index] = cellY + rand2y(cellX, cellY) + (cos((time * 1.35) + phase) * 0.28)
    }
  }
}

// The expensive procedural field is evaluated on a compact grid. Bilinear reconstruction keeps the final canvas full-resolution and smooth while avoiding hundreds of thousands of trigonometric calls per frame.
function rasterizeGrid(buffer: Uint8ClampedArray, width: number, height: number, grid: Float32Array, gridSize: number) {
  const gridMaximum = gridSize - 1
  const widthMaximum = Math.max(1, width - 1)
  const heightMaximum = Math.max(1, height - 1)
  let pointer = 0

  for (let y = 0; y < height; y++) {
    const gridY = (y * gridMaximum) / heightMaximum
    const y0 = floor(gridY)
    const y1 = Math.min(gridMaximum, y0 + 1)
    const blendY = gridY - y0
    const row0 = y0 * gridSize * CHANNELS
    const row1 = y1 * gridSize * CHANNELS

    for (let x = 0; x < width; x++) {
      const gridX = (x * gridMaximum) / widthMaximum
      const x0 = floor(gridX)
      const x1 = Math.min(gridMaximum, x0 + 1)
      const blendX = gridX - x0
      const topLeft = row0 + (x0 * CHANNELS)
      const topRight = row0 + (x1 * CHANNELS)
      const bottomLeft = row1 + (x0 * CHANNELS)
      const bottomRight = row1 + (x1 * CHANNELS)

      for (let channel = 0; channel < CHANNELS; channel++) {
        const top = lerp(grid[topLeft + channel] ?? 0, grid[topRight + channel] ?? 0, blendX)
        const bottom = lerp(grid[bottomLeft + channel] ?? 0, grid[bottomRight + channel] ?? 0, blendX)

        buffer[pointer++] = lerp(top, bottom, blendY)
      }
    }
  }
}

export function renderPolychromeCaustics(
  buffer: Uint8ClampedArray,
  width: number,
  height: number,
  time: number,
  intensity: number,
  quality: number,
  pointerX: number,
  pointerY: number,
) {
  const gridMaximum = STANDARD_GRID_SIZE - 1
  const aspect = width / height
  const scale = 8.5 * quality
  const interaction = 0.35 + (clamp(intensity) * 0.65)
  const lightX = clamp(pointerX)
  const lightY = clamp(pointerY)
  let pointer = 0

  prepareCausticSites(scale, aspect, time)

  for (let gridY = 0; gridY < STANDARD_GRID_SIZE; gridY++) {
    const v = gridY / gridMaximum
    const py = v * scale

    for (let gridX = 0; gridX < STANDARD_GRID_SIZE; gridX++) {
      const u = gridX / gridMaximum
      const px = u * scale * aspect
      const cellX = floor(px)
      const cellY = floor(py)
      let firstDistance = 1e9
      let secondDistance = 1e9

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const neighbourX = cellX + offsetX
          const neighbourY = cellY + offsetY
          const siteIndex = ((neighbourY - causticSiteOriginY) * causticSiteColumns) + (neighbourX - causticSiteOriginX)
          const deltaX = (causticSitesX[siteIndex] ?? 0) - px
          const deltaY = (causticSitesY[siteIndex] ?? 0) - py
          const distance = (deltaX * deltaX) + (deltaY * deltaY)

          if (distance < firstDistance) {
            secondDistance = firstDistance
            firstDistance = distance
          } else if (distance < secondDistance) {
            secondDistance = distance
          }
        }
      }

      const causticDistance = sqrt(secondDistance) - sqrt(firstDistance)
      const causticOffset = causticDistance - 0.09
      const caustic = pow(exp(-((causticOffset * causticOffset) / (2 * 0.045 * 0.045))), 0.85)
      const interference = (sin(((u * 15.7) + (v * 9.2)) - (time * 0.34)) + cos(((u * 8.1) - (v * 17.3)) + (time * 0.27))) * 0.5
      const hue = fract((u * 0.86) - (v * 0.58) + (time * 0.018) + (lightX * 0.22) - (lightY * 0.14) + (interference * 0.055))
      const sweepDistance = ((u - lightX) * 0.78) + ((v - lightY) * 0.42)
      const sweep = exp(-((sweepDistance * sweepDistance) / 0.055))
      const foilLine = pow(Math.abs(sin((((u * aspect) * 39) - (v * 31)) + (time * 0.45))), 18)
      const sparkleX = u * 46 * aspect
      const sparkleY = v * 46
      const sparkleCellX = floor(sparkleX)
      const sparkleCellY = floor(sparkleY)
      const sparkleDeltaX = fract(sparkleX) - rand2x(sparkleCellX, sparkleCellY)
      const sparkleDeltaY = fract(sparkleY) - rand2y(sparkleCellX, sparkleCellY)
      const sparklePulse = clamp(1 - (Math.abs(fract((time * 0.27) + hash(sparkleCellX, sparkleCellY)) - 0.5) * 5))
      const sparkleDistance = (sparkleDeltaX * sparkleDeltaX) + (sparkleDeltaY * sparkleDeltaY)
      const sparkle = pow(clamp(1 - (sparkleDistance * 55)), 4) * pow(sparklePulse, 3)
      const white = clamp((sweep * 0.22) + (sparkle * 0.82) + (foilLine * caustic * 0.18))
      const brightness = 0.72 + (caustic * 0.28) + (sweep * 0.12)
      const alpha = interaction * (0.10 + (caustic * 0.32) + (sweep * 0.17) + (foilLine * 0.08) + (sparkle * 0.62))

      writeGridPixel(standardGrid, pointer, hue, brightness, white, alpha)
      pointer += CHANNELS
    }
  }

  rasterizeGrid(buffer, width, height, standardGrid, STANDARD_GRID_SIZE)
}

function createFieldOffsets(time: number): FieldOffsets {
  return {
    part1X: 50 * sin(-(time / 143.6340)),
    part1Y: 50 * cos(-(time / 99.4324)),
    part2X: 50 * cos(time / 53.1532),
    part2Y: 50 * cos(time / 61.4532),
    part3X: 50 * sin(-(time / 87.53218)),
    part3Y: 50 * sin(-(time / 49)),
  }
}

function holographicField(u: number, v: number, scale: number, offsets: FieldOffsets) {
  const centerX = (u - 0.5) * scale
  const centerY = (v - 0.5) * scale
  const fieldPart1X = centerX + offsets.part1X
  const fieldPart1Y = centerY + offsets.part1Y
  const fieldPart2X = centerX + offsets.part2X
  const fieldPart2Y = centerY + offsets.part2Y
  const fieldPart3X = centerX + offsets.part3X
  const fieldPart3Y = centerY + offsets.part3Y
  const term1 = cos(hypot(fieldPart1X, fieldPart1Y) / 19.483)
  const term2 = sin(hypot(fieldPart2X, fieldPart2Y) / 33.155) * cos(fieldPart2Y / 15.73)
  const term3 = cos(hypot(fieldPart3X, fieldPart3Y) / 27.193) * sin(fieldPart3X / 21.92)

  return (1 + term1 + term2 + term3) * 0.5
}

export function renderPolychromeAlt(
  buffer: Uint8ClampedArray,
  width: number,
  height: number,
  timeSeconds: number,
  intensity: number,
  quality: number,
  pointerX: number,
  pointerY: number,
) {
  const gridMaximum = ALT_GRID_SIZE - 1
  const polychromeScale = quality * 50
  const holographicScale = quality * 250
  const interaction = clamp(intensity)
  const lightX = clamp(pointerX)
  const lightY = clamp(pointerY)
  const polychromeOffsets = createFieldOffsets(timeSeconds + (lightY * 2.221))
  const holographicOffsets = createFieldOffsets(timeSeconds + (lightY * 7.221))
  let pointer = 0

  for (let gridY = 0; gridY < ALT_GRID_SIZE; gridY++) {
    const v = gridY / gridMaximum

    for (let gridX = 0; gridX < ALT_GRID_SIZE; gridX++) {
      const u = gridX / gridMaximum
      const polychromeField = holographicField(u, v, polychromeScale, polychromeOffsets)
      const holographicFieldValue = holographicField(u, v, holographicScale, holographicOffsets)
      const polychrome = 0.5 + (0.5 * cos((lightX * 2.612) + ((polychromeField - 0.5) * PI)))
      const holographic = 0.5 + (0.5 * cos((lightX * 2.612) + ((holographicFieldValue - 0.5) * PI)))
      const gridSize = 0.79
      const diagonalA = Math.max(0, (7 * cos((v * gridSize * 45) + (u * gridSize * 20))) - 6)
      const diagonalB = Math.max(0, (7 * cos((v * gridSize * 45) - (u * gridSize * 20))) - 6)
      const vertical = Math.max(0, (7 * Math.abs(cos(u * gridSize * 20))) - 6)
      const lattice = 0.5 * Math.max(vertical, diagonalA, diagonalB)
      const edgeDistance = Math.max(Math.abs((u - 0.5) * 2), Math.abs((v - 0.5) * 2))
      const edgeRamp = clamp((edgeDistance - 0.42) / 0.58)
      const edgeEmphasis = edgeRamp * edgeRamp * (3 - (2 * edgeRamp))
      const hue = fract(polychrome + (holographic * 0.34) + (lattice * 0.18) + (timeSeconds * 0.04))
      const white = clamp((lattice * 0.34) + (pow(holographic, 10) * 0.16))
      const brightness = 0.42 + (polychrome * 0.18) + (holographic * 0.08) + (lattice * 0.10) + (edgeEmphasis * 0.08)
      const alpha = ((0.22 + (interaction * 0.38)) * (0.28 + (polychrome * 0.18) + (holographic * 0.14) + (lattice * 0.22))) + (edgeEmphasis * 0.10)

      writeGridPixel(altGrid, pointer, hue, brightness, white, alpha)
      pointer += CHANNELS
    }
  }

  rasterizeGrid(buffer, width, height, altGrid, ALT_GRID_SIZE)
}
