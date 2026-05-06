<template>
  <UiContainer>
    <h1>{{ t("blog.title") }}</h1><br>

    <UiButton
      link="/blog/telegram"
      :text="t('blog.telegram_button')"
      :prepend-icon="simpleTelegram"
      hover-color="primary"
      style="margin-bottom: 1em;"
      variant="frosted"
    />

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <HomeBlogList :is-telegram="false" />

    <UiDivider style="margin-top: 48px; margin-bottom: 16px;" />

    <UiIcon
      :icon="materialSymbolsRssFeedRounded"
      size="2em"
    />

    {{ t("blog.rss") }} :

    <UiButton
      expandable
      :expanded="isMobile"
      :icon="materialSymbolsCodeXmlRounded"
      text="RSS 2.0"
      link="/feeds/blog.xml"
      hover-color="primary"
      aria="RSS feed (XML)"
      style="margin-left: 0.5em;"
      variant="frosted"
    />
    <UiButton
      expandable
      :expanded="isMobile"
      :icon="clarityAtomSolid"
      text="Atom 1.0"
      link="/feeds/blog.atom"
      hover-color="primary"
      aria="RSS feed (Atom)"
      style="margin-left: 0.5em;"
      variant="frosted"
    />
    <UiButton
      expandable
      :expanded="isMobile"
      :icon="simpleJson"
      text="JSON Feed 1.0"
      link="/feeds/blog.json"
      hover-color="primary"
      aria="RSS feed (JSON)"
      style="margin-left: 0.5em;"
      variant="frosted"
    />
  </UiContainer>
</template>

<script setup lang="ts">
import clarityAtomSolid from "~icons/clarity/atom-solid"
import materialSymbolsCodeXmlRounded from "~icons/material-symbols/code-xml-rounded"
import materialSymbolsRssFeedRounded from "~icons/material-symbols/rss-feed-rounded"
import simpleJson from "~icons/simple-icons/json"
import simpleTelegram from "~icons/simple-icons/telegram"

const route = useRoute()
const { isMobile } = useDevice()
const { t } = useI18n()

useHead({
  title: t("blog.head"),
  meta: [
    {
      name: "description", content: t("blog.description"),
    },
  ],
})

useSeoMeta({
  ogTitle: t("blog.head"),
  ogDescription: t("blog.description"),
})

defineOgImage("SystemOgImageTakumi", {
  title: t("blog.head"),
  description: t("blog.description"),
  path: route.path,
})
</script>
