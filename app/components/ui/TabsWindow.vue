<template>
  <div class="ui-tabs-window">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, toRef } from "vue"

const props = defineProps<{
  modelValue: string | number
}>()

provide("uiTabsModel", toRef(props, "modelValue"))
</script>
