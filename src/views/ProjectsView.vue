<template>
  <v-container>
    <h1>{{ t("projects") }}</h1>
  </v-container>
</template>

<i18n>
{
  "en": {
    "debugColors": "Debug colors",
    "head": "Projects - EDM115",
    "projects": "My projects (TBD)"
  },
  "fr": {
    "debugColors": "Couleurs de débogage",
    "head": "Projets - EDM115",
    "projects": "Mes projets (pas terminé)"
  }
}
</i18n>

<script setup lang="ts">
import { useMainStore } from "@/stores/main"

import { useHead } from "@unhead/vue"
import { computed, onMounted } from "vue"
import { useI18n } from "vue-i18n"

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

useHead({
  title: t("head"),
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
