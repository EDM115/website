<template>
  <div
    class="ui-stepper-item"
    :class="[{ 'is-open': isOpen, 'is-clickable': true }]"
    :style="rootStyle"
  >
    <div
      aria-hidden="true"
      class="ui-stepper-item--marker"
    >
      <div class="ui-stepper-item--marker-icon">
        <UiIcon
          v-if="icon"
          :icon="icon"
        />
        <div
          v-else
          class="ui-stepper-item--dot"
        />
      </div>
    </div>

    <button
      class="ui-stepper-item--header"
      type="button"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="`panel-${uid}`"
      @click="toggle"
    >
      <div class="ui-stepper-item--titles">
        <div class="ui-stepper-item--title">
          {{ title }}
        </div>
        <div
          v-if="subtitle"
          class="ui-stepper-item--subtitle"
        >
          {{ subtitle }}
        </div>
      </div>
      <UiIcon
        class="ui-stepper-item--chevron"
        :icon="isOpen ? mdiChevronUp : mdiChevronDown"
      />
    </button>
    <transition name="roll">
      <div
        v-if="isOpen"
        :id="`panel-${uid}`"
        class="ui-stepper-item--body"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue"

import mdiChevronDown from "~icons/mdi/chevronDown"
import mdiChevronUp from "~icons/mdi/chevronUp"

const props = defineProps<{

  /**
   * Primary heading for the step item
   */
  title: string;

  /**
   * Secondary descriptive text under the title
   */
  subtitle?: string;

  /**
   * Optional icon shown in the step marker
   */
  icon?: Component;

  /**
   * Foreground color applied to the item content and borders
   */
  color?: string;

  /**
   * Background color applied behind the item and marker
   */
  bgColor?: string;
}>()

const isOpen = ref(false)
const uid = useId()

// Apply theming so icon marker is encompassed by item color/bg
const rootStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.bgColor) {
    style.backgroundColor = props.bgColor
    style["--ui-item-bg"] = props.bgColor
  }

  if (props.color) {
    style.color = props.color
    style["--ui-item-border"] = props.color
  }

  return style
})

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped lang="scss">
.ui-stepper-item {
  position: relative;
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  border-radius: .5rem;
  padding: .5rem .75rem .75rem .75rem;
  transition: background-color .2s ease, box-shadow .2s ease;

  &.is-clickable:hover {
    background: color-mix(in srgb, var(--surface) 88%, transparent);
  }

  &.is-open {
    background: color-mix(in srgb, var(--surface) 92%, transparent);
  }

  &--marker {
    position: absolute;
    left: calc(-.5 * var(--ui-stepper-axis) - 1rem);
    width: 2rem;
    top: .5rem;
    display: grid;
    place-items: center;
    pointer-events: none;
  }

  &--marker-icon {
    background-color: var(--ui-item-bg, var(--surface));
    border-radius: 999px;
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    z-index: 2;
    position: relative;
  }

  &--dot {
    width: .5rem;
    height: .5rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--gone) 72%, transparent);
  }

  &--header {
    display: flex;
    gap: .5rem;
    align-items: center;
    width: 100%;
    text-align: left;
    background: transparent;
    border: 0;
    padding: .5rem .25rem;
    margin: 0;
    cursor: pointer;
    border-radius: .375rem;
    overflow-wrap: anywhere;

    &:focus-visible {
      outline: 2px solid color-mix(in srgb, var(--primary) 60%, var(--gone));
      outline-offset: 2px;
    }
  }

  &--title {
    font-weight: 600;
  }

  &--subtitle {
    opacity: .8;
    font-size: .875rem;
  }

  &--chevron {
    margin-left: auto;
    opacity: .8;
  }

  &--body {
    padding: 0 .5rem 0 .25rem;
    overflow: hidden;
  }
}

.roll-enter-from,
.roll-leave-to {
  max-height: 0;
  transform: translateY(-4px);
  opacity: 0;
}

.roll-enter-active,
.roll-leave-active {
  transition: max-height .25s ease, opacity .2s ease, transform .2s ease;
}

.roll-enter-to,
.roll-leave-from {
  max-height: 500px;
  transform: translateY(0);
  opacity: 1;
}
</style>
