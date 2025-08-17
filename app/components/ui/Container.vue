<template>
  <div class="ui-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ui-container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 1200px;
}

@media (min-width: 1280px) {
  .ui-container {
    max-width: 1280px;
  }
}

@media (min-width: 1920px) {
  .ui-container {
    max-width: 1600px;
  }
}
</style>
