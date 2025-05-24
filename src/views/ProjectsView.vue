<template>
  <v-container>
    <h1>{{ t("projects") }}</h1>

    <h3>{{ t("debugColors") }}</h3>

    <v-row
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col
        cols="8"
        class="text-center"
      >
        <v-btn
          color="primary"
          class="ma-5"
        >
          primary
        </v-btn>
        <v-btn
          color="secondary"
          class="ma-5"
        >
          secondary
        </v-btn>
        <v-btn
          color="accent"
          class="ma-5"
        >
          accent
        </v-btn>
        <v-btn
          color="error"
          class="ma-5"
        >
          error
        </v-btn>
        <v-btn
          color="info"
          class="ma-5"
        >
          info
        </v-btn>
        <v-btn
          color="success"
          class="ma-5"
        >
          success
        </v-btn>
        <v-btn
          color="warning"
          class="ma-5"
        >
          warning
        </v-btn>
        <v-btn
          color="background"
          class="ma-5"
        >
          background
        </v-btn>
        <v-btn
          color="text"
          class="ma-5"
        >
          text
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
{
  "en": {
    "debugColors": "Debug colors",
    "head": "Projects - EDM115",
    "projects": "My projects (TBD)"
  },
  "fr": {
    "debugColors": "Couleurs de débogage",
    "head": "Projets - EDM115",
    "projects": "Mes projets (pas terminé)"
  }
}
</i18n>

<script setup lang="ts">
import { useMainStore } from "@/stores/main"

import { useHead } from "@unhead/vue"
import { computed, onMounted } from "vue"
import { useI18n } from "vue-i18n"

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

useHead({
  title: t("head"),
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
