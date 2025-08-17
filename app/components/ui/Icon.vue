<template>
  <component
    :is="icon"
    v-if="icon"
    class="ui-icon"
  />
</template>

<script setup lang="ts">
import type { Component } from "vue"

defineProps<{

  /**
   * The icon component to render
   */
  icon?: Component
}>()
</script>

<style scoped lang="scss">
.ui-icon {
  display: inline-flex;
  vertical-align: middle;
}
</style>
