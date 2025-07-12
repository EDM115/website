<template>
  <v-app class="pa-4">
    <v-main>
      <v-app-bar rounded>
        <template #prepend>
          <RouterLink
            class="text-decoration-none"
            style="color: inherit;"
            to="/"
          >
            <v-app-bar-nav-icon :icon="menuIcon" />
          </RouterLink>
        </template>

        <RouterLink
          class="text-decoration-none"
          style="color: inherit;"
          to="/"
        >
          <v-app-bar-title>EDM115</v-app-bar-title>
        </RouterLink>

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
            @click="toggleTheme"
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
            :title="t('indev.title')"
            :text="t('indev.text')"
          />
          <v-card-actions>
            <v-btn
              color="text"
              :text="t('indev.oldSite')"
              href="https://old.edm115.dev"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="text"
              :text="t('close')"
              @click="toggleDialog"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<i18n>
{
  "en": {
    "close": "Close",
    "head": "EDM115 - French dev/student/gamer/music producer",
    "indev": {
      "oldSite": "Visit the old website",
      "title": "In development",
      "text": "This website is still in heavy development and some areas aren't ready yet."
    }
  },
  "fr": {
    "close": "Fermer",
    "head": "EDM115 - Développeur français/étudiant/gamer/producteur de musique",
    "indev": {
      "oldSite": "Visiter l'ancien site",
      "title": "En développement",
      "text": "Ce site est encore en développement intensif et certaines parties ne sont pas encore prêtes."
    }
  }
}
</i18n>

<script setup lang="ts">
import lucideConstruction from "~icons/lucide/construction"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"
import { useMainStore } from "@/stores/main"

import { computed, onMounted, ref } from "vue"
import { useTheme } from "vuetify"
import { useI18n } from "vue-i18n"

const store = useMainStore()
const theme = ref(store.getTheme)
const displayDialog = ref(false)
const menuIcon = ref(mdiHomeOutline)
const vuetifyTheme = useTheme()
const iconTheme = computed(() => (vuetifyTheme.name.value === "light" ? mdiWeatherNight : mdiWeatherSunny))

const { locale, t } = useI18n()
const availableLocales = computed(() => store.getAvailableLocales)
const i18nSwitch = ref(false)
const userLocale = computed(() => store.getI18n)

const switchLocale = (newLocale: string) => {
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
function toggleTheme() {
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

  theme.value = theme.value === "dark" ? "light" : "dark"
  store.setTheme(theme.value)
  vuetifyTheme.global.name.value = theme.value

  // Force a reflow to apply the new theme without transitions
  const _ = window.getComputedStyle(css).opacity

  // Remove the temporary CSS to restore transitions
  document.head.removeChild(css)

  // Scroll down and up to trigger AOS and avoid content disappearing until we scroll
  window.scrollBy(0, 1)
  window.scrollBy(0, -1)
}

onMounted(() => {
  vuetifyTheme.global.name.value = store.getTheme
  displayDialog.value = (store.getDisplayDialog === "true")
})
</script>

<style scoped>
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

