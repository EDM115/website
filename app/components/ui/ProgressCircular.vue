<template>
  <div
    class="ui-progress-circular"
    :class="wrapperClass"
    :style="sizeStyle"
  >
    <svg viewBox="0 0 36 36">
      <circle
        class="ui-progress-circular--bg"
        cx="18"
        cy="18"
        r="15"
        fill="none"
        :stroke-width="strokeWidth"
        :style="bgStyle"
      />
      <circle
        class="ui-progress-circular--fg"
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke-linecap="round"
        :stroke-width="strokeWidth"
        :stroke-dasharray="fgDashArray"
        :stroke-dashoffset="fgDashOffset"
        :style="fgStyle"
      />
    </svg>
    <div class="ui-progress-circular--content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Progress percentage (0-100) when determinate
   */
  modelValue?: number;

  /**
   * Shows an indeterminate spinner
   */
  indeterminate?: boolean;

  /**
   * Size in pixels of the spinner square
   */
  size?: number;

  /**
   * Stroke width for the circle in pixels
   */
  width?: number;

  /**
   * CSS color for the progress stroke
   */
  color?: string;
}>()

const size = computed(() => props.size ?? 40)

const circumference = 2 * Math.PI * 15

const dashOffset = computed(() => {
  if (props.indeterminate) {
    return circumference * 0.3
  }

  const val = Math.max(0, Math.min(100, props.modelValue ?? 0))

  return circumference * (1 - (val / 100))
})


const strokeWidth = computed(() => props.width ?? 4)
const wrapperClass = computed(() => ({
  "ui-progress-circular--indeterminate": props.indeterminate,
}))
const fgDashArray = computed(() => (props.indeterminate
  ? undefined
  : circumference))
const fgDashOffset = computed(() => (props.indeterminate
  ? undefined
  : dashOffset.value))
const fgStyle = computed(() => (props.color
  ? { stroke: props.color }
  : undefined))
const bgStyle = computed(() => (props.color
  ? {
      stroke: props.color, opacity: 0.2,
    }
  : undefined))

const sizeStyle = computed(() => ({
  width: `${size.value}px`,
  height: `${size.value}px`,
}))
</script>

<style scoped lang="scss">
.ui-progress-circular {
  position: relative;
  display: inline-block;

  svg {
    transform: rotate(-90deg);
    transform-origin: center;
    width: 100%;
    height: 100%;
  }

  &--bg {
    stroke: color-mix(in srgb, var(--text) 20%, transparent);
  }

  &--fg {
    stroke: var(--primary);
    stroke-linecap: round;
    transition: stroke-dashoffset var(--pc-duration, 3s) var(--pc-ease, ease-in-out);
  }

  &--content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
}

.ui-progress-circular--indeterminate {
  .ui-progress-circular--bg {
    opacity: 0.2;
  }

  svg {
    animation: ui-progress-circular-rotate 1.4s linear infinite;
  }

  .ui-progress-circular--fg {
    animation: ui-progress-circular-dash 1.4s ease-in-out infinite;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
}

@keyframes ui-progress-circular-rotate {
  0% { transform: rotate(-90deg); }
  100% { transform: rotate(270deg); }
}

@keyframes ui-progress-circular-dash {
  0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15; }
  100% { stroke-dasharray: 100, 200; stroke-dashoffset: -120; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-progress-circular {
    &--fg {
      transition: none;
    }
  }

  .ui-progress-circular--indeterminate {
    svg,
    .ui-progress-circular--fg {
      animation: none !important;
    }
  }
}
</style>
