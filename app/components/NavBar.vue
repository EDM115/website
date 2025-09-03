<template>
  <UiAppBar
    class="rounded-b-lg"
    invisible
  >
    <template
      v-if="route.path !== '/'"
      #prepend
    >
      <UiButton
        :icon="mdiHomeOutline"
        variant="frosted"
        link="/"
        aria="Home"
      />
      <UiButton
        :icon="mdiArrowLeft"
        variant="frosted"
        :link="goBack()"
        aria="Back"
      />
    </template>

    <template #append>
      <UiMenu>
        <template #activator="{ props }">
          <UiButton
            v-bind="props"
            :icon="mdiLanguage"
            color="text"
            variant="frosted"
            aria="Language switcher"
            @mouseleave="i18nSwitch = false"
            @mouseover="i18nSwitch = true"
          >
            <div v-if="i18nSwitch">
              {{ getFlagEmoji(locale) }}
            </div>
            <div v-else>
              <UiIcon :icon="mdiLanguage" />
            </div>
          </UiButton>
        </template>
        <UiList
          compact
          @mouseleave="i18nSwitch = false"
          @mouseover="i18nSwitch = true"
        >
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
        variant="frosted"
        aria="Theme switcher"
        @click="toggleTheme"
      />
    </template>
  </UiAppBar>
</template>

<script setup lang="ts">
import mdiArrowLeft from "~icons/mdi/arrowLeft"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"

import { useCustomTheme } from "~/composables/useCustomTheme"

const { locale } = useI18n()
const {
  isDark,
  toggleTheme,
} = useCustomTheme()
const route = useRoute()

const i18nSwitch = ref(false)

const availableLocales = [ "en", "fr" ] as const
const iconTheme = computed(() => (isDark.value
  ? mdiWeatherSunny
  : mdiWeatherNight))

const switchLocale = (newLocale: "en" | "fr") => {
  locale.value = newLocale
}

const getFlagEmoji = (l: string): string => {
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

  if (path.startsWith("/blog/")) {
    end = -4
  }

  return path
    .split("/")
    .slice(0, end)
    .join("/")
    || "/"
}
</script>

<style lang="scss" scoped>
.rounded-b-lg {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
