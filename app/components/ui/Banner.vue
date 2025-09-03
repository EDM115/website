<template>
  <div :class="`ui-banner ${color ? `ui-banner--${color}` : ''}`">
    <div class="ui-banner--prepend">
      <slot name="prepend">
        <UiIcon
          v-if="icon"
          :icon="icon"
        />
      </slot>
    </div>
    <div class="ui-banner--content">
      <slot />
    </div>
    <div class="ui-banner--actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue"

import { colorVars } from "./colors"

defineProps<{

  /**
   * Color theme applied to the banner background
   */
  color?: keyof typeof colorVars;

  /**
   * Optional icon displayed in the prepend slot by default
   */
  icon?: Component;
}>()
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
  left: 0;
  right: 0;
  z-index: 1000;

  &--prepend {
    transform: scale(1.5);
  }

  &--primary {
    background: color-mix(in srgb, var(--primary) 20%, var(--surface));
  }

  &--secondary {
    background: color-mix(in srgb, var(--secondary) 20%, var(--surface));
  }

  &--accent {
    background: color-mix(in srgb, var(--accent) 20%, var(--surface));
  }

  &--info {
    background: color-mix(in srgb, var(--info) 20%, var(--surface));
  }

  &--success {
    background: color-mix(in srgb, var(--success) 20%, var(--surface));
  }

  &--warning {
    background: color-mix(in srgb, var(--warning) 20%, var(--surface));
  }

  &--error {
    background: color-mix(in srgb, var(--error) 20%, var(--surface));
  }
}
</style>
