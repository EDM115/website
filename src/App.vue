<template>
  <v-app class="pa-4">
    <v-main>
      <v-app-bar rounded>
        <template #prepend>
          <v-app-bar-nav-icon />
        </template>

        <RouterLink
          to="/"
          class="text-decoration-none"
          style="color: inherit;"
        >
          <v-app-bar-title>EDM115 ?? Next website preview</v-app-bar-title>
        </RouterLink>

        <template #append>
          <v-btn :icon="mdiDotsVertical" />
        </template>
      </v-app-bar>

      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import mdiDotsVertical from "~icons/mdi/dotsVertical"
</script>
