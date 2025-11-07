<template>
  <div class="ui-text-field">
    <label
      v-if="label"
      :for="id"
      class="text-field-label"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="text-field-input"
      @input="handleInput"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  modelValue: "",
  placeholder: "",
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
  "focus": [event: FocusEvent]
  "blur": [event: FocusEvent]
}>()

const id = computed(() => `text-field-${Math.random().toString(36).slice(2, 9)}`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:modelValue", target.value)
}
</script>

<style scoped lang="scss">
.ui-text-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.text-field-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
}

.text-field-input {
  padding: 0.75rem 1rem;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-muted);
  }
}
</style>
