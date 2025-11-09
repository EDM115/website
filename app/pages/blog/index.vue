<template>
  <UiContainer>
    <h1>{{ t("blog.title") }}</h1><br>

    <UiButton
      link="/blog/telegram"
      :text="t('blog.telegram_button')"
      :prepend-icon="icBaselineTelegram"
      hover-color="primary"
      style="margin-bottom: 1em;"
      variant="frosted"
    />

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <HomeBlogList :is-telegram="false" />
  </UiContainer>
</template>

<script setup lang="ts">
import icBaselineTelegram from "~icons/ic/baseline-telegram"

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
