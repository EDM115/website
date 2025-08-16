<template>
  <slot />
</template>

<script setup lang="ts">
defineProps<{
  text: string
  value: string | number
}>()
</script>
