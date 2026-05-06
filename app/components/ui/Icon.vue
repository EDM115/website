<template>
  <component
    :is="icon"
    v-if="icon"
    class="ui-icon"
  />
</template>

<script setup lang="ts">
import type { Component } from "vue"

const props = defineProps<{
  /**
   * The icon component to render
   */
  icon?: Component;

  /**
   * The size of the icon, ex "1em", "24px", "1.5rem", ... Defaults to "1em"
   */
  size?: string;
}>()

const computedSize = computed(() => props.size || "1em")
</script>

<style scoped lang="scss">
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: v-bind(computedSize);
  height: v-bind(computedSize);
  line-height: 1;
  vertical-align: middle;
}

.ui-icon :where(svg) {
  width: v-bind(computedSize);
  height: v-bind(computedSize);
  display: block;
}
</style>
