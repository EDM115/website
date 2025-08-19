<template>
  <UiContainer>
    <h1>{{ t("projects.title") }}</h1>

    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/unzip-bot"
      text="EDM115/unzip-bot"
      aria="EDM115/unzip-bot"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/monorepo-hash"
      text="EDM115/monorepo-hash"
      aria="EDM115/monorepo-hash"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/better-maps"
      text="EDM115/better-maps"
      aria="EDM115/better-maps"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/unrar-alpine"
      text="EDM115/unrar-alpine"
      aria="EDM115/unrar-alpine"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/website"
      text="EDM115/website"
      aria="EDM115/website"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/edm115-ohmyposh-theme"
      text="EDM115/EDM115-ohmyposh-theme"
      aria="EDM115/EDM115-ohmyposh-theme"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/palex"
      text="EDM115/palex"
      aria="EDM115/palex"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/js-imports-sort"
      text="EDM115/js-imports-sort"
      aria="EDM115/js-imports-sort"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/markdown-syntax-fr"
      text="EDM115/Markdown_Syntax_FR"
      aria="EDM115/Markdown_Syntax_FR"
    />
    <UiButton
      class="ma-2"
      color="primary"
      link="/projects/the-very-restrictive-license"
      text="EDM115/The-Very-Restrictive-License"
      aria="EDM115/The-Very-Restrictive-License"
    />
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t("projects.head"),
  meta: [
    {
      name: "og:title",
      content: t("projects.head"),
    },
  ],
})
</script>

<style lang="scss" scoped>
.ma-2 {
  margin: 8px;
}
</style>
