<template>
  <div>
    <div class="app-bg" />
    <NuxtRouteAnnouncer />
    <NavBar />
    <main>
      <div
        class="centered-stack-home"
        style="min-height: 80vh; justify-content: center;"
      >
        <h1 style="font-size: 4rem;">
          {{ error.statusCode }}
        </h1>
        <UiAlert
          type="error"
          :text="error.message"
        />
        <UiButton
          :text="t('error.back')"
          link="/"
          color="error"
          :prepend-icon="mdiHomeOutline"
          size="lg"
          style="margin-top: 1rem;"
        />
      </div>
    </main>
    <BackToTop />
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"
import mdiHomeOutline from "~icons/mdi/homeOutline"

const route = useRoute()
const { t } = useI18n()

const props = defineProps<{
  error: NuxtError;
}>()

defineOgImageComponent("OgImage", {
  title: () => props.error.statusCode.toString(),
  description: () => props.error.statusMessage,
  path: route.path,
  glowColor: "ff5555",
})
</script>
