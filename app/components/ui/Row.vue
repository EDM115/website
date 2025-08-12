<template>
  <div
    class="ui-row"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"
  alignContent?: "start" | "center" | "end" | "stretch"
}>()

const classes = computed(() => [
  props.align ? `align-${props.align}` : "",
  props.justify ? `justify-${props.justify.replace(" ", "-")}` : "",
  props.alignContent ? `align-content-${props.alignContent}` : "",
])
</script>

<style scoped>
.ui-row {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
}

.ui-row > * {
  padding: 0.5rem;
}
</style>
