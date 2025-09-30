<template>
  <div
    ref="root"
    class="holo-card glass"
    :class="{ 'is-disabled': !enabled }"
    @pointerenter="onEnter"
    @pointerleave="onLeave"
    @pointermove.passive="onPointerMove"
  >
    <span
      v-if="enabled"
      class="holo-glow"
      aria-hidden="true"
    />
    <div
      ref="inner"
      class="holo-inner"
    >
      <!-- This secondary glow is needed to have an uniform background for the holo-overlay to take place. Otherwise, pitch black regions won't have the Polychrome effect, and it will appear over-saturated -->
      <span
        v-if="enabled"
        class="holo-glow"
        aria-hidden="true"
      />
      <slot />
      <canvas
        v-if="enabled && !isMobile"
        ref="canvasEl"
        class="holo-caustics"
        aria-hidden="true"
      />
      <span
        v-if="enabled"
        :class="[ 'holo-overlay', { 'alt-rendering': altRendering } ]"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean;
  maxDpr?: number;
  fps?: number;
  alt?: boolean;
}>()

const emit = defineEmits<(e: "update:modelValue", v: boolean)=> void>()

const root = useTemplateRef("root")
const inner = useTemplateRef("inner")
const canvasEl = useTemplateRef("canvasEl")

const enabled = ref(props.modelValue ?? true)
const altRendering = computed(() => props.alt ?? false)
const { isMobile } = useDevice()

watch(enabled, (v) => emit("update:modelValue", v))

// state
let isHovering = false
let idleRaf: number | null = null
let tIdle = 0
// 0..1 how close pointer is to card (1 = inside)
let proximity = 0
let ptrX = 0.5
let ptrY = 0.5
let cssIntensity = 0
// dynamic overlay hues derived from polychrome shader
// 0..360
let polyHueBase = 0
let polyTime = 0
let prefersReducedMotion = false
let saveData = false
let effectiveCores = 4
let lowMemory = false
let startQueued = false
let started = false

// worker
let usingOffscreen = false
let viewportTicking = false
let lastClientX: number | null = null
let lastClientY: number | null = null
let worker: Worker | null = null
let lastRect: DOMRect | null = null
let onWindowResize: (()=> void) | null = null
let onWindowScroll: (()=> void) | null = null
// track fallback rAF so we can cancel/restart cleanly when toggling
let fallbackRaf: number | null = null

const MAX_DPR = props.maxDpr ?? 2
const FPS = props.fps ?? 60

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n))
}

function lerp(a: number, b: number, t: number) {
  return a + ((b - a) * t)
}

function ease(x: number) {
  return (x * x) * (3 - (2 * x))
}

function setVars(x: number, y: number, amp = 1) {
  const el = root.value

  if (!el) {
    return
  }

  const DEG_MULT = 16
  const PX_MULT = 10

  // x, y in [0, 1]
  const px = x - 0.5
  const py = y - 0.5

  // deg
  const rotX = (py * DEG_MULT) * amp
  const rotY = (-(px * DEG_MULT)) * amp

  // px
  const tx = (px * PX_MULT) * amp
  const ty = (py * PX_MULT) * amp

  el.style.setProperty("--rx", `${rotX}deg`)
  el.style.setProperty("--ry", `${rotY}deg`)
  el.style.setProperty("--tx", `${tx}px`)
  el.style.setProperty("--ty", `${ty}px`)
  el.style.setProperty("--mx", `${x * 100}%`)
  el.style.setProperty("--my", `${y * 100}%`)

  if (altRendering.value) {
    // set hue seeds so overlay follows pointer subtly
    const hue = ((x * 360) + (y * 60)) % 360

    polyHueBase = hue
    el.style.setProperty("--poly-hue", `${polyHueBase.toFixed(1)}deg`)
  }
}

