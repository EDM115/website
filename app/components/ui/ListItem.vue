<template>
  <li
    class="ui-list-item"
    :class="{ 'is-active': active }"
    @click="$emit('click')"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
defineProps<{ active?: boolean }>()

defineEmits<{ (e: "click"): void }>()
</script>

<style scoped>
.ui-list-item {
  padding: .5rem .75rem;
  border-radius: .375rem;
  cursor: pointer;
}

.ui-list-item:hover {
  background: color-mix(in srgb, var(--text) 10%, transparent);
}

.ui-list-item.is-active {
  background: color-mix(in srgb, var(--primary) 30%, transparent);
  color: var(--text);
}
</style>
