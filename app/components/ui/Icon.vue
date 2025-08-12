<template>
  <component
    :is="icon"
    v-if="icon"
    class="ui-icon"
    v-bind="$attrs"
  />
</template>
<script setup lang="ts">
import type { Component } from "vue"
const props = defineProps<{ icon?: Component }>()
</script>
<style scoped>
.ui-icon { display: inline-flex; vertical-align: middle; }
</style>
