import { renderPolychromeAlt } from "./softwareRenderer"
import { loadPolychromeAltWasm } from "./wasmLoader"
import { setupPolychromeWorker } from "./workerShared"

setupPolychromeWorker({
  loadWasm: loadPolychromeAltWasm,
  fallbackRenderer: renderPolychromeAlt,
  computeFrameTime: (now) => now / 1000,
  createState: () => ({} as Record<string, never>),
})
