<template>
  <hr
    v-if="vertical"
    class="ui-divider--vertical"
  >
  <hr
    v-else
    class="ui-divider"
  >
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Makes the divider vertical
   */
  vertical?: boolean;
}>()
</script>

<style scoped lang="scss">
.ui-divider {
  border: none;
  border-top: 1px solid color-mix(in srgb, var(--text) 20%, transparent);
  margin: 0.5rem 0;

  &--vertical {
    border-top: none;
    border-left: 1px solid color-mix(in srgb, var(--text) 20%, transparent);
    height: 1.5rem;
    margin: 0 0.25rem;
  }
}
</style>
