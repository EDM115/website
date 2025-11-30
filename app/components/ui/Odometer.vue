<template>
  <UiCol id="statsCounters">
    <UiRow
      v-for="stat in stats"
      :key="stat.id"
      style="align-items: center; display: flex; justify-content: center;"
    >
      <UiCard variant="flat">
        <template #title>
          <span class="ui-stat-title">
            <UiIcon
              v-if="stat.icon"
              :icon="stat.icon"
            />
            {{ stat.name }}
          </span>
        </template>

        <div
          :id="'od-' + stat.id"
          class="mockup-odometer"
        >
          {{ formatZeros(stat.value) }}
        </div>
      </UiCard>
    </UiRow>
  </UiCol>
</template>

<script setup lang="ts">
import LightOdometer from "light-odometer"

import {
  type FunctionalComponent,
  type SVGAttributes,
} from "vue"

const props = defineProps<{ stats: {
  id: number;
  name: string;
  value: number | Ref<number>;
  icon?: FunctionalComponent<SVGAttributes>;
}[]; }>()

const { isMobile } = useDevice()

function formatZeros(value: number | Ref<number>): string {
  const num = unref(value) ?? 0
  const len = num.toString().length
  const zeros = "0".repeat(len)

  return zeros.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

let observer: IntersectionObserver | null = null
let odometersReady = false
let odos: Record<number, LightOdometer> = {}
let digitObservers: Record<number, MutationObserver> = {}
let unsubscribers: Array<() => void> = []
const pending = new Map<number, number>()
const revealed = new Set<number>()

const MUTATION_OBSERVER_CONFIG: MutationObserverInit = {
  childList: true,
  subtree: true,
  characterData: true,
}

function toggleMobileClass(el: HTMLElement | null | undefined, mobile: boolean) {
  el?.classList.toggle("odometer-mobile", mobile)
}

function applyDigitGrouping(container: HTMLElement, observerInstance?: MutationObserver) {
  toggleMobileClass(container, isMobile.value)
  observerInstance?.disconnect()

  const inside = container.querySelector<HTMLElement>(".odometer-inside")

  if (!inside) {
    observerInstance?.observe(container, MUTATION_OBSERVER_CONFIG)

    return
  }

  inside.querySelectorAll<HTMLElement>(".odometer-digit-group")
    .forEach((group) => {
      while (group.firstChild) {
        inside.insertBefore(group.firstChild, group)
      }

      group.remove()
    })

  const digits = Array.from(inside.querySelectorAll<HTMLElement>(".odometer-digit"))
    .filter((digit) => {
      const val = digit.querySelector<HTMLElement>(".odometer-value")?.textContent ?? ""

      return val.trim() !== ""
    })

  if (digits.length === 0) {
    observerInstance?.observe(container, MUTATION_OBSERVER_CONFIG)

    return
  }

  digits.forEach((digit) => {
    digit.classList.remove("group-left", "group-right", "both-groups")
  })

  const groups: HTMLElement[][] = []
  const remainder = digits.length % 3
  let index = 0

  if (remainder > 0) {
    groups.push(digits.slice(0, remainder))
    index = remainder
  }

  for (; index < digits.length; index += 3) {
    groups.push(digits.slice(index, index + 3))
  }

  groups.forEach((group) => {
    if (group.length === 0) {
      return
    }

    const wrapper = document.createElement("span")

    wrapper.className = "odometer-digit-group"
    const firstDigit = group[0]

    if (!firstDigit) {
      return
    }

    inside.insertBefore(wrapper, firstDigit)

    group.forEach((digit, idx) => {
      wrapper.appendChild(digit)

      if (group.length === 1) {
        digit.classList.add("both-groups")
      } else {
        if (idx === 0) {
          digit.classList.add("group-left")
        }

        if (idx === group.length - 1) {
          digit.classList.add("group-right")
        }
      }
    })
  })

  observerInstance?.observe(container, MUTATION_OBSERVER_CONFIG)
}

function attachEvents(odo: LightOdometer, id: number) {
  const onDone = (_e: Event) => {
    // After finishing, if a pending value exists, apply it immediately
    const next = pending.get(id)

    if (typeof next === "number") {
      pending.delete(id)
      // shorten duration for subsequent updates if desired
      const opts = odo.getOptions()

      if ((opts.duration ?? 2000) !== 2000) {
        odo.setOptions({ duration: 2000 })
      }

      odo.update(next)
    }
  }

  odo.on("odometerdone", onDone)
  unsubscribers.push(() => odo.off("odometerdone", onDone))
}

onMounted(() => {
  window.odometerOptions = { selector: ".mockup-odometer" }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        const el = entry.target as HTMLElement
        const idFromEl = Number(el.id.split("-")[1])
        const stat = props.stats.find((s) => s.id === idFromEl)

        revealed.add(idFromEl)

        const queued = pending.get(idFromEl)
        const newVal = typeof queued === "number"
          ? queued
          : (unref(stat?.value) ?? 0)

        if (typeof queued === "number") {
          pending.delete(idFromEl)
        }

        if (isRef(stat?.value)) {
          odos[idFromEl]?.update(newVal)
        } else {
          odos[idFromEl]?.animateOnceAndDisconnect(newVal)
        }

        observer?.unobserve(el)
      })
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    },
  )

  const scope = document.getElementById("statsCounters") ?? document

  scope.querySelectorAll(".mockup-odometer")
    .forEach((el) => {
      const containerEl = el as HTMLElement
      const id = Number(containerEl.id.split("-")[1])
      const odo = new LightOdometer({
        el: containerEl,
        id,
        value: 0,
        animation: "slide",
        duration: 8000,
        format: "( ddd)",
        framerate: 20,
      })

      attachEvents(odo, id)

      containerEl.classList.remove("mockup-odometer")
      odos[id] = odo
      observer?.observe(containerEl)
      toggleMobileClass(containerEl, isMobile.value)

      const mo = new MutationObserver((_records, observerInstance) => applyDigitGrouping(containerEl, observerInstance))

      digitObservers[id] = mo
      applyDigitGrouping(containerEl, mo)
    })

  odometersReady = true
})

