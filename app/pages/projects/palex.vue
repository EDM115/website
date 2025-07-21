<template>
  <HomeProjectPage name="EDM115/palex" />
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

import { computed, onMounted } from "vue"

definePageMeta({
  layout: "project",
})

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale } = useI18n()

onMounted(() => {
  locale.value = userLocale.value
})
</script>
