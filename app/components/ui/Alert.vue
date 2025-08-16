<template>
  <div :class="`ui-alert ${type ? `ui-alert--${type}` : ''}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{

  /**
   * Visual style of the alert
   */
  type?: "info" | "success" | "warning" | "error"

  /**
   * Optional text content to render, if omitted the default slot is used
   */
  text?: string
}>()
</script>

<style scoped lang="scss">
.ui-alert {
  padding: .75rem 1rem;
  border-radius: .5rem;

  &--primary {
    background: color-mix(in srgb, var(--primary) 15%, transparent);
    color: var(--text);
  }

  &--secondary {
    background: color-mix(in srgb, var(--secondary) 15%, transparent);
    color: var(--text);
  }

  &--info {
    background: color-mix(in srgb, var(--info) 15%, transparent);
    color: var(--text);
  }

  &--success {
    background: color-mix(in srgb, var(--success) 15%, transparent);
    color: var(--text);
  }

  &--warning {
    background: color-mix(in srgb, var(--warning) 15%, transparent);
    color: var(--text);
  }

  &--error {
    background: color-mix(in srgb, var(--error) 15%, transparent);
    color: var(--text);
  }
}
</style>
