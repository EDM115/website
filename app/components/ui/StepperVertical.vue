<template>
  <div class="ui-stepper">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ui-stepper {
  display: grid;
  gap: .5rem;
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
}
</style>