function updateIntensityVars(el: HTMLElement) {
  // blend idle target toward pointer as proximity increases
  const easedProximity = ease(proximity)

  // update proximity-based intensity for CSS
  el.style.setProperty("--proximity", `${proximity.toFixed(3)}`)
  el.style.setProperty("--intensity", `${easedProximity.toFixed(3)}`)
  cssIntensity = easedProximity

  if (worker) {
    worker.postMessage({
      type: "setIntensity",
      intensity: cssIntensity,
    }, [])
  }
}

function recalcPointerAndRect(doResize: boolean) {
  const el = root.value

  if (!el) {
    return
  }

  if (doResize) {
    resizeCanvas()
  } else {
    lastRect = el.getBoundingClientRect()
  }

  if (lastClientX != null && lastClientY != null && lastRect) {
    const xVal = clamp((lastClientX - lastRect.left) / lastRect.width)
    const yVal = clamp((lastClientY - lastRect.top) / lastRect.height)

    ptrX = xVal
    ptrY = yVal

    if (isHovering) {
      setVars(xVal, yVal, 1.12)
    }

    updateIntensityVars(el)
  }
}

function computeQuality() {
  // conservative quality selection
  type NetInfo = {
    saveData?: boolean;
    downlink?: number;
  }

  const navConn = navigator as unknown as Navigator & {
    connection?: NetInfo;
    hardwareConcurrency?: number;
  }
  const hasSaveData = navConn.connection?.saveData === true
  const downlink = navConn.connection?.downlink ?? 10

  saveData = hasSaveData
  prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  effectiveCores = navConn.hardwareConcurrency ?? 4
  // very low memory heuristic (Chrome only has experimental API, so guess via cores)
  lowMemory = effectiveCores <= 2

  if (prefersReducedMotion || saveData) {
    return {
      enable: false,
      quality: 0.75,
      fps: 15,
      dpr: 1,
    }
  }

  if (lowMemory) {
    return {
      enable: true,
      quality: 0.8,
      fps: 20,
      dpr: 1,
    }
  }

  if (effectiveCores <= 4 || downlink < 1.5) {
    return {
      enable: true,
      quality: 1.0,
      fps: 30,
      dpr: Math.min(MAX_DPR, 1.5),
    }
  }

  return {
    enable: true,
    quality: 1.1,
    fps: FPS,
    dpr: MAX_DPR,
  }
}

function resizeCanvas(rect?: DOMRect) {
  if (isMobile.value) {
    return
  }

  const cvs = canvasEl.value
  const el = root.value

  if (!cvs || !el) {
    return
  }

  lastRect = rect ?? el.getBoundingClientRect()
  const quality = computeQuality()
  const dpr = quality.dpr
  // Render at a moderate internal resolution for performance
  const targetW = Math.max(96, Math.floor(lastRect.width * dpr * 0.7))
  const targetH = Math.max(96, Math.floor(lastRect.height * dpr * 0.7))

  if (usingOffscreen) {
    worker?.postMessage({
      type: "resize",
      width: targetW,
      height: targetH,
    })
  } else {
    if (cvs.width !== targetW || cvs.height !== targetH) {
      cvs.width = targetW
      cvs.height = targetH
    }
  }
}

