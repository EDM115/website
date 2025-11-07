import type { ScreenSize } from "~/types"

/**
 * Device/computed screen state.
 * - isMobile: true when hover is none or pointer is coarse, or width <= 820px
 * - screen: responsive bucket: xs, sm, md, lg, xl, xxl
 */
export function useDevice() {
  const isMobile = ref(false)
  const screen = ref<ScreenSize>("md")

  function computeScreen(width: number): ScreenSize {
    // Common-ish breakpoints (px) : xs<480, sm<640, md<820, lg<1024, xl<1280, xxl>=1280
    if (width < 480) {
      return "xs"
    }

    if (width < 640) {
      return "sm"
    }

    if (width < 820) {
      return "md"
    }

    if (width < 1024) {
      return "lg"
    }

    if (width < 1280) {
      return "xl"
    }

    return "xxl"
  }

  function update() {
    if (typeof window === "undefined") {
      return
    }

    const width = window.innerWidth || 0
    const hoverNone = typeof window.matchMedia === "function" && window.matchMedia("(hover: none)").matches
    const coarse = typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches
    const narrow = width <= 820

    screen.value = computeScreen(width)
    isMobile.value = Boolean(hoverNone || coarse || narrow)
  }

  onMounted(() => {
    update()
    window.addEventListener("resize", update)
    window.addEventListener("orientationchange", update)
  })

  onBeforeUnmount(() => {
    if (typeof window === "undefined") {
      return
    }

    window.removeEventListener("resize", update)
    window.removeEventListener("orientationchange", update)
  })

  return {
    isMobile,
    screen,
  }
}
