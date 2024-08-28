<template>
  <v-app class="pa-4">
    <v-main>
      <v-app-bar rounded>
        <template #prepend>
          <v-app-bar-nav-icon />
        </template>

        <RouterLink
          class="text-decoration-none"
          style="color: inherit;"
          :to="{ name: 'home' }"
        >
          <v-app-bar-title>EDM115 ?? Next website preview</v-app-bar-title>
        </RouterLink>

        <template #append>
          <v-btn
            class="spin-animation"
            :icon="iconTheme"
            @click="toggleTheme"
          />
        </template>
      </v-app-bar>

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
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"
import useMainStore from "@/stores/main"

import { computed, onMounted, ref } from "vue"
import { useTheme } from "vuetify"

const store = useMainStore()
const theme = ref(store.getTheme)
const vuetifyTheme = useTheme()
const iconTheme = computed(() => (vuetifyTheme.name.value === "light" ? mdiWeatherNight : mdiWeatherSunny))

function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark"
  store.setTheme(theme.value)
  vuetifyTheme.global.name.value = theme.value
}

onMounted(() => {
  store.setTheme(store.getTheme)
  vuetifyTheme.global.name.value = store.getTheme
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
