<template>
  <header
    class="ui-app-bar"
    :class="$attrs.class"
  >
    <div class="ui-app-bar--prepend">
      <slot name="prepend" />
    </div>
    <div class="ui-app-bar--title">
      <slot />
    </div>
    <div class="ui-app-bar--append">
      <slot name="append" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.ui-app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface);
  color: var(--text);
  padding: 0.5rem 1rem;
  box-shadow: var(--shadow-md);

  &.navbar-glass {
    background: rgb(from var(--surface) r g b / 40%);
    backdrop-filter: var(--backdrop-filter);
    -webkit-backdrop-filter: var(--backdrop-filter);
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    box-shadow: var(--glass-shadow);
  }

  &--prepend,
  &--append {
    display: flex;
    gap: .5rem;
    align-items: center;
  }

  &--title {
    font-weight: 700;
    font-size: 1.125rem;
  }
}
</style>
