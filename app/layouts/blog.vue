<template>
  <div>
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <div class="d-flex flex-column align-center">
        <UiButton
          color="primary"
          class="mb-4"
          :prepend-icon="mdiArrowLeft"
          :text="t('blog.back')"
          @click="$router.push('/blog')"
        />
        <slot />
      </div>
    </main>
    <BackToTop />
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import mdiArrowLeft from "~icons/mdi/arrowLeft"
import { useCopyCode } from "~/composables/useCopyCode"
import { useCopySlug } from "~/composables/useCopySlug"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"

const i18nHead = useLocaleHead()
const { t, setLocale } = useI18n()

useHead({
  title: t("blog.head"),
  meta: [
    { name: "darkreader-lock" },
    { name: "description", content: t("blog.description") },
  ],
  link: [{ rel: "icon", type: "image/webp", href: "/img/profile-img.webp" }],
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang ?? "en",
  },
})

useSeoMeta({
  title: t("blog.head"),
  ogTitle: t("blog.head"),
  description: t("blog.description"),
  ogDescription: t("blog.description"),
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