function startCaustics() {
  if (isMobile.value) {
    return
  }

  const cvs = canvasEl.value
  const el = root.value

  if (!cvs || !el) {
    return
  }

  // attempt OffscreenCanvas worker
  try {
    const offscreen = (cvs as HTMLCanvasElement & { transferControlToOffscreen?: ()=> OffscreenCanvas }).transferControlToOffscreen?.()

    if (offscreen) {
      usingOffscreen = true
      worker = altRendering.value
        ? new Worker(new URL("./PolychromeAltEffect.worker.ts", import.meta.url), { type: "module" })
        : new Worker(new URL("./PolychromeEffect.worker.ts", import.meta.url), { type: "module" })
      const quality = computeQuality()
      const rect = lastRect ?? el.getBoundingClientRect()
      const dpr = quality.dpr
      const width = Math.max(96, Math.floor(rect.width * dpr * 0.7))
      const height = Math.max(96, Math.floor(rect.height * dpr * 0.7))

      worker.postMessage({
        type: "init",
        canvas: offscreen,
        width,
        height,
        fps: quality.fps,
        quality: quality.quality,
      }, [offscreen])
      worker.postMessage({
        type: "setIntensity",
        intensity: cssIntensity,
      }, [])

      if (!onWindowResize) {
        onWindowResize = () => resizeCanvas()
        window.addEventListener("resize", onWindowResize)
      }
    } else {
      usingOffscreen = false
    }
  } catch {
    usingOffscreen = false
  }

  if (!usingOffscreen) {
    // fallback: main-thread draw but only when enabled, cap fps using rAF + time budget
    const ctx = cvs.getContext("2d")

    if (!ctx) {
      return
    }

    let raf: number | null = null
    let last = 0
    let time = 0
    const quality = computeQuality()
    const interval = 1000 / quality.fps

    const draw = (now: number) => {
      if (!enabled.value) {
        if (raf) {
          cancelAnimationFrame(raf)
        }

        raf = null
        fallbackRaf = null
        ctx.clearRect(0, 0, cvs.width, cvs.height)

        return
      }

      if (now - last < interval) {
        raf = requestAnimationFrame(draw)

        return
      }

      last = now
      time += 0.03
      const width = cvs.width
      const height = cvs.height
      const img = ctx.createImageData(width, height)
      const data = img.data
      const invW = 1 / width
      const invH = 1 / height
      let pointer = 0
      // Worley (cellular) noise field for organic cell-like caustics
      // World scale : how many cells across
      const SCALE = 8.5

      // small utility: fractional part
      function fract(v: number) {
        return v - Math.floor(v)
      }

      // hash to 0..1
      function hash1(i: number, j: number) {
        return fract(Math.sin(((i * 127.1) + (j * 311.7)) + 134.1) * 43758.5453123)
      }

      // two randoms 0..1 per cell
      function rand2(i: number, j: number) {
        const fractA = fract(Math.sin((i * 269.5) + (j * 183.3)) * 43758.5453123)
        const fractB = fract(Math.sin((i * 113.5) + (j * 271.9)) * 43758.5453123)

        return [ fractA, fractB ] as const
      }

      for (let y = 0; y < height; y++) {
        const py = (y + 0.5) * invH * SCALE

        for (let x = 0; x < width; x++) {
          const px = (x + 0.5) * invW * SCALE
          const ix = Math.floor(px)
          const iy = Math.floor(py)
          const fx = px - ix
          const fy = py - iy
          // track nearest and second-nearest distances (squared)
          let f1 = 1e9, f2 = 1e9

          for (let oy = -1; oy <= 1; oy++) {
            for (let ox = -1; ox <= 1; ox++) {
              const cx = ix + ox
              const cy = iy + oy
              const [ rx, ry ] = rand2(cx, cy)
              // subtle per-cell motion
              const ph = hash1(cx, cy) * Math.PI * 2
              const offx = Math.sin((time * 1.2) + ph) * 0.28
              const offy = Math.cos((time * 1.35) + ph) * 0.28
              const sx = (ox + rx + offx) - fx
              const sy = (oy + ry + offy) - fy
              const d2 = (sx * sx) + (sy * sy)

              if (d2 < f1) {
                f2 = f1
                f1 = d2
              } else if (d2 < f2) {
                f2 = d2
              }
            }
          }

          // Use Euclidean distances for smoother, rounder cells
          const d1 = Math.sqrt(f1)
          const d2s = Math.sqrt(f2)
          const diff = d2s - d1
          // Smooth, rounded edges via Gaussian shaping around a center
          const center = 0.09
          const sigma = 0.045
          let edge = Math.exp(-(((diff - center) * (diff - center)) / (2 * sigma * sigma)))

          // gentle softening
          edge = Math.pow(edge, 0.85)
          // final intensity, modulated by approach intensity for subtlety
          const alphaMask = Math.max(0.0, Math.min(1.0, edge * (0.5 + (cssIntensity * 0.7))))

          data[pointer++] = 235
          data[pointer++] = 245
          data[pointer++] = 255
          data[pointer++] = Math.floor(alphaMask * 255)
        }
      }

      ctx.clearRect(0, 0, width, height)
      ctx.putImageData(img, 0, 0)
      raf = requestAnimationFrame(draw)
      fallbackRaf = raf
    }

    resizeCanvas()
    raf = requestAnimationFrame(draw)
    fallbackRaf = raf

    if (!onWindowResize) {
      onWindowResize = () => resizeCanvas()
      window.addEventListener("resize", onWindowResize)
    }
  }
}

