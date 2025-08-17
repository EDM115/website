<template>
  <UiContainer>
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-left">
          <div
            ref="holoCard"
            class="holo-card glass"
            aria-label="EDM115 holographic card"
          >
            <div class="holo-inner">
              <span
                class="holo-glow"
                aria-hidden="true"
              />
              <NuxtImg
                :draggable="false"
                preload
                class="hero-image"
                height="350"
                width="350"
                alt="EDM115 Logo"
                src="/img/profile-img.webp"
                :placeholder="[200, 200, 50, 5]"
              />
              <span
                class="holo-caustics"
                aria-hidden="true"
              />
              <span
                class="holo-overlay"
                aria-hidden="true"
              />
              <span
                class="holo-sparkles"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div class="hero-right">
          <h1
            class="gradient-text"
            style="font-size:clamp(2rem,6vw,4rem); line-height:1.05; margin:0 0 0.5rem 0;"
          >
            EDM115
          </h1>

          <p style="color:var(--text-dark); max-width:60ch; margin-top: 0;">
            {{ t('main.description') }}
          </p>

          <div style="gap:.75rem; display: flex; flex-wrap:wrap; margin-top:1rem; justify-content: center;">
            <UiButton
              color="primary"
              :prepend-icon="mdiHomeOutline"
              :text="t('home.home')"
              link="/"
              variant="elevated"
              aria="Home"
            />
            <UiButton
              color="secondary"
              :prepend-icon="mdiInformationOutline"
              :text="t('home.projects')"
              link="/projects"
              variant="elevated"
              aria="Projects"
            />
            <UiButton
              color="accent"
              :prepend-icon="mdiText"
              :text="t('home.blog')"
              link="/blog"
              variant="elevated"
              aria="Blog"
            />
          </div>

          <UiCard
            id="about"
            class="glass hero-about"
            variant="outlined"
            style="margin-top:1rem;"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#about"
                  class="internal-link"
                  aria-label="About section"
                >
                  {{ t('home.about') }}
                </NuxtLink>
              </h2>
            </template>
            <p>
              {{ t('home.about1') }}<br>
              {{ t('home.about2') }}<br><br>
              {{ t('home.about3') }}<br>
              {{ t('home.about4') }}<br>
              {{ t('home.about5') }}<br>
              {{ t('home.about6') }}<br>
              {{ t('home.about7', { age }) }}<br>
              {{ t('home.about8') }}<br>
              {{ t('home.about9') }} :
              <NuxtLink
                to="https://edm115.dev"
                target="_blank"
                aria-label="EDM115's website"
              >
                edm115.dev
              </NuxtLink><br>
              {{ t('home.about10') }} :
              <NuxtLink
                to="mailto:dev@edm115.dev"
                target="_blank"
                external
                aria-label="EDM115's email"
              >
                dev@edm115.dev
              </NuxtLink><br>
              {{ t('home.about11') }}<br>
              {{ t('home.about12') }} :
              <NuxtLink
                to="tel:+33667980504"
                target="_blank"
                external
                aria-label="EDM115's phone number"
              >
                +33 6 67 98 05 04
              </NuxtLink><br>
              {{ t('home.about13') }}<br>
            </p>
          </UiCard>

          <UiCard
            id="stats"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#stats"
                  class="internal-link"
                  aria-label="Statistics section"
                >
                  {{ t('home.stats') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeStats
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>

          <UiCard
            id="skills"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#skills"
                  class="internal-link"
                  aria-label="Skills section"
                >
                  {{ t('home.skills') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeSkills
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>

          <UiCard
            id="resume"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#resume"
                  class="internal-link"
                  aria-label="Resume section"
                >
                  {{ t('home.resume') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeResume
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>

          <UiCard
            id="opensource"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#opensource"
                  class="internal-link"
                  aria-label="Open Source section"
                >
                  {{ t('home.oss') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeOpenSourceContributions
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>

          <UiCard
            id="contact"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#contact"
                  class="internal-link"
                  aria-label="Contact section"
                >
                  {{ t('home.contact') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeContact
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>

          <UiCard
            id="social"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#social"
                  class="internal-link"
                  aria-label="Social links section"
                >
                  EDM115 • {{ t('home.social') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeSocialLinks
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </div>
      </div>
    </section>
  </UiContainer>
</template>

<script setup lang="ts">
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiInformationOutline from "~icons/mdi/informationOutline"
import mdiText from "~icons/mdi/text"

const { locale, t } = useI18n()

const age = ref(21)
const holoCard = ref<HTMLElement | null>(null)
let isHovering = false
let idleRaf: number | null = null
let tIdle = 0
let proximity = 0 // 0..1 how close pointer is to card (1 = inside)
let ptrX = 0.5
let ptrY = 0.5

function getAge(): number {
  const birthday = new Date("2004-06-18")
  const diff = Date.now() - birthday.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

onMounted(() => {
  age.value = getAge()
  const el = holoCard.value
  if (!el) { return }
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const DEG_MULT = 16 // stronger tilt than before
  const PX_MULT = 10
  const HOVER_AMP = 1.12 // slight boost on hover

  const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const ease = (x: number) => x * x * (3 - 2 * x) // smoothstep

  // lightweight noise helpers (sin-based fractal noise)
  const noise1 = (t: number) => (Math.sin(t * 1.27) + Math.sin(t * 0.71 + 1.3) + Math.sin(t * 0.41 + 4.2)) / 3
  const noise2 = (x: number, y: number, t: number) =>
    (Math.sin((x + t) * 2.1) + Math.sin((y - t * 0.7) * 1.7 + 1.1) + Math.sin((x - y + t * 0.5) * 1.3 + 2.7)) / 3

  const setVars = (x: number, y: number, amp = 1) => {
    // x, y in [0,1]
    const px = x - 0.5
    const py = y - 0.5
    const rotX = py * DEG_MULT * amp // deg
    const rotY = -px * DEG_MULT * amp // deg
    const tx = px * PX_MULT * amp // px
    const ty = py * PX_MULT * amp // px

    el.style.setProperty("--rx", `${rotX}deg`)
    el.style.setProperty("--ry", `${rotY}deg`)
    el.style.setProperty("--tx", `${tx}px`)
    el.style.setProperty("--ty", `${ty}px`)
    el.style.setProperty("--mx", `${x * 100}%`)
    el.style.setProperty("--my", `${y * 100}%`)
  }

  const onMouseMove = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
  setVars(x, y, HOVER_AMP)
  }

  const stopIdle = () => {
    if (idleRaf !== null) {
      cancelAnimationFrame(idleRaf)
      idleRaf = null
    }
  }

  const startIdle = () => {
    stopIdle()
  if (isHovering) { return }
    if (prefersReducedMotion) { return }
    const loop = () => {
      const speedBase = 0.015
      const speed = speedBase * (0.3 + 0.7 * (1 - proximity))
      tIdle += speed
      const r = 0.28
      const idleX = 0.5 + Math.cos(tIdle) * r
      const idleY = 0.5 + Math.sin(tIdle * 0.8) * r

      // blend idle target toward pointer as proximity increases
      const p = ease(proximity)
      const x = lerp(idleX, ptrX, p)
      const y = lerp(idleY, ptrY, p)

      // slightly increase amplitude as we get closer
      const amp = lerp(0.9, 1.05, p)
      setVars(x, y, amp)

      // animate gloss/caustics angles during idle (no glow rotation)
      const n = noise2(x, y, tIdle)
      const gloss = ((tIdle + n * 0.5) % (Math.PI * 2)) * (180 / Math.PI)
      el.style.setProperty("--gloss-angle", `${gloss}deg`)
      const cAng = gloss * 1.1 + noise1(tIdle * 0.8) * 30
      el.style.setProperty("--caustics-angle", `${cAng}deg`)

      // update proximity-based intensity for CSS
      el.style.setProperty("--proximity", `${proximity.toFixed(3)}`)
      el.style.setProperty("--intensity", `${p.toFixed(3)}`)

      idleRaf = requestAnimationFrame(loop)
    }
    idleRaf = requestAnimationFrame(loop)
  }

  const onEnter = () => {
    isHovering = true
    el.classList.add("is-hover")
    stopIdle()
  }
  const onLeave = () => {
    isHovering = false
    el.classList.remove("is-hover")
    startIdle()
  }

  el.addEventListener("mousemove", onMouseMove)
  el.addEventListener("mouseenter", onEnter)
  el.addEventListener("mouseleave", onLeave)

  // global pointer proximity to smooth transition before hover
  const onDocMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const cx = clamp((e.clientX - rect.left) / rect.width)
    const cy = clamp((e.clientY - rect.top) / rect.height)
    ptrX = cx
    ptrY = cy

    // distance from card rect (0 if inside)
    const dx = e.clientX < rect.left ? rect.left - e.clientX : e.clientX > rect.right ? e.clientX - rect.right : 0
    const dy = e.clientY < rect.top ? rect.top - e.clientY : e.clientY > rect.bottom ? e.clientY - rect.bottom : 0
    const dist = Math.hypot(dx, dy)
    const radius = 220 // px influence radius
    proximity = clamp(1 - dist / radius)

  // expose CSS variables for gradual opacity/intensity when approaching
  const p = ease(proximity)
  el.style.setProperty("--proximity", `${proximity.toFixed(3)}`)
  el.style.setProperty("--intensity", `${p.toFixed(3)}`)
  }
  window.addEventListener("mousemove", onDocMove, { passive: true })

  // initialize
  setVars(0.5, 0.5)
  if (!prefersReducedMotion) { startIdle() }

  onUnmounted(() => {
    el.removeEventListener("mousemove", onMouseMove)
    el.removeEventListener("mouseenter", onEnter)
    el.removeEventListener("mouseleave", onLeave)
    window.removeEventListener("mousemove", onDocMove as EventListener)
    stopIdle()
  })
})
</script>

<style scoped lang="scss">
.internal-link {
  color: inherit;
}

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
  --proximity: 0;   /* 0..1 distance-based */
  --intensity: 0;   /* eased proximity */

  position: relative;
  border-radius: 24px;
  width: fit-content;
  transform-style: preserve-3d;
  perspective: 1000px;
  box-shadow: 0 30px 60px rgb(0 0 0 / 40%), 0 10px 20px rgb(0 0 0 / 30%);
  outline: 1px solid rgb(255 255 255 / 7%);
  isolation: isolate; /* ensure blend layers stay within */
}

.holo-glow {
  /* soft animated glow behind the image, follows tilt because it's inside .holo-inner */
  position: absolute;
  inset: -14px;
  z-index: 0;
  border-radius: inherit;
  background:
    radial-gradient(60% 60% at 50% 50%, rgb(255 255 255 / 0.20), transparent 70%),
    conic-gradient(
      rgb(255 184 108 / 0.20),
      rgb(80 250 123 / 0.18),
      rgb(139 233 253 / 0.18),
      rgb(189 147 249 / 0.18),
      rgb(255 184 108 / 0.20)
    );
  filter: blur(18px) saturate(120%);
  mix-blend-mode: screen;
  opacity: calc(0.15 + 0.35 * var(--intensity));
  pointer-events: none;
  animation: glow-pulse 6s ease-in-out infinite alternate;
}

.holo-inner {
  position: relative;
  transform: translate3d(var(--tx), var(--ty), 0) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 150ms ease;
  will-change: transform;
  border-radius: inherit;
  z-index: 1;
}

.holo-card.is-hover .holo-inner {
  transition: transform 40ms ease-out;
}

.hero-image {
  display: block;
  border-radius: inherit;
}

/* Holographic overlays */
.holo-overlay {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  mix-blend-mode: color-dodge;
  opacity: calc(0.05 + 0.35 * var(--intensity));
  background:
    /* moving white gloss following the cursor */
    radial-gradient(60% 60% at var(--mx) var(--my), rgb(255 255 255 / 0.28), transparent 60%),
    /* iridescent conic gradient */
    conic-gradient(from var(--gloss-angle) at var(--mx) var(--my),
      #ff0080 0deg,
      #ff8c00 60deg,
      #ffeb3b 120deg,
      #00e676 180deg,
      #00e5ff 240deg,
      #2979ff 300deg,
      #d500f9 360deg
    );
  filter: saturate(130%) brightness(105%) contrast(105%);
  transition: opacity 150ms ease, filter 150ms ease;
}
.holo-caustics {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: calc(0.08 + 0.22 * var(--intensity));
  mix-blend-mode: soft-light;
  background:
    /* faint vignette following focus */
    radial-gradient(80% 80% at var(--mx) var(--my), rgb(255 255 255 / 0.06), transparent 70%),
    /* overlapping conic bands to approximate evolving caustics */
    repeating-conic-gradient(from var(--caustics-angle) at 50% 50%,
      rgb(255 255 255 / 0.06) 0deg 8deg,
      transparent 8deg 16deg),
    conic-gradient(from calc(var(--caustics-angle) * -1) at 50% 50%,
      rgb(0 229 255 / 0.08),
      rgb(255 121 198 / 0.08),
      rgb(255 235 59 / 0.08),
      rgb(0 229 255 / 0.08));
  filter: saturate(115%) contrast(105%);
}

.holo-sparkles {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: calc(0.08 + 0.20 * var(--intensity));
  background:
    radial-gradient(10px 10px at 20% 30%, rgb(255 255 255 / 0.6), transparent 60%),
    radial-gradient(8px 8px at 80% 65%, rgb(255 255 255 / 0.5), transparent 60%),
    radial-gradient(6px 6px at 40% 80%, rgb(255 255 255 / 0.4), transparent 60%),
    radial-gradient(12px 12px at 60% 20%, rgb(255 255 255 / 0.5), transparent 60%);
  animation: sparkles-move 6s linear infinite;
}

@keyframes sparkles-move {
  0% { transform: translate3d(-2%, -2%, 0); }
  50% { transform: translate3d(2%, 2%, 0); }
  100% { transform: translate3d(-2%, -2%, 0); }
}

/* Hover scale for subtle lift */
.holo-card:hover .holo-inner {
  transform: translate3d(var(--tx), var(--ty), 0) rotateX(var(--rx)) rotateY(var(--ry)) scale(1.015);
}

@keyframes glow-pulse {
  0% { opacity: 0.25; }
  100% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .holo-glow,
  .holo-sparkles {
    animation: none !important;
  }
}
</style>
