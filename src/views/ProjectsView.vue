<template>
  <v-container>
    <h1>{{ t("projects") }}</h1>

    <RouterLink
      class="ma-2"
      to="/projects/unzip-bot"
    >
      <v-btn
        color="primary"
        text="EDM115/unzip-bot"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/monorepo-hash"
    >
      <v-btn
        color="primary"
        text="EDM115/monorepo-hash"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/unrar-alpine"
    >
      <v-btn
        color="primary"
        text="EDM115/unrar-alpine"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/website"
    >
      <v-btn
        color="primary"
        text="EDM115/website"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/edm115-ohmyposh-theme"
    >
      <v-btn
        color="primary"
        text="EDM115/EDM115-ohmyposh-theme"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/palex"
    >
      <v-btn
        color="primary"
        text="EDM115/palex"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/js-imports-sort"
    >
      <v-btn
        color="primary"
        text="EDM115/js-imports-sort"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/markdown-syntax-fr"
    >
      <v-btn
        color="primary"
        text="EDM115/Markdown_Syntax_FR"
      />
    </RouterLink>
    <RouterLink
      class="ma-2"
      to="/projects/the-very-restrictive-license"
    >
      <v-btn
        color="primary"
        text="EDM115/The-Very-Restrictive-License"
      />
    </RouterLink>
  </v-container>
</template>

<i18n>
{
  "en": {
    "head": "Projects - EDM115",
    "projects": "My projects (TBD)"
  },
  "fr": {
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
