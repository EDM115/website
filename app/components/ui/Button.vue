<template>
  <NuxtLink
    v-if="props.link"
    :to="props.link"
    :class="classes"
    :aria-disabled="props.disabled ? 'true' : undefined"
  >
    <component
      :is="props.prependIcon"
      v-if="props.prependIcon"
      class="ui-btn--icon"
    />
    <component
      :is="props.icon"
      v-if="props.icon"
      class="ui-btn--icon-only"
    />
    <button
      v-else
      class="ui-btn--inside-text"
    >
      {{ text }}
    </button>
    <component
      :is="props.appendIcon"
      v-if="props.appendIcon"
      class="ui-btn--icon"
    />
  </NuxtLink>

  <button
    v-else
    :class="classes"
    :disabled="props.disabled"
  >
    <component
      :is="props.prependIcon"
      v-if="props.prependIcon"
      class="ui-btn--icon"
    />
    <component
      :is="props.icon"
      v-if="props.icon"
      class="ui-btn--icon-only"
    />
    <span
      v-else
      class="ui-btn--inside-text"
    >
      {{ text }}
    </span>
    <component
      :is="props.appendIcon"
      v-if="props.appendIcon"
      class="ui-btn--icon"
    />
  </button>
</template>

<script setup lang="ts">
import type { Component } from "vue"
import { colorVars } from "./colors"

const props = defineProps<{
  size?: "sm" | "md" | "lg"
  text?: string
  link?: string
  color?: keyof typeof colorVars
  variant?: "elevated" | "outlined" | "tonal"
  fab?: boolean
  icon?: Component
  prependIcon?: Component
  appendIcon?: Component
  disabled?: boolean
}>()

// derive class names
const classes = computed(() => [
  "ui-btn",
  `ui-btn--${props.size ?? "md"}`,
  `ui-btn--${props.variant ?? "elevated"}`,
  props.color && `ui-btn--${props.color}`,
  { "ui-btn--fab": props.fab, "is-disabled": props.disabled },
])
</script>

<style scoped lang="scss">
.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow .2s;
  background-color: var(--surface);
  color: var(--text);

  &--sm {
    padding: 0.25em 0.5em;
    font-size: 0.875rem;
  }

  &--md {
    padding: 0.5em 1em;
    font-size: 1rem;
  }

  &--lg {
    padding: 0.75em 1.5em;
    font-size: 1.125rem;
  }

  &--elevated {
    box-shadow: var(--shadow-md);
    background-color: var(--surface);

    &.ui-btn--primary {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--secondary {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--accent {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--error {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--info {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--success {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--warning {
      color: var(--dark-mode-bg);
    }

    &.ui-btn--text {
      color: var(--dark-mode-bg);
    }
  }

  &--outlined {
    background-color: transparent !important;
    box-shadow: inset 0 0 0 2px var(--text);

    &.ui-btn--primary {
      box-shadow: inset 0 0 0 2px var(--primary);
    }

    &.ui-btn--secondary {
      box-shadow: inset 0 0 0 2px var(--secondary);
    }

    &.ui-btn--accent {
      box-shadow: inset 0 0 0 2px var(--accent);
    }

    &.ui-btn--error {
      box-shadow: inset 0 0 0 2px var(--error);
    }

    &.ui-btn--info {
      box-shadow: inset 0 0 0 2px var(--info);
    }

    &.ui-btn--success {
      box-shadow: inset 0 0 0 2px var(--success);
    }

    &.ui-btn--warning {
      box-shadow: inset 0 0 0 2px var(--warning);
    }

    &.ui-btn--text {
      box-shadow: inset 0 0 0 2px var(--text);
    }
  }

  &--tonal {
    background-color: rgb(from var(--surface) r g b / 35%);

    &.ui-btn--primary {
      background-color: rgb(from var(--primary) r g b / 35%);
    }

    &.ui-btn--secondary {
      background-color: rgb(from var(--secondary) r g b / 35%);
    }

    &.ui-btn--accent {
      background-color: rgb(from var(--accent) r g b / 35%);
    }

    &.ui-btn--error {
      background-color: rgb(from var(--error) r g b / 35%);
    }

    &.ui-btn--info {
      background-color: rgb(from var(--info) r g b / 35%);
    }

    &.ui-btn--success {
      background-color: rgb(from var(--success) r g b / 35%);
    }

    &.ui-btn--warning {
      background-color: rgb(from var(--warning) r g b / 35%);
    }

    &.ui-btn--text {
      background-color: rgb(from var(--text) r g b / 35%);
    }
  }

  &--primary {
    background-color: var(--primary);
  }

  &--secondary {
    background-color: var(--secondary);
  }

  &--accent {
    background-color: var(--accent);
  }

  &--error {
    background-color: var(--error);
  }

  &--info {
    background-color: var(--info);
  }

  &--success {
    background-color: var(--success);
  }

  &--warning {
    background-color: var(--warning);
  }

  &--text {
    background-color: var(--text);
  }

  &--fab {
    border-radius: 50%;
    padding: 0.75em;
  }
}

.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-btn--icon,
.ui-btn--icon-only { margin: 0; }
</style>
