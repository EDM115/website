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
  icon?: Component;
}>()
</script>

<style scoped lang="scss">
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  line-height: 1;
  vertical-align: middle;
}

.ui-icon :where(svg) {
  width: 1em;
  height: 1em;
  display: block;
}
</style>
