<template>
  <div
    class="ui-menu"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <div class="ui-menu__activator">
      <slot
        name="activator"
        :props="{ onClick: () => (open = !open) }"
      />
    </div>
    <div
      v-show="open"
      class="ui-menu__content"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>

<style scoped>
.ui-menu {
  position: relative;
  display: inline-block;
}

.ui-menu__content {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: var(--surface);
  color: var(--text);
  border-radius: .5rem;
  box-shadow: var(--shadow-md);
  padding: .25rem;
}
</style>