function startIdle() {
  if (idleRaf) {
    cancelAnimationFrame(idleRaf)
  }

  const el = root.value

  if (!el) {
    return
  }

  const loop = () => {
    const speedBase = 0.015
    const speed = speedBase * (0.3 + (0.7 * (1 - proximity)))

    tIdle += speed
    const radius = 0.28
    const idleX = 0.5 + (Math.cos(tIdle) * radius)
    const idleY = 0.5 + (Math.sin(tIdle * 0.8) * radius)
    const easedProximity = ease(proximity)
    const xVal = lerp(idleX, ptrX, easedProximity)
    const yVal = lerp(idleY, ptrY, easedProximity)
    // slightly increase amplitude as we get closer
    const amp = lerp(0.9, 1.05, easedProximity)

    // While hovering, pointer controls tilt. Keep overlay rotation running regardless.
    if (!isHovering) {
      setVars(xVal, yVal, amp)
    }

    // animate gloss/caustics angles during idle
    const gloss = (((tIdle + (Math.sin(tIdle * 0.8) * 0.5)) % (Math.PI * 2)) * (180 / Math.PI))

    el.style.setProperty("--gloss-angle", `${gloss}deg`)
    el.style.setProperty("--caustics-angle", `${(gloss * 1.1)}deg`)

    if (altRendering.value) {
      // polychrome overlay hue/time drift akin to shader polychrome.y contribution
      polyTime += 0.012
      const drift = (polyTime * 40) % 360

      el.style.setProperty("--poly-drift", `${drift.toFixed(1)}deg`)
    }

    updateIntensityVars(el)
    idleRaf = requestAnimationFrame(loop)
  }

  idleRaf = requestAnimationFrame(loop)
}

function stopIdle() {
  if (idleRaf) {
    cancelAnimationFrame(idleRaf)
  }

  idleRaf = null
}

// pointer handlers (document proximity is rAF-throttled)
let docMoveQueued = false

function onPointerMove(e: PointerEvent) {
  if (!enabled.value) {
    return
  }

  const el = root.value

  if (!el) {
    return
  }

  const rect = lastRect ?? el.getBoundingClientRect()

  lastClientX = e.clientX
  lastClientY = e.clientY
  const xVal = clamp((e.clientX - rect.left) / rect.width)
  const yVal = clamp((e.clientY - rect.top) / rect.height)

  ptrX = xVal
  ptrY = yVal

  if (isHovering) {
    setVars(xVal, yVal, 1.12)
  }

  if (!docMoveQueued) {
    // global pointer proximity to smooth transition before hover
    docMoveQueued = true
    requestAnimationFrame(() => {
      docMoveQueued = false
      // distance from card rect (0 if inside)
      const dx = e.clientX < rect.left
        ? rect.left - e.clientX
        : e.clientX > rect.right
          ? e.clientX - rect.right
          : 0
      const dy = e.clientY < rect.top
        ? rect.top - e.clientY
        : e.clientY > rect.bottom
          ? e.clientY - rect.bottom
          : 0
      const dist = Math.hypot(dx, dy)
      const radius = 220

      proximity = clamp(1 - (dist / radius))

      if (el) {
        updateIntensityVars(el)
      }
    })
  }
}

