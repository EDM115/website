<template>
  <v-app-bar class="rounded-b-lg">
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
          <v-btn
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
          </v-btn>
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
      <v-btn
        class="spin-animation"
        :icon="iconTheme"
        @click="onToggleTheme"
      />
    </template>
  </v-app-bar>

  <v-dialog
    v-model="displayDialog"
    persistent
    max-width="350"
  >
    <v-card
      color="error"
      class="d-flex align-center"
    >
      <v-alert
        :icon="lucideConstruction"
        color="error"
        :title="t('navbar.indev.title')"
        :text="t('navbar.indev.text')"
      />
      <v-card-actions>
        <v-btn
          color="text"
          :text="t('navbar.indev.oldSite')"
          href="https://old.edm115.dev"
          target="_blank"
          rel="noopener noreferrer"
        />
        <v-btn
          color="text"
          :text="t('navbar.close')"
          @click="toggleDialog"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import lucideConstruction from "~icons/lucide/construction"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"

import { useCustomTheme } from "~/composables/useCustomTheme"
import { useMainStore } from "~/stores/main"

const { locale, t } = useI18n()
const store = useMainStore()
const { isDark, toggleTheme } = useCustomTheme()

const displayDialog = ref(false)
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

function toggleDialog() {
  store.setDisplayDialog("false")
  displayDialog.value = (store.getDisplayDialog === "true")
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

  // Change the theme via the composable (handles store and Vuetify)
  toggleTheme()

  // Force a reflow to apply the new theme without transitions
  const _ = window.getComputedStyle(css).opacity

  // Remove the temporary CSS to restore transitions
  document.head.removeChild(css)

  // Scroll down and up to trigger AOS and avoid content disappearing until we scroll
  /* window.scrollBy(0, 1)
  window.scrollBy(0, -1) */
}

onMounted(() => {
  displayDialog.value = (store.getDisplayDialog === "true")
})
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

.small-list .v-list-item__content {
  min-width: 0px;
}

.small-list .v-list-item--density-compact:not(.v-list-item--nav).v-list-item--one-line {
  padding-inline-end: 0px;
  padding-inline-start: 16px;
}
</style>

