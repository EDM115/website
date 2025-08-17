<template>
  <UiContainer>
    <h1>{{ t("blog.title") }}</h1><br>

    <h3>{{ t("blog.subtitle") }}</h3>

    <UiDivider style="margin-top: 16px; margin-bottom: 16px;" />

    <UiButton
      class="ma-2"
      color="primary"
      link="/blog/2025/05/30/how-i-migrated-to-zod-4"
      text="How I migrated to Zod 4"
    />

    <UiButton
      class="ma-2"
      color="primary"
      link="/blog/2025/01/22/how-to-send-dtmf-on-android"
      text="How to send DTMF on Android"
    />

    <UiButton
      class="ma-2"
      color="primary"
      link="/blog/2024/08/20/education-to-pro"
      text="Education to Pro"
    />

    <UiButton
      class="ma-2"
      color="primary"
      link="/blog/2022/05/15/google-ending-shared-drives"
      text="Google ending Shared Drives"
    />
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t("blog.head"),
  meta: [
    {
      name: "og:title",
      content: t("blog.head"),
    },
  ],
})
</script>

<style lang="scss" scoped>
.ma-2 {
  margin: 8px;
}
</style>
