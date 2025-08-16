<template>
  <UiAppBar class="rounded-b-lg navbar-glass">
    <template #prepend>
      <UiButton
        :icon="menuIcon"
        variant="flat"
        link="/"
      />
    </template>

    <NuxtLink
      class="text-decoration-none"
      style="color: inherit;"
      to="/"
    >
      EDM115
    </NuxtLink>

    <template #append>
      <UiMenu>
        <template #activator="{ props }">
          <UiButton
            v-bind="props"
            :icon="mdiLanguage"
            variant="flat"
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
        variant="flat"
        @click="toggleTheme"
      />
    </template>
  </UiAppBar>
</template>

<script setup lang="ts">
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"

import { useCustomTheme } from "~/composables/useCustomTheme"

const { locale } = useI18n()
const { isDark, toggleTheme } = useCustomTheme()

const menuIcon = ref(mdiHomeOutline)
const i18nSwitch = ref(false)

const availableLocales = [ "en", "fr" ] as const
const iconTheme = computed(() => (isDark.value ? mdiWeatherSunny : mdiWeatherNight))

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
</script>
