<template>
  <HomeProjectPage name="EDM115/palex" />
</template>

<i18n>
{
  "en": {
    "head": "EDM115 - Project EDM115/palex"
  },
  "fr": {
    "head": "EDM115 - Projet EDM115/palex"
  }
}
</i18n>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

import { computed, onMounted } from "vue"

definePageMeta({
  layout: "project",
})

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

useHead({
  title: t("head"),
  meta: [
    {
      name: "og:title",
      content: t("head"),
    },
  ],
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
