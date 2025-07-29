<template>
  <v-app-bar class="rounded-b-lg force-ssr">
    <template #prepend>
      <NuxtLink
        class="text-decoration-none"
        style="color: inherit;"
        to="/"
      >
        <v-app-bar-nav-icon :icon="menuIcon" />
      </NuxtLink>
    </template>

    <NuxtLink
      class="text-decoration-none"
      style="color: inherit;"
      to="/"
    >
      <v-app-bar-title>EDM115</v-app-bar-title>
    </NuxtLink>

    <template #append>
      <v-menu
        open-on-click
        open-on-focus
        open-on-hover
      >
        <template #activator="{ props }">
          <UiButton
            v-bind="props"
            :icon="mdiLanguage"
            @mouseleave="i18nSwitch = false"
            @mouseover="i18nSwitch = true"
          >
            <div v-if="i18nSwitch">
              {{ getFlagEmoji(userLocale) }}
            </div>
            <div v-else>
              <v-icon :icon="mdiLanguage" />
            </div>
          </UiButton>
        </template>
        <v-list
          class="small-list"
          @mouseleave="i18nSwitch = false"
          @mouseover="i18nSwitch = true"
        >
          <v-list-item
            v-for="l in availableLocales"
            :key="l"
            :active="l === userLocale"
            :title="getFlagEmoji(l)"
            @click="switchLocale(l)"
          />
        </v-list>
      </v-menu>
      <UiButton
        class="spin-animation"
        :icon="iconTheme"
        @click="onToggleTheme"
      />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"

import { useCustomTheme } from "~/composables/useCustomTheme"
import { useMainStore } from "~/stores/main"

const { locale } = useI18n()
const store = useMainStore()
const { isDark, changeTheme } = useCustomTheme()

const menuIcon = ref(mdiHomeOutline)
const i18nSwitch = ref(false)

const iconTheme = computed(() => (isDark.value ? mdiWeatherSunny : mdiWeatherNight))
const availableLocales = computed(() => store.getAvailableLocales)
const userLocale = computed(() => store.getI18n)

const switchLocale = (newLocale: "en" | "fr") => {
  locale.value = newLocale
  store.setI18n(newLocale)
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

// See https://paco.me/writing/disable-theme-transitions
function onToggleTheme() {
  // Create a style element to disable transitions on all elements
  const css = document.createElement("style")

  css.appendChild(document.createTextNode(`* {
         -webkit-transition: none !important;
         -moz-transition: none !important;
         -o-transition: none !important;
         -ms-transition: none !important;
         transition: none !important;
      }`))
  document.head.appendChild(css)

  changeTheme(isDark.value ? "light" : "dark")

  // Force a reflow to apply the new theme without transitions
  const _ = window.getComputedStyle(css).opacity

  // Remove the temporary CSS to restore transitions
  document.head.removeChild(css)
}
</script>

<style>
.spin-animation:active {
  animation: spin 1s ease-in-out 0s 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
}

.force-ssr {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateY(0px);
  width: 100%;
}

.small-list .v-list-item__content {
  min-width: 0px;
}

.small-list .v-list-item--density-compact:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline-end: 0px;
  padding-inline-start: 16px;
}
</style>

