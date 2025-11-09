<template>
  <NuxtLink
    v-if="link"
    :target="linkTarget"
    :external="linkExternal"
    :to="link"
    :class="classes"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-label="aria"
    @click="unFocus"
  >
    <component
      :is="prependIcon"
      v-if="!hasExpandableIcon && !icon && prependIcon"
      class="ui-btn--icon-prepend"
    />
    <template v-if="hasExpandableIcon">
      <span class="ui-btn--expandable-wrapper">
        <component
          :is="icon"
          class="ui-btn--expandable-icon"
        />
        <span class="ui-btn--inside-text ui-btn--expandable-text">
          <template v-if="text">
            {{ text }}
          </template>
          <slot v-else />
        </span>
      </span>
    </template>
    <template v-else>
      <component
        :is="icon"
        v-if="icon"
        class="ui-btn--icon-only"
      />
      <span
        v-else
        class="ui-btn--inside-text"
      >
        <template v-if="text">
          {{ text }}
        </template>
        <slot v-else />
      </span>
    </template>
    <component
      :is="appendIcon"
      v-if="!hasExpandableIcon && !icon && appendIcon"
      class="ui-btn--icon-append"
    />
  </NuxtLink>

  <button
    v-else
    :class="classes"
    :disabled
    :aria-label="aria"
    type="button"
    @click="unFocus"
  >
    <component
      :is="prependIcon"
      v-if="!hasExpandableIcon && !icon && prependIcon"
      class="ui-btn--icon-prepend"
    />
    <template v-if="hasExpandableIcon">
      <span class="ui-btn--expandable-wrapper">
        <component
          :is="icon"
          class="ui-btn--expandable-icon"
        />
        <span class="ui-btn--inside-text ui-btn--expandable-text">
          <template v-if="text">
            {{ text }}
          </template>
          <slot v-else />
        </span>
      </span>
    </template>
    <template v-else>
      <component
        :is="icon"
        v-if="icon"
        class="ui-btn--icon-only"
      />
      <span
        v-else
        class="ui-btn--inside-text"
      >
        <template v-if="text">
          {{ text }}
        </template>
        <slot v-else />
      </span>
    </template>
    <component
      :is="appendIcon"
      v-if="!hasExpandableIcon && !icon && appendIcon"
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
  size?: "sm" | "md" | "lg";

  /**
   * The text to display inside the button  
   * If an `icon` is provided, the text won't be rendered  
   * If you pass a children element to an `UiButton` with `text` set, only the text will be rendered
   */
  text?: string;

  /**
   * The link to navigate to when the button is clicked  
   * Uses `NuxtLink` under the hood for prefetching
   */
  link?: string;

  /**
   * The color of the button
   */
  color?: keyof typeof colorVars;

  /**
   * The hover color of the button  
   * If not provided, defaults to the same as `color`
   */
  hoverColor?: keyof typeof colorVars;

  /**
   * The variant of the button  
   * - `elevated` : Fully color the button, with a nice box shadow  
   * - `outlined` : Adds a colored inner border with no background  
   * - `tonal` : Tints the background with the provided color  
   * - `flat` : Transparent background with no shadow  
  * - `frosted` : Glassy frosted background with blur
   * @default "elevated"
   */
  variant?: "elevated" | "outlined" | "tonal" | "flat" | "frosted";

  /**
   * Makes the button into a Floating Action Button  
   * If enabled, will stick it to a corner of the screen  
   * When no value is provided, it defaults to `bottom right`
   */
  fab?: boolean | "bottom right" | "bottom left" | "top right" | "top left";

  /**
   * Transforms the button into a circular shape with the icon displayed in the middle  
   * No text can be rendered this way
   */
  icon?: Component;

  /**
   * Inserts an icon at before the text
   */
  prependIcon?: Component;

  /**
   * Inserts an icon at after the text
   */
  appendIcon?: Component;

  /**
   * Disables any interaction with the button
   */
  disabled?: boolean;

  /**
   * Aria label for accessibility
   */
  aria?: string;

  /**
   * Turns the button into an expandable icon button. Requires an `icon`  
   * The button displays only the icon until hover/focus reveals the text on the right
   */
  expandable?: boolean;

  /**
   * If the button is in an expanded state (for expandable buttons)
   */
  expanded?: boolean;
}>()

function fabClassBuilder(fab: boolean | string): string {
  if (typeof fab === "boolean") {
    return fab
      ? "ui-btn--fab ui-btn--fab--bottom-right"
      : ""
  } else {
    return `ui-btn--fab ui-btn--fab--${fab.replace(" ", "-")}`
  }
}

const hasExpandableIcon = computed(() => Boolean(props.expandable && props.icon))
const isExpanded = computed(() => Boolean(hasExpandableIcon.value && props.expanded))

