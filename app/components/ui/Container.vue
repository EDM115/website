<template>
  <div class="ui-container">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.ui-container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 0.5rem;
  max-width: 1200px;
}

@media (max-width: 720px) {
  .ui-container {
    width: 95svw;
    padding-inline: 0.25rem;
  }
}

@media (min-width: 1280px) {
  .ui-container {
    max-width: 1280px;
    padding-inline: 0.75rem;
  }
}

@media (min-width: 1920px) {
  .ui-container {
    max-width: 1600px;
    padding-inline: 1rem;
  }
}
</style>
