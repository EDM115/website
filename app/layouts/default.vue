<template>
  <div>
    <div class="app-bg" />
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <div :class="route.path.split('/').length < 3 ? 'centered-stack-home' : 'centered-stack-blog'">
        <slot />
      </div>
    </main>
    <BackToTop />
    <CookieConsent />
  </div>
</template>

<script lang="ts" setup>
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"

const i18nHead = useLocaleHead()
const route = useRoute()
const {
  t,
  setLocale,
} = useI18n()

useHead({
  title: t("main.head"),
  meta: [
    { name: "darkreader-lock" },
    {
      name: "description", content: t("main.description"),
    },
  ],
  link: [
    {
      "rel": "icon", "type": "image/webp", "href": "/img/profile-img.webp",
    },
  ],
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang ?? "en" },
})

useSeoMeta({
  title: t("main.head"),
  ogTitle: t("main.head"),
  description: t("main.description"),
  ogDescription: t("main.description"),
  ogImage: "/img/profile-img.webp",
  ogType: "website",
  ogUrl: "https://edm115.dev",
  ogLocale: "en_US",
})

useCopySlug()
useCopyCode()

onMounted(() => {
  setLocale(localStorage.getItem("i18n") as "en" | "fr" | null ?? "en")
  polyfillCountryFlagEmojis(
    "Twemoji Country Flags",
    "/docs/TwemojiCountryFlags.woff2",
  )
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  filter: blur(0.5rem);
  opacity: 0;
  transform: translateY(-20px);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  filter: blur(0.5rem);
  opacity: 50;
}
</style>
