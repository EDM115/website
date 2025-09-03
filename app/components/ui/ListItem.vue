<template>
  <li :class="`ui-list-item ${active ? 'is-active' : ''}`">
    <div class="ui-list-item--title">
      <slot name="title" />
    </div>
    <div class="ui-list-item--subtitle">
      <slot name="subtitle" />
    </div>
    <slot />
  </li>
</template>

<script setup lang="ts">
/* eslint-disable @stylistic/object-curly-newline */
defineProps<{
  /**
   * Marks the list item as active (highlighted)
   */
  active?: boolean;
}>()
/* eslint-enable @stylistic/object-curly-newline */
</script>

<style scoped lang="scss">
.ui-list-item {
  padding: .5rem .75rem;
  border-radius: .375rem;
  cursor: pointer;

  &:hover {
    background: color-mix(in srgb, var(--text) 10%, transparent);
  }

  &.is-active {
    background: color-mix(in srgb, var(--primary) 30%, transparent);
    color: var(--text);
  }

  &--title {
    font-weight: 600;
  }

  &--subtitle {
    opacity: .8;
    font-size: .9rem;
  }
}
</style>
