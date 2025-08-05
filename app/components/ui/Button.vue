<template>
  <NuxtLink
    v-if="props.link"
    :to="props.link"
    :class="classes"
    :aria-disabled="props.disabled ? 'true' : undefined"
  >
    <button>
      <component
        :is="props.prependIcon"
        v-if="!props.icon && props.prependIcon"
        class="ui-btn--icon-prepend"
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
        <template v-if="props.text">
          {{ text }}
        </template>
        <slot v-else />
      </span>
      <component
        :is="props.appendIcon"
        v-if="!props.icon && props.appendIcon"
        class="ui-btn--icon-append"
      />
    </button>
  </NuxtLink>

  <button
    v-else
    :class="classes"
    :disabled="props.disabled"
  >
    <component
      :is="props.prependIcon"
      v-if="!props.icon && props.prependIcon"
      class="ui-btn--icon-prepend"
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
      <template v-if="props.text">
        {{ text }}
      </template>
      <slot v-else />
    </span>
    <component
      :is="props.appendIcon"
      v-if="!props.icon && props.appendIcon"
      class="ui-btn--icon-append"
    />
  </button>
</template>

<script setup lang="ts">
import type { Component } from "vue"
import { colorVars } from "./colors"

const props = defineProps<{
  /**
   * Size of the button
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * The text to display inside the button  
   * If an `icon` is provided, the text won't be rendered  
   * If you pass a children element to an `UiButton` with `text` set, only the text will be rendered
   */
  text?: string
  /**
   * The link to navigate to when the button is clicked  
   * Uses `NuxtLink` under the hood for prefetching
   */
  link?: string
  /**
   * The color of the button
   */
  color?: keyof typeof colorVars
  /**
   * The variant of the button  
   * - `elevated` : Fully color the button, with a nice box shadow  
   * - `outlined` : Adds a colored inner border with no background  
   * - `tonal` : Tints the background with the provided color  
   * - `flat` : Transparent background with no shadow  
   * @default "elevated"
   */
  variant?: "elevated" | "outlined" | "tonal" | "flat"
  /**
   * Makes the button into a Floating Action Button  
   * If enabled, will stick it to a corner of the screen  
   * When no value is provided, it defaults to `bottom right`
   */
  fab?: boolean | "bottom right" | "bottom left" | "top right" | "top left"
  /**
   * Transforms the button into a circular shape with the icon displayed in the middle  
   * No text can be rendered this way
   */
  icon?: Component
  /**
   * Inserts an icon at before the text
   */
  prependIcon?: Component
  /**
   * Inserts an icon at after the text
   */
  appendIcon?: Component
  /**
   * Disables any interaction with the button
   */
  disabled?: boolean
}>()

function fabClassBuilder(fab: boolean | string): string {
  if (typeof fab === "boolean") {
    return fab ? "ui-btn--fab ui-btn--fab--bottom-right" : ""
  } else {
    return `ui-btn--fab ui-btn--fab--${fab.replace(" ", "-")}`
  }
} 

const classes = computed(() => [
  "ui-btn",
  `ui-btn--${props.size ?? "md"}`,
  `ui-btn--${props.variant ?? "elevated"}`,
  props.color ? `ui-btn--${props.color}` : "",
  props.icon ? "ui-btn--icon-only" : "",
  props.prependIcon ? "ui-btn--icon-prepend" : "",
  props.appendIcon ? "ui-btn--icon-append" : "",
  props.fab ? fabClassBuilder(props.fab) : "",
  props.disabled ? "ui-btn--disabled" : "",
])
</script>

<style scoped lang="scss">
.ui-btn {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all .2s;
  background-color: var(--surface);
  color: var(--text);

  &--sm {
    padding: 0 0.75rem;
    font-size: 0.75rem;
    height: 1.75rem;
    --ui-btn-height: 28px;
  }

  &--md {
    padding: 0 1rem;
    font-size: 0.875rem;
    height: 2.25rem;
    --ui-btn-height: 36px;
  }

  &--lg {
    padding: 0 1.25rem;
    font-size: 1rem;
    height: 2.75rem;
    --ui-btn-height: 44px;
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
    background-color: rgb(from var(--surface) r g b / 20%);

    &.ui-btn--primary {
      background-color: rgb(from var(--primary) r g b / 20%);
    }

    &.ui-btn--secondary {
      background-color: rgb(from var(--secondary) r g b / 20%);
    }

    &.ui-btn--accent {
      background-color: rgb(from var(--accent) r g b / 20%);
    }

    &.ui-btn--error {
      background-color: rgb(from var(--error) r g b / 20%);
    }

    &.ui-btn--info {
      background-color: rgb(from var(--info) r g b / 20%);
    }

    &.ui-btn--success {
      background-color: rgb(from var(--success) r g b / 20%);
    }

    &.ui-btn--warning {
      background-color: rgb(from var(--warning) r g b / 20%);
    }

    &.ui-btn--text {
      background-color: rgb(from var(--text) r g b / 20%);
    }

    &:hover {
      color: var(--surface);

      &.ui-btn--primary {
        color: var(--primary);
      }

      &.ui-btn--secondary {
        color: var(--secondary);
      }

      &.ui-btn--accent {
        color: var(--accent);
      }

      &.ui-btn--error {
        color: var(--error);
      }

      &.ui-btn--info {
        color: var(--info);
      }

      &.ui-btn--success {
        color: var(--success);
      }

      &.ui-btn--warning {
        color: var(--warning);
      }

      &.ui-btn--text {
        color: var(--text);
      }
    }

    & .ui-btn--inside-text {
      background-color: transparent;
    }
  }

  &--flat {
    background-color: transparent;
    box-shadow: none;

    &.ui-btn--primary {
      color: var(--primary);
    }

    &.ui-btn--secondary {
      color: var(--secondary);
    }

    &.ui-btn--accent {
      color: var(--accent);
    }

    &.ui-btn--error {
      color: var(--error);
    }

    &.ui-btn--info {
      color: var(--info);
    }

    &.ui-btn--success {
      color: var(--success);
    }

    &.ui-btn--warning {
      color: var(--warning);
    }

    &.ui-btn--text {
      color: var(--text);
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
    margin: 0.75rem;
    position: fixed;

    &--bottom-right {
      bottom: 0;
      right: 0;
    }

    &--bottom-left {
      bottom: 0;
      left: 0;
    }

    &--top-right {
      top: 0;
      right: 0;
    }

    &--top-left {
      top: 0;
      left: 0;
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--inside-text {
    background-color: inherit;
    color: inherit;
  }

  &--icon-only {
    border-radius: 50%;
    padding: 0.2em;
    height: 2em;
    width: 2em;
    font-size: 1.5em;
  }

  &--icon-prepend {
    grid-area: prepend;
    margin-inline: calc(var(--ui-btn-height) / -9) calc(var(--ui-btn-height) / 9);
  }

  &--icon-append {
    grid-area: append;
    margin-inline: calc(var(--ui-btn-height) / 9) calc(var(--ui-btn-height) / -9);
  }

  & button {
    display: inline-flex;
    align-items: center;
    background-color: inherit;
    color: inherit;
  }
}
</style>
