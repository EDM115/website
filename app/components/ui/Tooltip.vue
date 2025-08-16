<template>
  <span class="ui-tooltip-wrapper">
    <slot
      name="activator"
      :props="{ onMouseenter: show, onMouseleave: hide }"
    />
    <span
      v-show="open"
      class="ui-tooltip"
      :class="`ui-tooltip--${location}`"
    >{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Tooltip text to display
   */
  text: string

  /**
   * Preferred location around the activator
   */
  location?: "top" | "bottom" | "left" | "right"
}>()

const open = ref(false)
const location = computed(() => props.location ?? "top")

function show() {
  open.value = true
}

function hide() {
  open.value = false
}
</script>

<style scoped lang="scss">
.ui-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.ui-tooltip {
  position: absolute;
  background: var(--surface);
  color: var(--text);
  padding: .25rem .5rem;
  border-radius: .25rem;
  white-space: nowrap;
  box-shadow: var(--shadow-md);
  font-size: .875rem;

  &--top {
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
  }

  &--bottom {
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
  }

  &--left {
    right: calc(100% + 6px);
    top: 50%;
    transform: translateY(-50%);
  }

  &--right {
    left: calc(100% + 6px);
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
