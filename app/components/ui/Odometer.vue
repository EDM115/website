<template>
  <UiCol>
    <UiRow
      v-for="stat in stats"
      id="statsCounters"
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
          class="odometer mockup-odometer"
        >
          {{ formatZeros(stat.value) }}
        </div>
      </UiCard>
    </UiRow>
  </UiCol>
</template>

<script setup lang="ts">
import {
  type FunctionalComponent,
  type SVGAttributes,
} from "vue"

const props = defineProps<{ stats: {
  id: number;
  name: string;
  value: number;
  icon?: FunctionalComponent<SVGAttributes>;
}[]; }>()

interface OdometerInstance { update: (value: number)=> void }

function formatZeros(value: number): string {
  const len = value.toString().length
  const zeros = "0".repeat(len)

  return zeros.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

let observer: IntersectionObserver | null = null
let odometersReady = false
let odos: OdometerInstance[] = []
let digitObservers: MutationObserver[] = []

onMounted(async () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const idx = Number(el.id.split("-")[1])

          odos[idx]?.update(props.stats[idx]?.value ?? 0)
          observer?.unobserve(el)
        }
      })
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    },
  )

  // dynamically load tm-odometer in browser
  const TmOdometer = (await import("tm-odometer")).default

  document.querySelectorAll(".odometer")
    .forEach((el, idx) => {
      const odo = new TmOdometer({
        el: el as HTMLElement,
        value: 0,
        animation: "slide",
        duration: 8000,
        format: "( ddd)",
      })

      el.classList.remove("mockup-odometer")
      odos[idx] = odo
      observer?.observe(el)

      function applyDigitGrouping(container: HTMLElement) {
        const allDigits = Array.from(container.querySelectorAll<HTMLElement>(".odometer-digit"))
        const visibleDigits = allDigits.filter((d) => {
          const val = d.querySelector<HTMLElement>(".odometer-value")?.textContent ?? ""

          return val.trim() !== ""
        })

        allDigits.forEach((d) => {
          d.classList.remove("group-left", "group-right", "both-groups")
        })

        let i = visibleDigits.length
        const groups: HTMLElement[][] = []

        while (i > 0) {
          const start = Math.max(0, i - 3)

          groups.unshift(visibleDigits.slice(start, i))
          i -= 3
        }

        groups.forEach((group) => {
          if (group.length === 1) {
            group[0]?.classList.add("both-groups")
          } else {
            group[0]?.classList.add("group-left")
            group[group.length - 1]?.classList.add("group-right")
          }
        })
      }

      applyDigitGrouping(el as HTMLElement)

      const mo = new MutationObserver(() => applyDigitGrouping(el as HTMLElement))

      mo.observe(el as HTMLElement, {
        childList: true,
        subtree: true,
        characterData: true,
      })
      digitObservers[idx] = mo
    })

  odometersReady = true
})

onBeforeUnmount(() => {
  observer?.disconnect()
  digitObservers.forEach((m) => m.disconnect())
  digitObservers = []
})

watch(
  () => props.stats.map((s) => s.value),
  (vals) => {
    if (!odometersReady) {
      return
    }

    vals.forEach((v, i) => odos[i]?.update(v))
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

.odometer.odometer-auto-theme {
  display: inline-block;
  position: relative;
  vertical-align: middle;

  border-radius: 0.5em;

  font-family: "Fira Code", monospace;
  font-size: 3em;
  font-weight: 600;
  line-height: 1.2;

  color: var(--primary);

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

      &.odometer-last-value {
        position: absolute;
      }
    }
  }

  &.odometer-animating-up .odometer-ribbon-inner,
  &.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
    transition-timing-function: ease-in-out;
  }

  &.odometer-animating-up {
    .odometer-ribbon-inner {
      transition: transform 8s;
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
      transition: transform 8s;
      transform: translateY(0);
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
