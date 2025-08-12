<template>
  <div
    class="ui-progress-circular"
    :style="sizeStyle"
  >
    <svg viewBox="0 0 36 36">
      <circle
        class="bg"
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke-width="4"
      />
      <circle
        class="fg"
        cx="18"
        cy="18"
        r="15"
        fill="none"
        stroke-width="4"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue?: number; indeterminate?: boolean; size?: number; width?: number; color?: string }>()

const size = computed(() => props.size ?? 40)

const circumference = 2 * Math.PI * 15

const dashOffset = computed(() => {
  if (props.indeterminate) {
    return circumference * 0.3
  }
  const val = Math.max(0, Math.min(100, props.modelValue ?? 0))

  return circumference * (1 - (val / 100))
})

const sizeStyle = computed(() => ({ width: `${size.value}px`, height: `${size.value}px` }))
</script>

<style scoped>
.ui-progress-circular {
  position: relative;
  display: inline-block;
}

svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.bg {
  stroke: color-mix(in srgb, var(--text) 20%, transparent);
}

.fg {
  stroke: var(--primary);
  transition: stroke-dashoffset .3s ease;
}

.content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
