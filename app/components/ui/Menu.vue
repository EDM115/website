<template>
  <div
    class="ui-menu"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <div class="ui-menu--activator">
      <slot
        name="activator"
        :props="{ onClick: () => (clickToClose ? open = !open : open = true) }"
      />
    </div>
    <div
      v-show="open"
      :class="['ui-menu--content', frosted && 'ui-menu--content--frosted']"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)

defineProps<{
  /**
   * Use this to avoid closing the menu when clicking on the activator
   */
  clickToClose?: boolean;

  /**
   * Apply a frosted glass effect to the menu background
   */
  frosted?: boolean;
}>()
</script>

<style scoped lang="scss">
.ui-menu {
  position: relative;
  display: inline-block;

  &--content {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    background: var(--surface);
    color: var(--text);
    border-radius: .5rem;
    box-shadow: var(--shadow-md);
    padding: .25rem;

    &--frosted {
      background: var(--glass-bg);
      backdrop-filter: var(--backdrop-filter);
      border: var(--glass-border);
      box-shadow: var(--glass-shadow);
      color: var(--text);
    }
  }
}
</style>
