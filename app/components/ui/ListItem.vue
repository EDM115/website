<template>
  <li :class="`ui-list-item ${active ? 'is-active' : ''}`">
    <slot />
  </li>
</template>

<script setup lang="ts">
defineProps<{

  /**
   * Marks the list item as active (highlighted)
  */
  active?: boolean
}>()
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
}
</style>
