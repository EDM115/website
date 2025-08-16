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

  /**
   * Align items on the cross axis
   */
  align?: "start" | "center" | "end" | "stretch"

  /**
   * Justify content on the main axis
   */
  justify?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly"

  /**
   * Align multi-line content on the cross axis
   */
  alignContent?: "start" | "center" | "end" | "stretch"
}>()

const classes = computed(() => [
  props.align ? `align-${props.align}` : "",
  props.justify ? `justify-${props.justify.replace(" ", "-")}` : "",
  props.alignContent ? `align-content-${props.alignContent}` : "",
])
</script>

<style scoped lang="scss">
.ui-row {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;

  > * {
    padding: 0.5rem;
  }
}
</style>
