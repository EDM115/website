<template>
  <div
    class="ui-button-group"
    role="group"
    :aria-label="aria"
    :style="groupStyle"
  >
    <span
      v-if="hasOptions"
      class="ui-button-group--pill"
      aria-hidden="true"
    />
    <button
      v-for="option in options"
      :key="option.value"
      :aria-label="option.aria ?? option.label"
      :aria-pressed="option.value === modelValue ? 'true' : 'false'"
      :class="[
        'ui-button-group--btn',
        option.value === modelValue && 'ui-button-group--btn--active',
      ]"
      type="button"
      @click="selectOption(option.value)"
    >
      <component
        :is="option.icon"
        v-if="option.icon"
        class="ui-button-group--icon"
        aria-hidden="true"
      />
      <span
        v-else-if="option.label"
        class="ui-button-group--label"
      >
        {{ option.label }}
      </span>
      <slot
        v-else
        name="option"
        :option="option"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
type UiButtonGroupValue = string | number

export interface UiButtonGroupOption {
  label?: string;
  value: UiButtonGroupValue;
  icon?: Component;
  aria?: string;
}

const props = defineProps<{
  options: readonly UiButtonGroupOption[];
  modelValue: UiButtonGroupValue;
  aria?: string;
}>()

const {
  options,
  modelValue,
  aria,
} = toRefs(props)

const emit = defineEmits<{
  (e: "update:modelValue", value: UiButtonGroupValue): void;
  (e: "change", value: UiButtonGroupValue): void;
}>()

const optionCount = computed(() => options.value.length)
const hasOptions = computed(() => optionCount.value > 0)
const activeIndex = computed(() => {
  const index = options.value.findIndex((option) => option.value === modelValue.value)

  return index >= 0
    ? index
    : 0
})

const groupStyle = computed<Record<string, string>>(() => {
  const count = optionCount.value || 1

  return {
    "--option-count": `${count}`,
    "--selected-index": `${activeIndex.value}`,
    "--option-size": `${1 / count}`,
    "gridTemplateColumns": `repeat(${count}, minmax(0, 1fr))`,
  }
})

function selectOption(value: UiButtonGroupValue) {
  if (value === modelValue.value) {
    return
  }

  emit("update:modelValue", value)
  emit("change", value)
}
</script>

<style scoped lang="scss">
.ui-button-group {
  --group-padding: 0.25rem;
  position: relative;
  display: grid;
  gap: 0.25rem;
  padding: var(--group-padding);
  border-radius: 999px;
  border: var(--glass-border);
  background: var(--glass-bg);
  box-shadow: var(--glass-shadow);
  backdrop-filter: var(--backdrop-filter);
  isolation: isolate;

  &--pill {
    position: absolute;
    top: var(--group-padding);
    bottom: var(--group-padding);
    left: var(--group-padding);
    width: calc((100% - (var(--group-padding) * 2)) * var(--option-size));
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary) 20%, transparent);
    transition: transform 0.25s ease, background 0.2s ease;
    transform: translateX(calc(var(--selected-index) * 100%));
    z-index: 0;
  }

  &--btn {
    position: relative;
    z-index: 1;
    border: none;
    background: transparent;
    color: var(--text);
    font: inherit;
    padding: 0.5rem 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    border-radius: 999px;
    cursor: pointer;
    transition: color 0.2s ease;

    &--active {
      color: var(--primary);
      font-weight: 600;
    }
  }

  &--icon {
    font-size: 1.15rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &--label {
    font-size: 1rem;
    line-height: 1;
  }
}
</style>
