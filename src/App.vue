<template>
  <v-app class="pa-4">
    <v-main>
      <v-app-bar rounded>
        <template #prepend>
          <RouterLink
            class="text-decoration-none"
            style="color: inherit;"
            :to="{ name: 'home' }"
          >
            <v-app-bar-nav-icon :icon="menuIcon" />
          </RouterLink>
        </template>

        <RouterLink
          class="text-decoration-none"
          style="color: inherit;"
          :to="{ name: 'home' }"
        >
          <v-app-bar-title>EDM115</v-app-bar-title>
        </RouterLink>

        <template #append>
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
        <v-card class="d-flex justify-center text-center">
          <v-card-title class="headline">
            In development
          </v-card-title>
          <v-card-text>
            This website is still in heavy development and some areas aren't ready yet.
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="primary"
              text="Visit the old website"
              href="https://old.edm115.dev"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="primary"
              text="Close"
              @click="toggleDialog"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <RouterView v-slot="{ Component, route }">
        <Transition
          appear
          mode="out-in"
          name="page"
        >
          <Component
            :is="Component"
            :key="route.path"
          />
        </Transition>
      </RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiMenu from "~icons/mdi/menu"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"
import useMainStore from "@/stores/main"

import { useHead } from "@unhead/vue"
import { computed, onMounted, ref } from "vue"
import { useTheme } from "vuetify"

const store = useMainStore()
const theme = ref(store.getTheme)
const displayDialog = ref(false)
const menuIcon = ref(mdiMenu)
const vuetifyTheme = useTheme()
const iconTheme = computed(() => (vuetifyTheme.name.value === "light" ? mdiWeatherNight : mdiWeatherSunny))

function toggleDialog() {
  store.setDisplayDialog("false")
  displayDialog.value = (store.getDisplayDialog === "true")
}

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark"
  store.setTheme(theme.value)
  vuetifyTheme.global.name.value = theme.value
}

useHead({
  title: "EDM115 - French dev/student/gamer/music producer",
  meta: [{ name: "darkreader-lock" }]
})

onMounted(() => {
  store.setTheme(store.getTheme)
  vuetifyTheme.global.name.value = store.getTheme
  displayDialog.value = (store.getDisplayDialog === "true")

  setInterval(() => {
    menuIcon.value = menuIcon.value === mdiMenu ? mdiHomeOutline : mdiMenu
  }, 3000)
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
</style>
