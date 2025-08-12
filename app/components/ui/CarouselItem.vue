<template>
  <div class="ui-carousel-item">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ src?: string }>()
</script>

<style scoped>
.ui-carousel-item {
  display: grid;
  place-items: center;
  min-height: 280px;
  background-size: cover;
  background-position: center;
}
</style>
