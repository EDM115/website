import { setupPolychromeWorker } from "./polychrome/workerShared"
import { loadStandardPolychromeWasm } from "./polychrome/wasmLoader"
import { renderPolychromeCaustics } from "./polychrome/softwareRenderer"

interface WorkerState {
  phase: number;
}

setupPolychromeWorker<WorkerState>({
  loadWasm: loadStandardPolychromeWasm,
  fallbackRenderer: renderPolychromeCaustics,
  computeFrameTime: (_now, state) => {
    state.phase += 0.03

    return state.phase
  },
  createState: () => ({ phase: 0 }),
})
