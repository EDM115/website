<template>
  <label
    class="ui-checkbox"
    :class="[
      toggle ? 'ui-checkbox--toggle' : 'ui-checkbox--default',
      color ? `ui-checkbox--${color}` : '',
      disabled ? 'ui-checkbox--disabled' : '',
    ]"
  >
    <input
      :id="id"
      ref="inputEl"
      v-model="model"
      class="ui-checkbox--input"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :aria-label="aria"
      @focus="onFocus"
      @blur="onBlur"
    >

    <span
      v-if="!toggle"
      class="ui-checkbox--box"
    />
    <span
      v-else
      class="ui-checkbox--switch"
    >
      <span class="ui-checkbox--thumb" />
    </span>

    <span class="ui-checkbox--label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { colorVars } from "./colors"

const props = defineProps<{

  /**
   * The checked state of the checkbox (v-model)
   */
  modelValue?: boolean;

  /**
   * Optional color theme for the control
   */
  color?: keyof typeof colorVars;

  /**
   * Render as a toggle (switch) instead of a square checkbox
   */
  toggle?: boolean;

  /**
   * When true, shows an indeterminate state (only for the default checkbox)
   */
  indeterminate?: boolean;

  /**
   * Disable interaction
   */
  disabled?: boolean;

  /**
   * Optional label text when no default slot is provided
   */
  label?: string;

  /**
   * Checkbox ID
   */
  id?: string;

  /**
   * Checkbox name
   */
  name?: string;

  /**
   * Checkbox value
   */
  value?: string;

  /**
   * Aria label when no visible label is present
   */
  aria?: string;
}>()

const emit = defineEmits<{
  (e: "update:modelValue" | "change", value: boolean): void;
  (e: "focus" | "blur"): void;
}>()

const inputEl = useTemplateRef("inputEl")

const model = computed<boolean>({
  "get": () => props.modelValue ?? false,
  "set": (val) => {
    if (props.disabled) {
      return
    }

    emit("update:modelValue", val)
    emit("change", val)
  },
})

function syncIndeterminate() {
  if (inputEl.value) {
    inputEl.value.indeterminate = Boolean(props.indeterminate) && !model.value
  }
}

onMounted(syncIndeterminate)
watch(() => props.indeterminate, syncIndeterminate)
watch(model, syncIndeterminate)

function onFocus() {
  emit("focus")
}

function onBlur() {
  emit("blur")
}

const rid = useId()

const color = computed(() => props.color)
const disabled = computed(() => props.disabled)
const toggle = computed(() => props.toggle)
const id = computed(() => props.id)
const name = computed(() => props.name ?? `checkbox-${rid}`)
const value = computed(() => props.value)
const aria = computed(() => props.aria)
const label = computed(() => props.label)
</script>

<style scoped lang="scss">
.ui-checkbox {
  --ui-checkbox-color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--label {
    line-height: 1.2;
  }

  &.ui-checkbox--primary { --ui-checkbox-color: var(--primary); }
  &.ui-checkbox--secondary { --ui-checkbox-color: var(--secondary); }
  &.ui-checkbox--accent { --ui-checkbox-color: var(--accent); }
  &.ui-checkbox--error { --ui-checkbox-color: var(--error); }
  &.ui-checkbox--info { --ui-checkbox-color: var(--info); }
  &.ui-checkbox--success { --ui-checkbox-color: var(--success); }
  &.ui-checkbox--warning { --ui-checkbox-color: var(--warning); }
  &.ui-checkbox--text { --ui-checkbox-color: var(--text); }
  &.ui-checkbox--bg { --ui-checkbox-color: var(--bg); }
  &.ui-checkbox--surface { --ui-checkbox-color: var(--surface); }
  &.ui-checkbox--gone { --ui-checkbox-color: var(--gone); }
}

.ui-checkbox--input {
  /* Hide visually but keep focus and accessibility */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* Default square checkbox */
.ui-checkbox--default .ui-checkbox--box {
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--text) 70%, transparent);
  background: var(--surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease;
  position: relative;
}

/* Checkmark */
.ui-checkbox--default .ui-checkbox--box::after {
  content: "";
  position: absolute;
  width: 0.35rem;
  height: 0.7rem;
  border: solid var(--surface);
  border-width: 0 0.18rem 0.18rem 0;
  transform: rotate(45deg) scale(0);
  transform-origin: center;
  transition: transform .15s ease-in-out;
}

/* Indeterminate bar */
.ui-checkbox--default .ui-checkbox--box::before {
  content: "";
  position: absolute;
  width: 0.7rem;
  height: 0.18rem;
  border-radius: 2px;
  background: var(--surface);
  transform: scaleX(0);
  transition: transform .15s ease-in-out;
}

/* Focus ring for default */
.ui-checkbox--default .ui-checkbox--input:focus-visible + .ui-checkbox--box {
  box-shadow:
    0 0 0 2px color-mix(in srgb, var(--ui-checkbox-color) 60%, transparent),
    inset 0 0 0 2px color-mix(in srgb, var(--text) 70%, transparent);
}

/* Checked state coloring */
.ui-checkbox--default .ui-checkbox--input:checked + .ui-checkbox--box {
  background: var(--ui-checkbox-color);
  box-shadow: inset 0 0 0 2px var(--ui-checkbox-color);
}

.ui-checkbox--default .ui-checkbox--input:checked + .ui-checkbox--box::after {
  transform: rotate(45deg) scale(1);
}

/* Indeterminate visual */
.ui-checkbox--default .ui-checkbox--input:indeterminate + .ui-checkbox--box {
  background: var(--ui-checkbox-color);
  box-shadow: inset 0 0 0 2px var(--ui-checkbox-color);
}

.ui-checkbox--default .ui-checkbox--input:indeterminate + .ui-checkbox--box::before {
  transform: scaleX(1);
}

/* Toggle (switch) */
.ui-checkbox--toggle .ui-checkbox--switch {
  position: relative;
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--text) 30%, transparent);
  transition: background .2s ease;
}

.ui-checkbox--toggle .ui-checkbox--thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(1.25rem - 4px);
  height: calc(1.25rem - 4px);
  border-radius: 50%;
  background: var(--surface);
  box-shadow: var(--shadow-md);
  transition: transform .2s ease;
}

/* Focus ring for toggle */
.ui-checkbox--toggle .ui-checkbox--input:focus-visible + .ui-checkbox--switch {
  outline: 2px solid color-mix(in srgb, var(--ui-checkbox-color) 60%, transparent);
  outline-offset: 2px;
}

.ui-checkbox--toggle .ui-checkbox--input:checked + .ui-checkbox--switch {
  background: color-mix(in srgb, var(--ui-checkbox-color) 70%, transparent);
}

.ui-checkbox--toggle .ui-checkbox--input:checked + .ui-checkbox--switch .ui-checkbox--thumb {
  transform: translateX(1rem);
}
</style>
