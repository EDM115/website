<template>
  <v-app
    :theme="isDark ? 'dark' : 'light'"
    class="pa-4"
  >
    <NuxtRouteAnnouncer />
    <NavBar />
    <v-main style="--v-layout-top: 64px;">
      <v-container class="d-flex flex-column align-center">
        <v-btn
          color="primary"
          class="mb-4"
          :prepend-icon="mdiArrowLeft"
          :text="t('projects.back')"
          @click="$router.push('/projects')"
        />
        <slot />
      </v-container>
    </v-main>
    <BackToTop />
    <CookieConsent />
  </v-app>
</template>

<script setup lang="ts">
import mdiArrowLeft from "~icons/mdi/arrowLeft"

import { useCopyCode } from "~/composables/useCopyCode"
import { useCopySlug } from "~/composables/useCopySlug"
import { useCustomTheme } from "~/composables/useCustomTheme"
import { useSwitchTheme } from "~/composables/useSwitchTheme"
import { useMainStore } from "~/stores/main"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"

const i18nHead = useLocaleHead()
const { t, setLocale } = useI18n()
const store = useMainStore()
const { isDark } = useCustomTheme()

useCopySlug()
useCopyCode()

useHead({
  title: t("projects.head"),
  meta: [
    { name: "darkreader-lock" },
    { name: "description", content: t("projects.description") },
  ],
  link: [{ rel: "icon", type: "image/webp", href: "/img/profile-img.webp" }],
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang ?? "en",
  },
})

useSeoMeta({
  title: t("projects.head"),
  ogTitle: t("projects.head"),
  description: t("projects.description"),
  ogDescription: t("projects.description"),
  ogImage: "/img/profile-img.webp",
  ogType: "website",
  ogUrl: "https://edm115.dev",
  ogLocale: "en_US",
})

polyfillCountryFlagEmojis()

onMounted(() => {
  store.initStore()
  setLocale(store.getI18n)
  useSwitchTheme()
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

.go-to-top {
  transition: all 0.5s ease-in-out;
}
</style>