const classes = computed(() => [
  "ui-btn",
  `ui-btn--${props.size ?? "md"}`,
  `ui-btn--${props.variant ?? "elevated"}`,
  props.color
    ? `ui-btn--${props.color}`
    : "",
  props.hoverColor
  && props.hoverColor !== props.color
  && (
    props.variant === "tonal"
    || props.variant === "flat"
    || props.variant === "frosted"
  )
    ? `ui-btn--hover--${props.hoverColor}`
    : "",
  hasExpandableIcon.value
    ? "ui-btn--expandable"
    : "",
  isExpanded.value
    ? "ui-btn--expandable--expanded"
    : "",
  props.icon && !hasExpandableIcon.value
    ? "ui-btn--icon-only"
    : "",
  props.prependIcon && !hasExpandableIcon.value
    ? "ui-btn--icon-prepend"
    : "",
  props.appendIcon && !hasExpandableIcon.value
    ? "ui-btn--icon-append"
    : "",
  props.fab
    ? fabClassBuilder(props.fab)
    : "",
  props.disabled
    ? "ui-btn--disabled"
    : "",
])

const isLocal = computed(() => props.link !== undefined && props.link.startsWith("/"))
const isDocs = computed(() => props.link !== undefined && props.link.startsWith("/docs/"))

const linkTarget = computed(() => ((isLocal.value && !isDocs.value)
  ? "_self"
  : "_blank"))
const linkExternal = computed(() => !isLocal.value || isDocs.value)

function unFocus() {
  const activeElement = document.activeElement as HTMLElement | null

  if (activeElement) {
    activeElement.blur()
  }
}
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
  transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;

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
      background-color: var(--primary);
    }

    &.ui-btn--secondary {
      color: var(--dark-mode-bg);
      background-color: var(--secondary);
    }

    &.ui-btn--accent {
      color: var(--dark-mode-bg);
      background-color: var(--accent);
    }

    &.ui-btn--error {
      color: var(--dark-mode-bg);
      background-color: var(--error);
    }

    &.ui-btn--info {
      color: var(--dark-mode-bg);
      background-color: var(--info);
    }

    &.ui-btn--success {
      color: var(--dark-mode-bg);
      background-color: var(--success);
    }

    &.ui-btn--warning {
      color: var(--dark-mode-bg);
      background-color: var(--warning);
    }

    &.ui-btn--text {
      color: var(--dark-mode-bg);
      background-color: var(--text);
    }
  }

  &--outlined {
    background-color: transparent;
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

    &:hover,
    &:focus-within {
      color: var(--surface);
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

  &--frosted {
    background: var(--glass-bg);
    backdrop-filter: var(--backdrop-filter);
    border: var(--glass-border);
    box-shadow: var(--glass-shadow);
    color: var(--text);

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

    & .ui-btn--inside-text {
      background-color: transparent;
    }
  }

  &--hover {
    &--primary:hover,
    &--primary:focus-within {
      color: var(--primary);
    }

    &--secondary:hover,
    &--secondary:focus-within {
      color: var(--secondary);
    }

    &--accent:hover,
    &--accent:focus-within {
      color: var(--accent);
    }

    &--error:hover,
    &--error:focus-within {
      color: var(--error);
    }

    &--info:hover,
    &--info:focus-within {
      color: var(--info);
    }

    &--success:hover,
    &--success:focus-within {
      color: var(--success);
    }

    &--warning:hover,
    &--warning:focus-within {
      color: var(--warning);
    }

    &--text:hover,
    &--text:focus-within {
      color: var(--text);
    }
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

  &--expandable {
    border-radius: 50%;
    padding: 0.2em 0;
    height: 2em;
    font-size: 1.5em;
    min-width: 2em;
    overflow: hidden;
    gap: 0;
    justify-content: center;

    .ui-btn--expandable-wrapper {
      display: inline-flex;
      align-items: center;
      height: 100%;
      padding-inline: calc(var(--ui-btn-height) / 6);
      transition: padding-inline 0.25s, color 0.25s ease-in-out;
    }

    .ui-btn--expandable-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
    }

    .ui-btn--expandable-text {
      flex: 0 1 auto;
      font-size: medium;
      overflow: hidden;
      max-width: 0;
      opacity: 0;
      margin-left: 0;
      transition: max-width 0.3s ease, opacity 0.2s ease, margin-left 0.2s ease-in-out;
      white-space: nowrap;
    }

    &:hover,
    &:focus-within,
    &.ui-btn--expandable--expanded {
      border-radius: 999px;

      .ui-btn--expandable-text {
        max-width: 16rem;
        opacity: 1;
        margin-left: calc(var(--ui-btn-height) / 6);
      }

      .ui-btn--expandable-wrapper {
        padding-inline: calc(var(--ui-btn-height) / 4);
      }
    }
  }
}

.light-mode .ui-btn:not(.ui-btn--frosted):not(.ui-btn--flat) {
  color: var(--dark-mode-text);
}
</style>
