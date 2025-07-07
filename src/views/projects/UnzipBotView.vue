<template>
  <ProjectPage
    name="EDM115/unzip-bot"
    branch="v7-rework-part-1"
  />
</template>

<i18n>
{
  "en": {
    "head": "EDM115 - Project EDM115/unzip-bot"
  },
  "fr": {
    "head": "EDM115 - Projet EDM115/unzip-bot"
  }
}
</i18n>

<script setup lang="ts">
import ProjectPage from "@/components/home/ProjectPage.vue"
import { useMainStore } from "@/stores/main"

import { useHead } from "@unhead/vue"
import { computed, onMounted } from "vue"
import { useI18n } from "vue-i18n"

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
