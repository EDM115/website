<template>
  <div
    class="ui-banner"
    :class="[color ? `ui-banner--${color}` : '']"
  >
    <div class="ui-banner__prepend">
      <slot name="prepend">
        <UiIcon
          v-if="icon"
          :icon="icon"
        />
      </slot>
    </div>
    <div class="ui-banner__content">
      <div class="ui-banner-text">
        <slot name="text" />
      </div>
    </div>
    <div class="ui-banner__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue"

defineProps<{ color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"; icon?: Component; lines?: "one" | "two" }>()
</script>

<style scoped lang="scss">
.ui-banner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: .75rem;
  align-items: center;
  padding: .5rem 1rem;
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-md);

  position: fixed;
  // TODO : Add positionning
  bottom: 0;
}

.ui-banner--primary {
  background: color-mix(in srgb, var(--primary) 20%, var(--surface));
}

.ui-banner--secondary {
  background: color-mix(in srgb, var(--secondary) 20%, var(--surface));
}

.ui-banner--accent {
  background: color-mix(in srgb, var(--accent) 20%, var(--surface));
}

.ui-banner--info {
  background: color-mix(in srgb, var(--info) 20%, var(--surface));
}

.ui-banner--success {
  background: color-mix(in srgb, var(--success) 20%, var(--surface));
}

.ui-banner--warning {
  background: color-mix(in srgb, var(--warning) 20%, var(--surface));
}

.ui-banner--error {
  background: color-mix(in srgb, var(--error) 20%, var(--surface));
}
</style>
