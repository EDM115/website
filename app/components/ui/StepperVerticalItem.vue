<template>
  <div
    class="ui-stepper-item"
    :class="colorClass"
  >
    <div class="ui-stepper-item__header">
      <UiIcon
        v-if="icon"
        :icon="icon"
      />
      <div class="ui-stepper-item__titles">
        <div class="ui-stepper-item__title">
          {{ title }}
        </div>
        <div class="ui-stepper-item__subtitle">
          {{ subtitle }}
        </div>
      </div>
    </div>
    <div class="ui-stepper-item__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue"

const props = defineProps<{ title: string; subtitle?: string; icon?: Component; editIcon?: Component; value?: string | number; color?: string; bgColor?: string }>()

const colorClass = computed(() => (props.color ? `bg-${props.color}` : ""))
</script>

<style scoped>
.ui-stepper-item {
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  border-radius: .5rem;
  padding: .75rem 1rem;
}

.ui-stepper-item__header {
  display: flex;
  gap: .5rem;
  align-items: center;
}

.ui-stepper-item__title {
  font-weight: 600;
}

.ui-stepper-item__subtitle {
  opacity: .8;
  font-size: .875rem;
}
</style>
