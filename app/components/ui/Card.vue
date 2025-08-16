<template>
  <div
    :class="classes"
    v-bind="$attrs"
    :style="maxWidthStyle"
  >
    <div class="ui-card--title">
      <slot name="title" />
    </div>
    <div class="ui-card--content">
      <slot />
    </div>
    <div class="ui-card--actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Visual style of the card surface
   * - `elevated` : default with shadow
   * - `outlined` : inner border, subtle bg
   * - `flat` : no shadow, transparent bg
   */
  variant?: "elevated" | "outlined" | "flat"

  /**
   * Maximum width for the card container (px or any CSS size)
   */
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

  &--title {
    padding: 1rem 1rem 0 1rem;
    font-weight: 600;
    font-size: 1.1rem;
    overflow-wrap: normal;
    overflow: visible;
    white-space: wrap;
  }

  &--content {
    padding: 0.75rem 1rem 1rem 1rem;
  }

  &--actions {
    padding: 0.75rem 1rem 1rem 1rem;
    display: flex;
    gap: .5rem;
  }
}
</style>
