<template>
  <header
    :class="[
      'ui-app-bar',
      invisible && 'ui-app-bar--invisible',
      hitThrough && 'ui-app-bar--hit-through',
    ]"
  >
    <div class="ui-app-bar--prepend">
      <slot name="prepend" />
    </div>
    <div class="ui-app-bar--title">
      <slot />
    </div>
    <div class="ui-app-bar--append">
      <slot name="append" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  /**
   * Whether the background gets transparent
   */
  invisible?: boolean;

  /**
   * Allow clicks to pass through the bar except on its controls
   */
  hitThrough?: boolean;
}>()
</script>

<style scoped lang="scss">
.ui-app-bar {
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  color: var(--text);
  padding: 1rem;
  box-shadow: var(--shadow-md);

  &.navbar-glass {
    background: rgb(from var(--surface) r g b / 40%);
    backdrop-filter: var(--backdrop-filter);
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    box-shadow: var(--glass-shadow);
  }

  &--invisible {
    background: transparent;
    box-shadow: none !important;

    &.navbar-glass {
      background: transparent !important;
      backdrop-filter: none;
      border-bottom: none;
      box-shadow: none;
    }
  }

  &--prepend,
  &--append {
    display: flex;
    gap: .5rem;
    align-items: center;
  }

  &--title {
    font-weight: 700;
    font-size: 1.25rem;
  }

  &--hit-through {
    pointer-events: none;

    .ui-app-bar--prepend,
    .ui-app-bar--append {
      pointer-events: auto;
    }

    .ui-app-bar--title {
      pointer-events: none;
    }
  }
}
</style>
