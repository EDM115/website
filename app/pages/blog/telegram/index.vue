<template>
  <UiContainer>
    <h1>{{ t("blog.telegram.title") }}</h1><br>

    <UiButton
      expandable
      :expanded="isMobile"
      hover-color="primary"
      :icon="simpleTelegram"
      :text="t('blog.telegram.link')"
      variant="frosted"
      link="https://t.me/EDM115bots"
      aria="EDM115's Telegram channel"
      style="margin-bottom: 16px;"
    />

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <HomeBlogList :is-telegram="true" />

    <UiDivider style="margin-top: 32px; margin-bottom: 16px;" />

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
      link="/feeds/telegram.xml"
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
      link="/feeds/telegram.atom"
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
      link="/feeds/telegram.json"
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

defineOgImage("SystemOgImageTakumi", {
  title: t("blog.telegram.head"),
  description: t("blog.telegram.description"),
  path: route.path,
})
</script>
