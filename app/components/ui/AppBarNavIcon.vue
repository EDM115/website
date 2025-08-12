<template>
  <UiButton
    :icon="icon"
    variant="flat"
  />
</template>

<script setup lang="ts">
import type { Component } from "vue"

defineProps<{ icon: Component }>()
</script>
