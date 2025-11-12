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
      <UiTextField
        class="search-text-field"
        type="search"
        :model-value
        :placeholder
        @update:model-value="handleInput"
      />
    </div>

    <UiButton
      v-if="hasClearButton"
      color="error"
      class="search-btn search-btn--clear"
      :prepend-icon="mdiCloseCircleOutline"
      :text="clearText"
      @click="$emit('clear')"
    />
    <UiTooltip
      :activate-on-click="true"
      location="bottom"
      :text="helpText"
    >
      <template #activator="{ props }">
        <UiButton
          v-if="showHelp"
          v-bind="props"
          color="secondary"
          class="search-btn search-btn--help"
          :icon="mdiHelpCircleOutline"
        />
      </template>
    </UiTooltip>
  </div>
</template>

<script setup lang="ts">
import mdiCloseCircleOutline from "~icons/mdi/closeCircleOutline"
import mdiHelpCircleOutline from "~icons/mdi/helpCircleOutline"
import mdiMagnify from "~icons/mdi/magnify"

interface Props {
  modelValue: string;
  placeholder?: string;
  hasFilters?: boolean;
  isSticky?: boolean;
  hasClearButton?: boolean;
  clearText?: string;
  showHelp?: boolean;
  helpText?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "",
  clearText: "",
  helpText: "",
})

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "clear": [];
}>()

function handleInput(value: string) {
  emit("update:modelValue", value)
}
</script>

<style scoped lang="scss">
.ui-search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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

  :deep(.search-text-field) {
    width: 100%;
  }

  :deep(.search-text-field .text-field-input) {
    padding: 0.75rem 1rem 0.75rem 3rem;
  }
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

.search-btn {
  transition: opacity 0.2s, transform 0.2s;
  border: 1px solid color-mix(in srgb, var(--text) 20%, transparent);

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &--clear {
    margin-left: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    height: auto;

    :deep(.ui-btn--inside-text) {
      font-weight: 600;
    }
  }
}
</style>
