<template>
  <div
    :class="[
      'ui-search-bar',
      hasFilters && 'ui-search-bar--has-filters',
      isSticky && 'ui-search-bar--is-sticky',
    ]"
  >
    <div class="search-input-wrapper">
      <UiIcon
        class="search-icon"
        :icon="mdiMagnify"
      />
      <input
        :value="modelValue"
        type="text"
        :placeholder
        class="search-input"
        @input="handleInput"
      >
    </div>

    <div
      v-if="showDateFilters"
      class="date-filters"
    >
      <UiTextField
        v-if="before !== undefined"
        :model-value="before"
        type="date"
        label="Before"
        @update:model-value="$emit('update:before', $event)"
      />
      <UiTextField
        v-if="after !== undefined"
        :model-value="after"
        type="date"
        label="After"
        @update:model-value="$emit('update:after', $event)"
      />
      <UiTextField
        v-if="at !== undefined"
        :model-value="at"
        type="date"
        label="At"
        @update:model-value="$emit('update:at', $event)"
      />
    </div>

    <button
      v-if="hasClearButton"
      class="clear-btn"
      @click="$emit('clear')"
    >
      <UiIcon :icon="mdiCloseCircleOutline" />
      {{ clearText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import mdiCloseCircleOutline from "~icons/mdi/closeCircleOutline"
import mdiMagnify from "~icons/mdi/magnify"

interface Props {
  modelValue: string;
  placeholder?: string;
  hasFilters?: boolean;
  isSticky?: boolean;
  hasClearButton?: boolean;
  clearText?: string;
  before?: string;
  after?: string;
  at?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Search...",
  hasFilters: false,
  isSticky: false,
  hasClearButton: false,
  clearText: "Clear filters",
  before: undefined,
  after: undefined,
  at: undefined,
})

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:before": [value: string];
  "update:after": [value: string];
  "update:at": [value: string];
  "clear": [];
}>()

const showDateFilters = computed(() => {
  return props.before !== undefined || props.after !== undefined || props.at !== undefined
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  emit("update:modelValue", target.value)
}
</script>

<style scoped lang="scss">
.ui-search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;

  &--has-filters {
    background: var(--glass-bg);
    border: var(--glass-border);
    box-shadow: var(--glass-shadow);
    backdrop-filter: var(--backdrop-filter);
  }

  &--is-sticky {
    position: sticky;
    top: 1rem;
    z-index: 100;
  }
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid color-mix(in srgb, var(--text) 20%, transparent);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--bg);
  color: var(--text);
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
  }

  &::placeholder {
    color: var(--text-muted);
  }
}

.date-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--error);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
