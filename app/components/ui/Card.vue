<template>
  <div
    :class="classes"
    v-bind="$attrs"
    :style="maxWidthStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: "elevated" | "outlined" | "flat"
  maxWidth?: string | number
}>()

const classes = computed(() => [
  "ui-card",
  props.variant ? `ui-card--${props.variant}` : "ui-card--elevated",
])

const maxWidthStyle = computed(() => (props.maxWidth !== undefined
  ? { maxWidth: typeof props.maxWidth === "number" ? `${props.maxWidth}px` : String(props.maxWidth) }
  : undefined))
</script>

<style scoped lang="scss">
.ui-card {
  background: var(--surface);
  color: var(--text);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);

  &--outlined {
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text) 30%, transparent);
    background: color-mix(in srgb, var(--surface) 50%, transparent);
  }

  &--flat {
    box-shadow: none;
    background: transparent;
  }
}
</style>
