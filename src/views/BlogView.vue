<template>
  <v-container>
    <h1>{{ t("blog") }}</h1><br>

    <h3>{{ t("description") }}</h3>

    <v-divider class="my-4" />

    <RouterLink
      class="ma-2"
      to="/blog/2025/05/30/how-i-migrated-to-zod-4"
    >
      <v-btn
        color="primary"
        text="How I migrated to Zod 4"
      />
    </RouterLink>

    <RouterLink
      class="ma-2"
      to="/blog/2025/01/22/how-to-send-dtmf-on-android"
    >
      <v-btn
        color="primary"
        text="How to send DTMF on Android"
      />
    </RouterLink>

    <RouterLink
      class="ma-2"
      to="/blog/2024/08/20/education-to-pro"
    >
      <v-btn
        color="primary"
        text="Education to Pro"
      />
    </RouterLink>

    <RouterLink
      class="ma-2"
      to="/blog/2022/05/15/google-ending-shared-drives"
    >
      <v-btn
        color="primary"
        text="Google ending Shared Drives"
      />
    </RouterLink>
  </v-container>
</template>

<i18n>
{
  "en": {
    "blog": "Blog (TBD)",
    "description": "4 random posts, to be completed with a date & tag sorting system",
    "head": "Blog - EDM115",
  },
  "fr": {
    "blog": "Blog (pas terminé)",
    "description": "4 articles aléatoires, à compléter avec un système de tri par date et par tags",
    "head": "Blog - EDM115"
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
  meta: [
    {
      name: "og:title",
      content: t("head"),
    },
  ],
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
