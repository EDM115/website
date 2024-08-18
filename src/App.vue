<template>
  <v-app>
    <v-main>
      <v-app-bar rounded>
        <template #prepend>
          <v-app-bar-nav-icon />
        </template>

        <v-app-bar-title>EDM115 ??</v-app-bar-title>

        <template #append>
          <v-btn icon="mdi-heart" />

          <v-btn icon="mdi-magnify" />

          <v-btn icon="mdi-dots-vertical" />
        </template>
      </v-app-bar>

      <RouterView />
    </v-main>
  </v-app>
</template>
