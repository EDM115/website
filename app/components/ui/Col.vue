<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Number of columns (1-12) the col spans on xs screens
   */
  cols?: number | string

  /**
   * Number of columns (1-12) on md (>= 960px) screens
   */
  md?: number | string

  /**
   * Number of columns (1-12) on lg (>= 1280px) screens
   */
  lg?: number | string

  /**
   * Cross-axis alignment for content
   */
  align?: "start" | "center" | "end"
}>()

function toSpan(n?: number | string) {
  if (!n && n !== 0) {
    return "12"
  }

  return String(n)
}

const classes = computed(() => [
  "ui-col",
  `ui-col-${toSpan(props.cols)}`,
  props.md ? `ui-col-md-${toSpan(props.md)}` : "",
  props.lg ? `ui-col-lg-${toSpan(props.lg)}` : "",
  props.align ? `align-${props.align}` : "",
])
</script>

<style scoped lang="scss">
.ui-col {
  flex: 0 0 auto;
  width: 100%;
}

/* 12-grid */
[class^='ui-col-'] {
  box-sizing: border-box;
}

.ui-col-12 { width: 100%; }
.ui-col-11 { width: 91.6667%; }
.ui-col-10 { width: 83.3333%; }
.ui-col-9 { width: 75%; }
.ui-col-8 { width: 66.6667%; }
.ui-col-7 { width: 58.3333%; }
.ui-col-6 { width: 50%; }
.ui-col-5 { width: 41.6667%; }
.ui-col-4 { width: 33.3333%; }
.ui-col-3 { width: 25%; }
.ui-col-2 { width: 16.6667%; }
.ui-col-1 { width: 8.3333%; }

@media (min-width: 960px) {
  .ui-col-md-12 { width: 100%; }
  .ui-col-md-6 { width: 50%; }
  .ui-col-md-4 { width: 33.3333%; }
}

@media (min-width: 1280px) {
  .ui-col-lg-12 { width: 100%; }
  .ui-col-lg-6 { width: 50%; }
  .ui-col-lg-4 { width: 33.3333%; }
}
</style>
