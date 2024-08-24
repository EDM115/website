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
          <v-btn :icon="mdiDotsVertical" />
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
import mdiDotsVertical from "~icons/mdi/dotsVertical"
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
</style>
