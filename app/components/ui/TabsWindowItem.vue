<template>
  <div
    v-show="current === value"
    class="ui-tabs-window-item"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue"

const props = defineProps<{

  /**
   * The value associated with this window
   */
  value: string | number

  /**
   * Optional external modelValue, injected from parent if not provided
   */
  modelValue?: string | number
}>()

const injected = inject<Readonly<{ value: string | number }> | undefined>("uiTabsModel", undefined) as unknown as { value?: string | number } | undefined

const current = computed(() => (props.modelValue ?? injected?.value) as string | number)
</script>
