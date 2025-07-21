<template>
  <v-container>
    <h1>{{ t("blog.title") }}</h1><br>

    <h3>{{ t("blog.subtitle") }}</h3>

    <v-divider class="my-4" />

    <NuxtLink
      class="ma-2"
      to="/blog/2025/05/30/how-i-migrated-to-zod-4"
    >
      <v-btn
        color="primary"
        text="How I migrated to Zod 4"
      />
    </NuxtLink>

    <NuxtLink
      class="ma-2"
      to="/blog/2025/01/22/how-to-send-dtmf-on-android"
    >
      <v-btn
        color="primary"
        text="How to send DTMF on Android"
      />
    </NuxtLink>

    <NuxtLink
      class="ma-2"
      to="/blog/2024/08/20/education-to-pro"
    >
      <v-btn
        color="primary"
        text="Education to Pro"
      />
    </NuxtLink>

    <NuxtLink
      class="ma-2"
      to="/blog/2022/05/15/google-ending-shared-drives"
    >
      <v-btn
        color="primary"
        text="Google ending Shared Drives"
      />
    </NuxtLink>
  </v-container>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const { locale, t } = useI18n()
const store = useMainStore()

const userLocale = computed(() => store.getI18n)

useHead({
  title: t("blog.head"),
  meta: [
    {
      name: "og:title",
      content: t("blog.head"),
    },
  ],
})

onMounted(() => {
  locale.value = userLocale.value
})
</script>
