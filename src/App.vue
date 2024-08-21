<template>
  <v-app class="pa-4">
    <v-main>
      <v-app-bar rounded>
        <template #prepend>
          <v-app-bar-nav-icon />
        </template>

        <v-app-bar-title>EDM115 ?? Next website preview</v-app-bar-title>

        <template #append>
          <v-btn :icon="mdiHeart" />

          <v-btn :icon="mdiMagnify" />

          <v-btn :icon="mdiDotsVertical" />
        </template>
      </v-app-bar>

      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import mdiDotsVertical from "~icons/mdi/dotsVertical"
import mdiHeart from "~icons/mdi/heart"
import mdiMagnify from "~icons/mdi/magnify"
</script>
