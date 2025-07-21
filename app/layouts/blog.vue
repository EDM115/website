<template>
  <v-app
    :theme="isDark ? 'dark' : 'light'"
    class="pa-4"
  >
    <NuxtRouteAnnouncer />
    <NavBar />
    <v-main>
      <v-container class="d-flex flex-column align-center">
        <v-btn
          color="primary"
          class="mb-4"
          :prepend-icon="mdiArrowLeft"
          :text="t('blog.back')"
          @click="$router.push('/blog')"
        />
        <slot />
      </v-container>
    </v-main>
    <v-fab
      v-show="showGoToTop"
      app
      appear
      color="primary"
      class="go-to-top"
      :icon="mdiArrowUp"
      location="bottom right"
      :variant="isDark ? 'tonal' : 'elevated'"
      @click="scrollToTop"
    />
  </v-app>
</template>

<script setup lang="ts">
import mdiArrowLeft from "~icons/mdi/arrowLeft"
import mdiArrowUp from "~icons/mdi/arrowUp"

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

const showGoToTop = ref(false)

useHead({
  title: t("blog.head"),
  meta: [
    { charset: "UTF-8" },
    { name: "darkreader-lock" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: t("blog.description") },
  ],
  link: [{ rel: "icon", type: "image/webp", href: "/img/profile-img.webp" }],
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
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

polyfillCountryFlagEmojis()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const handleScroll = () => {
  showGoToTop.value = window.scrollY > 100
}

onMounted(() => {
  store.initStore()
  setLocale(store.getI18n)
  useSwitchTheme()
  window.addEventListener("scroll", handleScroll)
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