onBeforeUnmount(() => {
  observer?.disconnect()
  Object.values(digitObservers)
    .forEach((m) => m.disconnect())
  digitObservers = {}
  Object.values(odos)
    .forEach((o) => o.disconnect())
  odos = {}
  unsubscribers.forEach((u) => u())
  unsubscribers = []
})

watch(isMobile, (mobile) => {
  Object.entries(odos)
    .forEach(([ key, odo ]) => {
      if (!odo) {
        return
      }

      const el = odo.el

      toggleMobileClass(el, mobile)

      const observerInstance = digitObservers[Number(key)]

      applyDigitGrouping(el, observerInstance)
    })
})

watch(
  () => props.stats.map((s) => unref(s.value)),
  (newVals, oldVals) => {
    if (!odometersReady) {
      return
    }

    newVals.forEach((v, i) => {
      const id = props.stats[i]?.id

      if (id == null || v === oldVals[i]) {
        return
      }

      if (isRef(props.stats[i]?.value)) {
        const odo = odos[id]

        if (!odo) {
          return
        }

        // If not yet revealed, just queue and return
        if (!revealed.has(id)) {
          pending.set(id, v ?? 0)

          return
        }

        // If currently animating, just store the latest requested value
        if (odo.isAnimating) {
          pending.set(id, v ?? 0)
        } else {
          const opts = odo.getOptions()

          if ((opts.duration ?? 2000) !== 2000) {
            odo.setOptions({ duration: 2000 })
          }

          odo.update(v ?? 0)
        }
      }
    })
  },
)
</script>

<style lang="scss">
$borderRadius: .2em;
$padding: .15em;

.mockup-odometer {
  display: inline-block;
  position: relative;
  vertical-align: middle;

  border-radius: $borderRadius;
  margin: 0px 1px;

  font-family: "Fira Code", monospace;
  font-size: 3em;
  font-weight: 600;
  line-height: 1.2;

  background-color: var(--bg-light);
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);
  color: var(--primary);
}

.odometer-auto-theme {
  display: inline-block;
  position: relative;
  vertical-align: middle;

  border-radius: 0.5em;

  font-family: "Fira Code", monospace;
  font-size: 3em;
  font-weight: 600;
  line-height: 1.2;

  color: var(--primary);

  .odometer-digit-group {
    display: inline-flex;
    white-space: nowrap;
  }

  .odometer-digit {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    margin: 0px 1px;
    padding: $padding $padding;

    background-color: var(--bg-light);
    box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);

    &.group-left {
      border-radius: $borderRadius 0 0 $borderRadius;
    }

    &.group-right {
      border-radius: 0 $borderRadius $borderRadius 0;
    }

    &.both-groups {
      border-radius: $borderRadius;
    }

    .odometer-digit-inner {
      display: block;
      position: absolute;

      overflow: hidden;
      padding-top: $padding;
      text-align: left;

      top: 0;
      left: $padding;
      right: 0;
      bottom: 0;
    }

    .odometer-digit-spacer {
      display: inline-block;
      vertical-align: middle;
      visibility: hidden;
    }

    .odometer-ribbon {
      display: block;
    }

    .odometer-ribbon-inner {
      display: block;
      backface-visibility: hidden;
    }

    .odometer-value {
      display: block;
      transform: translateZ(0);
      user-select: none;

      &.odometer-last-value {
        position: absolute;
        user-select: text;
      }
    }
  }

  &.odometer-animating-up .odometer-ribbon-inner,
  &.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
    transition-timing-function: ease-in-out;
  }

  &.odometer-animating-up {
    .odometer-ribbon-inner {
      transition: transform var(--odometer-duration, 2000ms);
    }

    &.odometer-animating .odometer-ribbon-inner {
      transform: translateY(-100%);
    }
  }

  &.odometer-animating-down {
    .odometer-ribbon-inner {
      transform: translateY(-100%);
    }

    &.odometer-animating .odometer-ribbon-inner {
      transition: transform var(--odometer-duration, 2000ms);
      transform: translateY(0);
    }
  }

  &.odometer-mobile {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35em;
    justify-content: center;
    padding: 0.2em 0.4em;
    white-space: normal;

    .odometer-digit-group {
      flex: 0 0 auto;
    }

    .odometer-digit {
      margin: 0px 1px;
    }
  }
}

.ui-stat-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1;
}
</style>
