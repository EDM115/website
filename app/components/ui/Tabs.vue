<template>
  <div
    class="ui-tabs"
    :style="styleVars"
  >
    <div
      :class="['ui-tabs--headers', `ui-tabs--headers--align-${alignTabs ?? 'center'}`]"
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
import { colorVars } from "./colors"

const props = defineProps<{

  /**
   * Current active tab value
   */
  modelValue: string | number;

  /**
   * Optional color for the active tab
   */
  color?: keyof typeof colorVars;

  /**
   * Alignment for the tab headers
   */
  alignTabs?: "left" | "center" | "right";
}>()

const emit = defineEmits<(e: "update:modelValue", value: string | number) => void>()

const styleVars = computed(() => ({
  "--ui-tabs-accent": `var(--${props.color})`,
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

    &--align-center {
      justify-content: center;
    }

    &--align-right {
      justify-content: flex-end;
    }
  }

  &--body {
    margin-top: 1rem;
  }
}
</style>
