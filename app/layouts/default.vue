<template>
  <v-app
    :theme="isDark ? 'dark' : 'light'"
    class="pa-4"
  >
    <NuxtRouteAnnouncer />
    <NavBar />
    <v-main>
      <slot />
    </v-main>
    <v-fab
      v-show="showGoToTop"
      app
      appear
      color="primary"
      class="go-to-top"
      :icon="mdiArrowUp"
      location="bottom right"
      :variant="isDarkTheme ? 'tonal' : 'elevated'"
      @click="scrollToTop"
    />
  </v-app>
</template>

<script lang="ts" setup>
import mdiArrowUp from "~icons/mdi/arrowUp"

import { useCustomTheme } from "~/composables/useCustomTheme"
import { useMainStore } from "~/stores/main"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
import { onMounted } from "vue"

const i18nHead = useLocaleHead()
const { t, setLocale } = useI18n()
const store = useMainStore()
const vuetifyTheme = useTheme()
const { isDark } = useCustomTheme()

const theme = ref(store.getTheme)
const isDarkTheme = computed(() => theme.value === "dark")
const showGoToTop = ref(false)

useHead({
  title: t("main.head"),
  meta: [
    { charset: "UTF-8" },
    { name: "darkreader-lock" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: t("main.description") },
  ],
  link: [{ rel: "icon", type: "image/webp", href: "/img/profile-img.webp" }],
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
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

polyfillCountryFlagEmojis()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const handleScroll = () => {
  showGoToTop.value = window.scrollY > 100
}

onMounted(() => {
  store.initStore()
  store.setTheme(store.getTheme)
  store.setI18n(store.getI18n)
  vuetifyTheme.change(store.getTheme)
  setLocale(store.getI18n)
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
