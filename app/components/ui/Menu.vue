<template>
  <div
    class="ui-menu"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <div class="ui-menu--activator">
      <slot
        name="activator"
        :props="{ onClick: () => (clickToClose ? open = !open : open = true) }"
      />
    </div>
    <div
      v-show="open"
      class="ui-menu--content"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)

defineProps<{
  clickToClose?: boolean
}>()
</script>

<style scoped>
.ui-menu {
  position: relative;
  display: inline-block;

  &--content {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    background: var(--surface);
    color: var(--text);
    border-radius: .5rem;
    box-shadow: var(--shadow-md);
    padding: .25rem;
  }
}
</style>
