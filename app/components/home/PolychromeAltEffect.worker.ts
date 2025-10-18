import { setupPolychromeWorker } from "./polychrome/workerShared"
import { loadAltPolychromeWasm } from "./polychrome/wasmLoader"
import { renderPolychromeAlt } from "./polychrome/softwareRenderer"

setupPolychromeWorker({
  loadWasm: loadAltPolychromeWasm,
  fallbackRenderer: renderPolychromeAlt,
  computeFrameTime: (now) => now / 1000,
  createState: () => ({} as Record<string, never>),
})
