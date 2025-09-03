<template>
  <div class="ui-tabs-window">
    <slot />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @stylistic/object-curly-newline */
const props = defineProps<{
  /**
   * Value of the active tab to show
   */
  modelValue: string | number;
}>()
/* eslint-enable @stylistic/object-curly-newline */

provide("uiTabsModel", toRef(props, "modelValue"))
</script>