// Global proximity when not hovering, to allow smooth fade while moving away
function onDocumentPointerMove(e: PointerEvent) {
  if (!enabled.value) {
    return
  }

  const el = root.value

  if (!el) {
    return
  }

  const rect = lastRect ?? el.getBoundingClientRect()

  lastClientX = e.clientX
  lastClientY = e.clientY

  if (!docMoveQueued) {
    docMoveQueued = true
    requestAnimationFrame(() => {
      docMoveQueued = false
      // Update pointer ratios for blending even when not hovering
      ptrX = clamp((e.clientX - rect.left) / rect.width)
      ptrY = clamp((e.clientY - rect.top) / rect.height)
      const dx = e.clientX < rect.left
        ? rect.left - e.clientX
        : e.clientX > rect.right
          ? e.clientX - rect.right
          : 0
      const dy = e.clientY < rect.top
        ? rect.top - e.clientY
        : e.clientY > rect.bottom
          ? e.clientY - rect.bottom
          : 0
      const dist = Math.hypot(dx, dy)
      const radius = 220

      proximity = clamp(1 - (dist / radius))
      updateIntensityVars(el)
    })
  }
}

function onEnter() {
  isHovering = true
  root.value?.classList.add("is-hover")
}

function onLeave() {
  isHovering = false
  root.value?.classList.remove("is-hover")
}

let resizeObs: ResizeObserver | null = null
let interObs: IntersectionObserver | null = null

function queueStart() {
  if (startQueued || started) {
    return
  }

  startQueued = true
  const start = () => {
    startQueued = false

    if (!enabled.value) {
      return
    }

    const el = root.value

    if (!el) {
      return
    }

    started = true
    // enable will-change only while running
    inner.value?.style.setProperty("will-change", "transform")
    setVars(0.5, 0.5)
    startIdle()

    // If an Offscreen worker already exists just resume it, else start
    if (usingOffscreen && worker) {
      worker.postMessage({ type: "start" }, [])
      worker.postMessage({
        type: "setIntensity",
        intensity: cssIntensity,
      }, [])
    } else {
      startCaustics()
    }
  }

  // Defer: after Nuxt ready -> requestIdle -> next frame
  onNuxtReady(() => {
    const win = window as Window & { requestIdleCallback?: (cb: IdleRequestCallback)=> number }

    if (typeof win.requestIdleCallback === "function") {
      win.requestIdleCallback(() => {
        requestAnimationFrame(start)
      })
    } else {
      requestAnimationFrame(start)
    }
  })
}

function handleEnableChange(v: boolean) {
  if (enabled.value === v) {
    return
  }

  enabled.value = v

  if (v) {
    // Re-start loops if they were previously stopped
    started = false
    // Ensure v-if DOM (canvas/glows/overlay) exists before starting
    nextTick(() => {
      const el = root.value

      if (el) {
        lastRect = el.getBoundingClientRect()
      }

      queueStart()
    })
  } else {
    stopIdle()
    // Remove will-change when paused
    inner.value?.style.removeProperty("will-change")

    // Stop and fully clean worker or fallback. With v-if, the canvas will be removed, so an OffscreenCanvas previously transferred becomes orphaned. We must terminate and recreate on next enable.
    // Remember if the canvas was transferred to Offscreen to avoid main-thread getContext()
    const wasUsingOffscreen = usingOffscreen

    if (usingOffscreen && worker) {
      worker.postMessage({ type: "stop" }, [])
      worker.terminate()
      worker = null
      usingOffscreen = false
    }

    if (fallbackRaf) {
      cancelAnimationFrame(fallbackRaf)
      fallbackRaf = null
    }

    // If we had transferred control to OffscreenCanvas, calling getContext() will throw.
    // In that case, rely on CSS (.is-disabled) to hide the last frame instead of clearing.
    const cvs = canvasEl.value

    if (cvs && !wasUsingOffscreen) {
      try {
        const ctx = cvs.getContext("2d")

        if (ctx) {
          ctx.clearRect(0, 0, cvs.width, cvs.height)
        }
      } catch {
        // Ignore : can happen if the canvas was transferred, visibility is controlled via CSS.
        // skipcq: JS-0098
        void 0
      }
    }

    // Allow future starts
    started = false
    startQueued = false
    // Reset angles so overlay anim restarts cleanly next enable
    const el = root.value

    if (el) {
      tIdle = 0
      el.style.setProperty("--gloss-angle", "45deg")
      el.style.setProperty("--caustics-angle", "50deg")
    }
  }
}

