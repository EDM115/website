<template>
  <li
    :class="[
      'ui-list-item',
      active && 'ui-list-item--active',
      noHover && 'ui-list-item--no-hover',
    ]"
  >
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
defineProps<{
  /**
   * Marks the list item as active (highlighted)
   */
  active?: boolean;

  /**
   * Disables hover effect
   */
  noHover?: boolean;
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

  &--active {
    background: color-mix(in srgb, var(--primary) 30%, transparent);
    color: var(--text);
  }

  &--no-hover {
    &:hover {
      background: none;
      cursor: default;
    }
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
