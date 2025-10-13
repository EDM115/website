<template>
  <div
    v-show="isActive"
    class="ui-tab-panel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * The value associated with this panel
   */
  value: string | number;

  /**
   * Currently active tab value
   */
  currentValue?: string | number | null;
}>()

const isActive = computed(() => props.currentValue === props.value)
</script>

<style scoped lang="scss">
.ui-tab-panel {
  width: 100%;
}
</style>
