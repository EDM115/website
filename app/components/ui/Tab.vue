<template>
  <slot />
</template>

<script setup lang="ts">
defineProps<{

  /**
   * Label shown on the tab header button
   */
  text: string;

  /**
   * Unique value identifying the tab
   */
  value: string | number;
}>()
</script>
