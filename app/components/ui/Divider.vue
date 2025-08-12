<template>
  <hr
    class="ui-divider"
    v-bind="$attrs"
  >
</template>

<style scoped>
.ui-divider {
  border: none;
  border-top: 1px solid color-mix(in srgb, var(--text) 20%, transparent);
  margin: 0.5rem 0;
}
</style>
