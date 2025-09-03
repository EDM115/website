<template>
  <div class="ui-tabs">
    <div class="ui-tabs--headers">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="ui-tab"
        :class="{ active: modelValue === tab.value }"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.text }}
      </button>
    </div>
    <div class="ui-tabs__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue"

type Tab = {
  text: string;
  value: string | number;
}

type VNodeWithProps = VNode & { props?: Record<string, unknown> | null }

defineProps<{

  /**
   * Current active tab value
   */
  modelValue: string | number;

  /**
   * Optional color for active state styling
   */
  color?: string;
}>()

defineEmits<{ (e: "update:modelValue", v: string | number): void }>()

const slots = useSlots()

function getVNodeProps(v: VNode | unknown) {
  const node = v as VNodeWithProps

  return (node && typeof node === "object" && "props" in node)
    ? (node.props ?? null)
    : null
}

function isUiTab(v: VNode | unknown) {
  const asAny = v as unknown as { "type"?: { name?: string } }

  return asAny?.type?.name === "UiTab"
}

const tabs = (slots.default?.() || [])
  .filter((v: VNode | unknown) => isUiTab(v) || (getVNodeProps(v) && "text" in (getVNodeProps(v) as Record<string, unknown>)))
  .map((v: VNode | unknown) => {
    const p = getVNodeProps(v) as Record<string, unknown> | null

    return {
      text: (p?.text as string) || "",
      value: (p?.value as string | number),
    }
  }) as Tab[]
</script>

<style scoped lang="scss">
.ui-tabs {
  &--headers {
    display: flex;
    gap: .25rem;
    justify-content: center;
  }
}

.ui-tab {
  padding: .5rem 1rem;
  border-radius: .5rem;
  background: transparent;
  color: var(--text);
  cursor: pointer;

  &.active {
    background: color-mix(in srgb, var(--primary) 25%, transparent);
  }
}
</style>
