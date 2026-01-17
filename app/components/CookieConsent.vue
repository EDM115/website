<template>
  <UiBanner
    v-if="showBanner"
    v-on-click-outside="() => handleAccept(false)"
    class="rounded-t-lg"
    color="primary"
    :icon="mdiCookieAlertOutline"
    lines="one"
  >
    {{ t('cookies.text') }}

    <template #actions>
      <div class="flex-actions">
        <UiButton
          color="success"
          aria="Accept cookies"
          @click="handleAccept(true)"
        >
          {{ t('cookies.accept') }}
        </UiButton>
        <UiButton
          color="error"
          aria="Reject cookies"
          @click="handleAccept(false)"
        >
          {{ t('cookies.reject') }}
        </UiButton>
      </div>
    </template>
  </UiBanner>
</template>

<script setup lang="ts">
import mdiCookieAlertOutline from "~icons/mdi/cookie-alert-outline"

import { vOnClickOutside } from "@vueuse/components"

const { t } = useI18n()

const showBanner = ref(true)
const cloudflareWebAnalyticsToken = "bc6495e08a30452e82f5ff0613cdc85b"
const cookieConsentTrigger = useScriptTriggerConsent()

function handleAccept(accepted: boolean) {
  if (!import.meta.client) {
    return
  }

  showBanner.value = false

  if (accepted) {
    localStorage.setItem("cookie-consent", "true")
    cookieConsentTrigger.accept()
  } else {
    localStorage.setItem("cookie-consent", "false")
  }
}

if (!import.meta.dev) {
  useScriptCloudflareWebAnalytics({
    token: cloudflareWebAnalyticsToken,
    spa: false,
    scriptOptions: {
      bundle: true,
      trigger: cookieConsentTrigger,
    },
  })
}

onMounted(() => {
  const localStorageCookieConsent = localStorage.getItem("cookie-consent")

  if (localStorageCookieConsent !== null) {
    handleAccept(localStorageCookieConsent === "true")
  }
})
</script>

<style scoped lang="scss">
.rounded-t-lg {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.flex-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
