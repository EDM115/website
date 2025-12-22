<template>
  <UiContainer>
    <h1>{{ t("blog.telegram.title") }}</h1><br>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <HomeBlogList :is-telegram="true" />
  </UiContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

useHead({
  title: t("blog.telegram.head"),
  meta: [
    {
      name: "description", content: t("blog.telegram.description"),
    },
  ],
})

useSeoMeta({
  ogTitle: t("blog.telegram.head"),
  ogDescription: t("blog.telegram.description"),
})

defineOgImageComponent("OgImage", {
  title: t("blog.telegram.head"),
  description: t("blog.telegram.description"),
  path: route.path,
})
</script>
