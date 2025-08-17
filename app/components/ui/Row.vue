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

  &.align-start {
    align-items: flex-start;
  }

  &.align-center {
    align-items: center;
  }

  &.align-end {
    align-items: flex-end;
  }

  &.align-stretch {
    align-items: stretch;
  }

  &.justify-start {
    justify-content: flex-start;
  }

  &.justify-center {
    justify-content: center;
  }

  &.justify-end {
    justify-content: flex-end;
  }

  &.justify-space-between {
    justify-content: space-between;
  }

  &.justify-space-around {
    justify-content: space-around;
  }

  &.justify-space-evenly {
    justify-content: space-evenly;
  }

  &.align-content-start {
    align-content: flex-start;
  }

  &.align-content-center {
    align-content: center;
  }

  &.align-content-end {
    align-content: flex-end;
  }

  &.align-content-stretch {
    align-content: stretch;
  }
}
</style>
