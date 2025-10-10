<template>
  <div class="ui-tabs-window">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * Value of the active tab to show
   */
  modelValue: string | number;
}>()

provide("uiTabsModel", toRef(props, "modelValue"))
</script>
