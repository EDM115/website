<template>
  <UiContainer>
    <h1>{{ t("blog.telegram.title") }}</h1><br>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <HomeBlogList :is-telegram="true" />
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t("blog.telegram.head"),
  meta: [
    {
      name: "og:title",
      content: t("blog.telegram.head"),
    },
  ],
})
</script>
