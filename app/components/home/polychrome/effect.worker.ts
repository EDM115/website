import { renderPolychromeCaustics } from "./softwareRenderer"
import { loadPolychromeWasm } from "./wasmLoader"
import { setupPolychromeWorker } from "./workerShared"

interface WorkerState {
  phase: number;
}

setupPolychromeWorker<WorkerState>({
  loadWasm: loadPolychromeWasm,
  fallbackRenderer: renderPolychromeCaustics,
  computeFrameTime: (_now, state) => {
    state.phase += 0.03

    return state.phase
  },
  createState: () => ({ phase: 0 }),
})
