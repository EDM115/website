<template>
  <span
    ref="wrapperRef"
    class="ui-tooltip-wrapper"
  >
    <slot
      v-if="activateOnClick"
      name="activator"
      :props="{ onClick: open ? hide : show }"
    />
    <slot
      v-else
      name="activator"
      :props="{ onMouseenter: show, onMouseleave: hide }"
    />
    <Teleport to="body">
      <span
        v-show="open"
        ref="tooltipRef"
        class="ui-tooltip"
        role="tooltip"
        :style="style"
      >{{ text }}</span>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Tooltip text to display
   */
  text: string;

  /**
   * Preferred location around the activator
   */
  location?: "top" | "bottom" | "left" | "right";

  /**
   * Whether the tooltip should activate on click or on hover (default)
   */
  activateOnClick?: boolean;

  /**
   * Gap between the tooltip and the activator in pixels
   */
  gap?: number;

  /**
   * Viewport padding when clamping in pixels
   */
  padding?: number;
}>()

const open = ref(false)
const GAP = computed(() => props.gap ?? 8)
const PADDING = computed(() => props.padding ?? 40)
const location = computed(() => props.location ?? "top")

const wrapperRef = useTemplateRef("wrapperRef")
const tooltipRef = useTemplateRef("tooltipRef")

const {
  top: triggerTop,
  bottom: triggerBottom,
  left: triggerLeft,
  right: triggerRight,
  width: triggerWidth,
  height: triggerHeight,
  x: triggerX,
  y: triggerY,
} = useElementBounding(wrapperRef)
const {
  width: vw,
  height: vh,
} = useWindowSize()

const style = ref<Record<string, string>>({
  position: "fixed",
  zIndex: "1000",
})

function show() {
  open.value = true
  // ensure tooltip is in the DOM before measuring
  nextTick(updatePosition)
}

function hide() {
  open.value = false
}

function getTooltipRect() {
  const el = tooltipRef.value

  if (!el) {
    return {
      width: 0, height: 0,
    }
  }

  // Temporarily make sure we can measure even if transitioning
  const prev = { visibility: el.style.visibility }

  el.style.visibility = "hidden"
  const boundingRect = el.getBoundingClientRect()

  el.style.visibility = prev.visibility

  return {
    width: boundingRect.width,
    height: boundingRect.height,
  }
}

function tryPlacement(place: "top" | "bottom" | "left" | "right") {
  const {
    width: tw,
    height: th,
  } = getTooltipRect()

  let x = 0, y = 0

  if (place === "top") {
    x = triggerLeft.value + ((triggerWidth.value - tw) / 2)
    y = triggerTop.value - GAP.value - th
  }

  if (place === "bottom") {
    x = triggerLeft.value + ((triggerWidth.value - tw) / 2)
    y = triggerBottom.value + GAP.value
  }

  if (place === "left") {
    x = triggerLeft.value - GAP.value - tw
    y = triggerTop.value + ((triggerHeight.value - th) / 2)
  }

  if (place === "right") {
    x = triggerRight.value + GAP.value
    y = triggerTop.value + ((triggerHeight.value - th) / 2)
  }

  return {
    x, y, tw, th,
  }
}

function willOverflow({
  x, y, tw, th,
}: {
  x: number;
  y: number;
  tw: number;
  th: number;
}) {
  return (
    x < PADDING.value
    || y < PADDING.value
    || x + tw > vw.value - PADDING.value
    || y + th > vh.value - PADDING.value
  )
}

function clampAxisFor(placement: "top" | "bottom" | "left" | "right", x: number, y: number, tw: number, th: number) {
  // clamp to keep inside viewport padding box
  const minX = PADDING.value, maxX = vw.value - tw - PADDING.value
  const minY = PADDING.value, maxY = vh.value - th - PADDING.value

  if (placement === "top" || placement === "bottom") {
    // shift ONLY horizontally to keep close to the trigger
    x = Math.min(Math.max(x, minX), Math.max(minX, maxX))
  } else {
    // shift ONLY vertically
    y = Math.min(Math.max(y, minY), Math.max(minY, maxY))
  }

  return {
    x, y,
  }
}

function updatePosition() {
  if (!wrapperRef.value || !tooltipRef.value || !open.value) {
    return
  }

  // 1) try preferred
  let candidate = tryPlacement(location.value)

  // 2) flip if needed (try opposite side if overflowing)
  if (willOverflow(candidate)) {
    const opposite: Record<typeof location.value, typeof location.value> = {
      top: "bottom", bottom: "top", left: "right", right: "left",
    }
    const flipped = tryPlacement(opposite[location.value])

    candidate = willOverflow(flipped)
      ? candidate
      : flipped
  }

  // 3) shift only on the cross-axis to keep it next to the activator
  const {
    x, y,
  } = clampAxisFor(location.value, candidate.x, candidate.y, candidate.tw, candidate.th)

  // 4) cap size to available viewport so it never bursts out
  const availInline = Math.max(160, vw.value - (2 * PADDING.value))
  const maxHeight = Math.max(PADDING.value, vh.value - (2 * PADDING.value))

  style.value = {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    width: "max-content",
    maxWidth: `${availInline}px`,
    maxHeight: `${maxHeight}px`,
    overflow: "auto",
    zIndex: "1000",
    overflowWrap: "anywhere",
  }
}

// keep it fresh on resize/scroll/content changes
watch(
  [
    () => location.value,
    () => open.value,
    vw,
    vh,
    () => triggerX.value,
    () => triggerY.value,
    () => triggerWidth.value,
    () => triggerHeight.value,
  ],
  () => {
    if (open.value) {
      updatePosition()
    }
  },
)

const { stop: stopResizeObserver } = useResizeObserver(tooltipRef, () => {
  if (open.value) {
    updatePosition()
  }
})

useEventListener(window, "scroll", () => {
  if (open.value) {
    updatePosition()
  }
}, { passive: true })

onBeforeUnmount(() => {
  open.value = false
  stopResizeObserver()
})
</script>

<style scoped lang="scss">
.ui-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.ui-tooltip {
  background: var(--surface);
  color: var(--text);
  padding: .75rem 1rem;
  border-radius: .75rem;
  white-space: pre-line;
  word-break: normal;
  box-shadow: var(--shadow-md);
  font-size: .875rem;
  text-align: center;
  text-wrap: pretty;
}
</style>
