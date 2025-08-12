<template>
  <div
    class="ui-carousel"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="ui-carousel__viewport">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ interval?: number; cycle?: boolean; showArrows?: "always" | "hover" | "never" }>()

const hovered = ref(false)
</script>

<style scoped>
.ui-carousel__viewport {
  display: grid;
}
</style>