onMounted(() => {
  // listen for global toggle
  window.addEventListener("polychrome-toggle", (e: Event) => {
    const val = Boolean((e as CustomEvent<boolean>).detail)

    handleEnableChange(val)
  })

  // compute initial enable/quality
  const quality = computeQuality()

  if (!quality.enable) {
    enabled.value = false

    return
  }

  // only start when in viewport to avoid offscreen work
  interObs = new IntersectionObserver((entries) => {
    const visible = entries.some((e) => e.isIntersecting)

    if (visible) {
      interObs?.disconnect()
      interObs = null
      queueStart()
    }
  })

  if (root.value) {
    interObs.observe(root.value)
  }

  // cache rect with ResizeObserver
  resizeObs = new ResizeObserver(() => resizeCanvas())

  if (root.value) {
    resizeObs.observe(root.value)
  }

  // global pointer tracking for smooth approach/leave fade
  window.addEventListener("pointermove", onDocumentPointerMove, { passive: true })

  // when viewport changes (scroll), update rect/pointer ratios to avoid overlay offset
  onWindowScroll = () => {
    if (viewportTicking) {
      return
    }

    viewportTicking = true
    requestAnimationFrame(() => {
      recalcPointerAndRect(false)
      viewportTicking = false
    })
  }

  window.addEventListener("scroll", onWindowScroll, { passive: true })
})

// Also react to direct v-model prop changes
watch(() => props.modelValue, (val) => {
  if (typeof val === "boolean") {
    handleEnableChange(val)
  }
})

// Stop caustics on mobile and restart on desktop
watch(isMobile, (mobile) => {
  if (mobile) {
    const wasUsingOffscreen = usingOffscreen

    if (usingOffscreen && worker) {
      try {
        worker.postMessage({ type: "stop" } as const, [])
      } catch {
        // Ignored : worker might already be stopped or disposed
        // skipcq: JS-0098
        void 0
      }
      worker.terminate()
      worker = null
      usingOffscreen = false
    }

    if (fallbackRaf) {
      cancelAnimationFrame(fallbackRaf)
      fallbackRaf = null
    }

    const cvs = canvasEl.value

    if (cvs && !wasUsingOffscreen) {
      try {
        const ctx = cvs.getContext("2d")

        if (ctx) {
          ctx.clearRect(0, 0, cvs.width, cvs.height)
        }
      } catch {
        // Ignore : canvas might be in an invalid state
        // skipcq: JS-0098
        void 0
      }
    }

    // mark not started so we can re-init when leaving mobile
    started = false
  } else {
    // leaving mobile: restart caustics if enabled
    if (enabled.value) {
      started = false
      nextTick(() => {
        queueStart()
      })
    }
  }
})

onBeforeUnmount(() => {
  stopIdle()
  resizeObs?.disconnect()
  resizeObs = null
  interObs?.disconnect()
  interObs = null
  worker?.terminate()
  worker = null

  if (onWindowResize) {
    window.removeEventListener("resize", onWindowResize)
    onWindowResize = null
  }

  if (onWindowScroll) {
    window.removeEventListener("scroll", onWindowScroll)
    onWindowScroll = null
  }

  window.removeEventListener("pointermove", onDocumentPointerMove as EventListener)
})
</script>

