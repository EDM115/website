import { renderPolychromeCaustics } from "./softwareRenderer"
import { loadPolychromeWasm } from "./wasmLoader"
import { setupPolychromeWorker } from "./workerShared"

setupPolychromeWorker<{
  phase: number;
}>({
  loadWasm: loadPolychromeWasm,
  fallbackRenderer: renderPolychromeCaustics,
  computeFrameTime: (_now, state) => {
    state.phase += 0.03

    return state.phase
  },
  createState: () => ({ phase: 0 }),
})
