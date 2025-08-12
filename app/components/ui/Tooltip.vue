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
const props = defineProps<{ text: string; location?: "top" | "bottom" | "left" | "right" }>()
const open = ref(false)
const location = computed(() => props.location ?? "top")

function show() {
  open.value = true
}

function hide() {
  open.value = false
}
</script>

<style scoped>
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
}

.ui-tooltip--top {
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
}

.ui-tooltip--bottom {
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
}

.ui-tooltip--left {
  right: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%);
}

.ui-tooltip--right {
  left: calc(100% + 6px);
  top: 50%;
  transform: translateY(-50%);
}
</style>
