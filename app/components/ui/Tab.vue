<template>
  <UiButton
    :class="['ui-tab', { 'ui-tab--active': isActive }]"
    :text
    @click="handleClick"
  />
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Label shown on the tab header button
   */
  text: string;

  /**
   * Unique value identifying the tab
   */
  value: string | number;

  /**
   * Currently active tab value
   */
  currentValue?: string | number | null;
}>()

const emit = defineEmits<(e: "select", value: string | number) => void>()

const isActive = computed(() => props.currentValue === props.value)

function handleClick() {
  emit("select", props.value)
}
</script>

<style scoped lang="scss">
.ui-tab {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  font: inherit;
  transition: background-color 150ms ease, color 150ms ease;

  &:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--ui-tabs-accent, var(--primary)) 40%, transparent);
    outline-offset: 2px;
  }

  &--active {
    background: color-mix(in srgb, var(--ui-tabs-accent, var(--primary)) 25%, transparent);
  }

  & > :deep(.ui-btn--inside-text) {
    background-color: transparent;
  }
}
</style>
