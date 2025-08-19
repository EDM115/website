<template>
  <ul :class="classes">
    <slot />
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Disables the minimum width
  */
  compact?: boolean
}>()

const classes = computed(() => [
  "ui-list",
  props.compact ? "ui-list--compact" : "",
])
</script>

<style scoped lang="scss">
.ui-list {
  list-style: none;
  margin: 0;
  padding: .25rem;
  min-width: 160px;

  &--compact {
    min-width: 0px;
  }
}
</style>
