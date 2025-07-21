<template>
  <HomeProjectPage name="EDM115/unrar-alpine" />
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

import { computed, onMounted } from "vue"

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale } = useI18n()

definePageMeta({
  layout: "project",
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
