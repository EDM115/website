<template>
  <HomeProjectPage name="EDM115/website" />
</template>

<i18n>
{
  "en": {
    "head": "EDM115 - Project EDM115/website"
  },
  "fr": {
    "head": "EDM115 - Projet EDM115/website"
  }
}
</i18n>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

import { computed, onMounted } from "vue"

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

definePageMeta({
  layout: "project",
})

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
