<template>
  <UiAppBar
    class="rounded-b-lg"
    invisible
    hit-through
  >
    <template #prepend>
      <UiButton
        v-if="route.path !== '/'"
        :icon="mdiHomeOutline"
        hover-color="primary"
        variant="frosted"
        link="/"
        aria="Home"
      />
      <UiButton
        v-if="route.path !== '/'"
        :icon="mdiArrowLeft"
        hover-color="primary"
        variant="frosted"
        :link="goBack()"
        aria="Back"
      />
      <UiDivider
        v-if="route.path !== '/'"
        vertical
      />
      <UiButton
        expandable
        :expanded="route.path === '/' && !isMobile"
        :color="route.path.startsWith('/projects') ? 'primary' : undefined"
        hover-color="primary"
        :icon="mdiCodeBlockTags"
        :text="t('home.projects')"
        variant="frosted"
        link="/projects"
        aria="Projects"
      />
      <UiButton
        expandable
        :expanded="route.path === '/' && !isMobile"
        :color="route.path.startsWith('/blog') ? 'primary' : undefined"
        hover-color="primary"
        :icon="mdiTextBoxEditOutline"
        :text="t('home.blog')"
        variant="frosted"
        link="/blog"
        aria="Blog"
      />
      <UiButton
        expandable
        :expanded="route.path === '/' && !isMobile"
        :color="route.path.startsWith('/unzip') ? 'primary' : undefined"
        hover-color="primary"
        :icon="flowbiteFileZipOutline"
        :text="t('home.unzip')"
        variant="frosted"
        link="/unzip"
        aria="unzip-bot"
      />
    </template>

    <template #append>
      <UiMenu frosted>
        <template #activator="{ props }">
          <UiButton
            v-bind="props"
            :icon="mdiLanguage"
            color="text"
            hover-color="primary"
            variant="frosted"
            aria="Language switcher"
          />
        </template>
        <UiList compact>
          <UiListItem
            v-for="l in availableLocales"
            :key="l"
            :active="l === locale"
            @click="switchLocale(l)"
          >
            {{ getFlagEmoji(l) }}
          </UiListItem>
        </UiList>
      </UiMenu>
      <UiButton
        :icon="iconTheme"
        color="text"
        hover-color="primary"
        variant="frosted"
        aria="Theme switcher"
        @click="switchTheme"
      />
    </template>
  </UiAppBar>
</template>

<script setup lang="ts">
import flowbiteFileZipOutline from "~icons/flowbite/fileZipOutline"
import mdiArrowLeft from "~icons/mdi/arrowLeft"
import mdiCodeBlockTags from "~icons/mdi/codeBlockTags"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiTextBoxEditOutline from "~icons/mdi/textBoxEditOutline"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"

import { useCustomTheme } from "~/composables/useCustomTheme"

const {
  locale,
  t,
} = useI18n()
const {
  isDark,
  toggleTheme,
} = useCustomTheme()
const { isMobile } = useDevice()
const route = useRoute()

const availableLocales = [ "en", "fr" ] as const
const iconTheme = computed(() => (isDark.value
  ? mdiWeatherSunny
  : mdiWeatherNight))

function switchLocale(newLocale: "en" | "fr") {
  locale.value = newLocale
  localStorage.setItem("i18n", newLocale)
}

function switchTheme() {
  const root = document.documentElement

  root.classList.add("theme-transition")

  if (!document.startViewTransition) {
    toggleTheme()
    root.classList.remove("theme-transition")

    return
  }

  const tx = document.startViewTransition(() => {
    toggleTheme()
  })

  tx.finished.finally(() => {
    root.classList.remove("theme-transition")
  })
}

function getFlagEmoji(l: string): string {
  switch (l) {
    case "en":
      return "🇺🇸"
    case "fr":
      return "🇫🇷"
    default:
      return "🌐"
  }
}

function goBack() {
  const path = route.path

  if (path === "/") {
    return "/"
  }

  let end = -1

  if (path.startsWith("/blog/") && !path.endsWith("/telegram")) {
    end = -4
  }

  return path
    .split("/")
    .slice(0, end)
    .join("/")
    || "/"
}
</script>

<style scoped lang="scss">
.rounded-b-lg {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
