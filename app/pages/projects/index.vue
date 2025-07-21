<template>
  <v-container>
    <h1>{{ t("projects.title") }}</h1>

    <NuxtLink
      class="ma-2"
      to="/projects/unzip-bot"
    >
      <v-btn
        color="primary"
        text="EDM115/unzip-bot"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/monorepo-hash"
    >
      <v-btn
        color="primary"
        text="EDM115/monorepo-hash"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/better-maps"
    >
      <v-btn
        color="primary"
        text="EDM115/better-maps"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/unrar-alpine"
    >
      <v-btn
        color="primary"
        text="EDM115/unrar-alpine"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/website"
    >
      <v-btn
        color="primary"
        text="EDM115/website"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/edm115-ohmyposh-theme"
    >
      <v-btn
        color="primary"
        text="EDM115/EDM115-ohmyposh-theme"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/palex"
    >
      <v-btn
        color="primary"
        text="EDM115/palex"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/js-imports-sort"
    >
      <v-btn
        color="primary"
        text="EDM115/js-imports-sort"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/markdown-syntax-fr"
    >
      <v-btn
        color="primary"
        text="EDM115/Markdown_Syntax_FR"
      />
    </NuxtLink>
    <NuxtLink
      class="ma-2"
      to="/projects/the-very-restrictive-license"
    >
      <v-btn
        color="primary"
        text="EDM115/The-Very-Restrictive-License"
      />
    </NuxtLink>
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