<style scoped lang="scss">
/* Holographic, floating card effect */
.holo-card {
  /* tilt variables */
  --rx: 0deg;
  --ry: 0deg;
  --tx: 0px;
  --ty: 0px;
  --mx: 50%;
  --my: 50%;
  --gloss-angle: 45deg;
  /* 0..1 distance-based */
  --proximity: 0;
  /* eased proximity */
  --intensity: 0;

  position: relative;
  border-radius: 24px;
  width: fit-content;
  transform-style: preserve-3d;
  perspective: 1000px;
  box-shadow: 0 30px 60px rgb(0 0 0 / 40%), 0 10px 20px rgb(0 0 0 / 30%);
  outline: 1px solid rgb(255 255 255 / 7%);
  /* ensure blend layers stay within */
  isolation: isolate;

  background: color-mix(in srgb, var(--surface) 50%, transparent) !important;
}

.holo-inner {
  position: relative;
  transform:
    translate3d(var(--tx), var(--ty), 0)
    rotateX(var(--rx))
    rotateY(var(--ry));
  transition: transform 150ms ease;
  border-radius: inherit;
  overflow: hidden;
  z-index: 1;
}

.holo-card.is-hover .holo-inner {
  transition: transform 40ms ease-out;
}

/* Disabled state : no transforms/animations/caustics */
.holo-card.is-disabled .holo-inner {
  transform: none !important;
  transition: none !important;
}

.holo-card.is-disabled .holo-overlay {
  transition: none !important;
}

.holo-card.is-disabled .holo-glow {
  animation: none !important;
  /* keep subtle base glow */
  opacity: 0.15;
}

.holo-card.is-disabled .holo-caustics {
  opacity: 0 !important;
}

.holo-glow {
  /* soft animated glow behind the image */
  position: absolute;
  inset: -14px;
  z-index: 0;
  border-radius: inherit;
  background:
    radial-gradient(
      60% 60% at 50% 50%,
      rgb(255 255 255 / 0.20),
      transparent 70%
    ),
    conic-gradient(
      rgb(255 184 108 / 0.20),
      rgb(80 250 123 / 0.18),
      rgb(139 233 253 / 0.18),
      rgb(189 147 249 / 0.18),
      rgb(255 184 108 / 0.20)
    );
  filter:
    blur(18px)
    saturate(120%);
  mix-blend-mode: screen;
  opacity: calc(0.15 + 0.35 * var(--intensity));
  pointer-events: none;
  animation: glow-pulse 6s ease-in-out infinite alternate;
}

.holo-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  mix-blend-mode: color-dodge;
  opacity: calc(0.05 + 0.35 * var(--intensity));
  background:
    /* moving white gloss following the cursor */
    radial-gradient(
      60% 60% at var(--mx) var(--my),
      rgb(255 255 255 / 0.28),
      transparent 60%
    ),
    /* iridescent conic gradient */
    conic-gradient(
      from var(--gloss-angle) at var(--mx) var(--my),
      hsl(0, 100%, 50%),
      hsl(30, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(90, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(150, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(210, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(270, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(330, 100%, 50%),
      hsl(360, 100%, 50%)
    );
  filter:
    saturate(120%)
    brightness(105%)
    contrast(105%);
  transition: opacity 150ms ease, filter 150ms ease;

  &.alt-rendering {
    filter:
      saturate(120%)
      brightness(105%)
      contrast(105%)
      /* tie hue to pointer base and drifting time like shader polychrome */
      hue-rotate(var(--poly-hue, 0deg))
      hue-rotate(var(--poly-drift, 0deg));
  }
}

.holo-caustics {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: calc(0.05 + 0.05 * var(--intensity));
  mix-blend-mode: soft-light;
  display: block;
}

/* Hover scale for subtle lift */
.holo-card:hover .holo-inner {
  transform:
    translate3d(var(--tx), var(--ty), 0)
    rotateX(var(--rx))
    rotateY(var(--ry))
    scale(1.015);
}

@keyframes glow-pulse {
  0% { opacity: 0.25; }
  100% { opacity: 0.6; }
}

@media (prefers-reduced-motion: reduce) {
  .holo-glow,
  .holo-caustics {
    animation: none !important;
  }
}
</style>
