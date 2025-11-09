import type { PolychromeWasmInstance } from "~/types"

async function instantiate(url: URL): Promise<PolychromeWasmInstance | null> {
  if (typeof WebAssembly === "undefined") {
    return null
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    if ("instantiateStreaming" in WebAssembly && typeof WebAssembly.instantiateStreaming === "function") {
      try {
        const { instance } = await WebAssembly.instantiateStreaming(response.clone(), {})
        const validated = validateExports(instance.exports)

        if (validated) {
          return validated
        }
      } catch {
        // Fall back to ArrayBuffer instantiation below.
        // skipcq: JS-0098
        void 0
      }
    }

    const source = await response.arrayBuffer()
    const { instance } = await WebAssembly.instantiate(source, {})

    return validateExports(instance.exports)
  } catch {
    return null
  }
}

function validateExports(exports: WebAssembly.Exports): PolychromeWasmInstance | null {
  const memoryCandidate = exports.memory

  if (!(memoryCandidate instanceof WebAssembly.Memory)) {
    return null
  }

  const renderCandidate = exports.render
  const pointerCandidate = exports.getBufferPointer
  const capacityCandidate = exports.getBufferCapacity

  if (
    typeof renderCandidate !== "function"
    || typeof pointerCandidate !== "function"
    || typeof capacityCandidate !== "function"
  ) {
    return null
  }

  const render: PolychromeWasmInstance["render"] = (width, height, time, intensity, quality) => {
    const result = renderCandidate(width, height, time, intensity, quality)

    return typeof result === "number"
      ? result
      : 0
  }

  const getBufferPointer: PolychromeWasmInstance["getBufferPointer"] = () => {
    const result = pointerCandidate()

    return typeof result === "number"
      ? result
      : 0
  }

  const getBufferCapacity: PolychromeWasmInstance["getBufferCapacity"] = () => {
    const result = capacityCandidate()

    return typeof result === "number"
      ? result
      : 0
  }

  return {
    memory: memoryCandidate,
    render,
    getBufferPointer,
    getBufferCapacity,
  }
}

let standardPromise: Promise<PolychromeWasmInstance | null> | null = null
let altPromise: Promise<PolychromeWasmInstance | null> | null = null

export function loadPolychromeWasm(): Promise<PolychromeWasmInstance | null> {
  if (!standardPromise) {
    const url = new URL("./effect.wasm", import.meta.url)

    standardPromise = instantiate(url)
  }

  return standardPromise
}

export function loadPolychromeAltWasm(): Promise<PolychromeWasmInstance | null> {
  if (!altPromise) {
    const url = new URL("./effect_alt.wasm", import.meta.url)

    altPromise = instantiate(url)
  }

  return altPromise
}
