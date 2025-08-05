<template>
  <v-container>
    <h1>{{ t("projects.title") }}</h1>

    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/unzip-bot"
      text="EDM115/unzip-bot"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/monorepo-hash"
      text="EDM115/monorepo-hash"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/better-maps"
      text="EDM115/better-maps"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/unrar-alpine"
      text="EDM115/unrar-alpine"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/website"
      text="EDM115/website"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/edm115-ohmyposh-theme"
      text="EDM115/EDM115-ohmyposh-theme"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/palex"
      text="EDM115/palex"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/js-imports-sort"
      text="EDM115/js-imports-sort"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/markdown-syntax-fr"
      text="EDM115/Markdown_Syntax_FR"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/the-very-restrictive-license"
      text="EDM115/The-Very-Restrictive-License"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const { locale, t } = useI18n()
const store = useMainStore()

const userLocale = computed(() => store.getI18n)

useHead({
  title: t("projects.head"),
  meta: [
    {
      name: "og:title",
      content: t("projects.head"),
    },
  ],
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
