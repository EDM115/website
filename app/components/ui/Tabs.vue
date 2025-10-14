<template>
  <div
    class="ui-tabs"
    :style="styleVars"
  >
    <div
      class="ui-tabs--headers"
      :class="alignClass"
    >
      <slot
        name="tabs"
        :current="modelValue"
        :select="selectTab"
      />
    </div>

    <div class="ui-tabs--body">
      <slot
        name="panels"
        :current="modelValue"
      >
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{

  /**
   * Current active tab value
   */
  modelValue: string | number;

  /**
   * Optional color for the active tab
   */
  color?: string;

  /**
   * Alignment for the tab headers
   */
  alignTabs?: "left" | "center" | "right";
}>()

const emit = defineEmits<(e: "update:modelValue", value: string | number)=> void>()

const alignClass = computed(() => {
  switch (props.alignTabs) {
    case "left":
      return "align-left"
    case "right":
      return "align-right"
    default:
      return "align-center"
  }
})

const accent = computed(() => {
  if (!props.color) {
    return "var(--primary)"
  }

  if (props.color.startsWith("var(")) {
    return props.color
  }

  if (props.color.startsWith("--")) {
    return `var(${props.color})`
  }

  if (props.color.startsWith("#") || props.color.startsWith("rgb") || props.color.startsWith("hsl")) {
    return props.color
  }

  return `var(--${props.color})`
})

const styleVars = computed(() => ({
  "--ui-tabs-accent": accent.value,
}))

function selectTab(value: string | number) {
  if (value !== props.modelValue) {
    emit("update:modelValue", value)
  }
}
</script>

<style scoped lang="scss">
.ui-tabs {
  display: flex;
  flex-direction: column;

  &--headers {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content: flex-start;

    &.align-center {
      justify-content: center;
    }

    &.align-right {
      justify-content: flex-end;
    }
  }

  &--body {
    margin-top: 1rem;
  }
}
</style>
