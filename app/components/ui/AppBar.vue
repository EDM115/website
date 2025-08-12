<template>
  <header
    class="ui-app-bar"
    :class="$attrs.class"
  >
    <div class="ui-app-bar__prepend">
      <slot name="prepend" />
    </div>
    <div class="ui-app-bar__title">
      <slot />
    </div>
    <div class="ui-app-bar__append">
      <slot name="append" />
    </div>
  </header>
</template>

<style scoped>
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
}

.ui-app-bar__prepend,
.ui-app-bar__append {
  display: flex;
  gap: .5rem;
  align-items: center;
}

.ui-app-bar__title {
  font-weight: 700;
}
</style>
