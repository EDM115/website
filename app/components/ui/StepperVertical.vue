<template>
  <div
    class="ui-stepper"
    :class="maxItems ? 'ui-stepper--scrollable' : undefined"
    :style="rootStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  /**
   * Maximum number of visible items before the list scrolls.  
   * Note : mainly tailored for desktop, not really accurate too.
   */
  maxItems?: number;
}>()

const rootStyle = computed(function () {
  if (!props.maxItems) {
    return undefined
  }

  return {
    "--ui-stepper-max-items": `${props.maxItems}`,
  } as Record<string, string>
})
</script>

<style scoped lang="scss">
.ui-stepper {
  display: grid;
  --ui-stepper-gap: .5rem;
  gap: var(--ui-stepper-gap);
  --ui-stepper-axis: 2.25rem;
  --ui-stepper-thread-x: calc(var(--ui-stepper-axis) / 2);
  position: relative;
  padding-left: var(--ui-stepper-axis);

  &::before {
    content: "";
    position: absolute;
    left: var(--ui-stepper-thread-x);
    top: 1.5rem;
    bottom: 0;
    width: 2px;
    background: var(--surface);
  }

  &--scrollable {
    --ui-stepper-item-size: 5rem;
    max-height: calc(
      (var(--ui-stepper-item-size) * var(--ui-stepper-max-items))
      + (var(--ui-stepper-gap) * (var(--ui-stepper-max-items) - 1))
    );
    overflow-y: auto;
    padding-right: .25rem;
    scrollbar-gutter: stable;
  }
}
</style>
