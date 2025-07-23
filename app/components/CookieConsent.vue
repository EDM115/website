<template>
  <v-banner
    v-if="showBanner"
    class="cookie-consent-banner rounded-t-lg"
    color="primary"
    :icon="mdiCookieAlertOutline"
    lines="one"
  >
    <template #text>
      {{ t('cookies.text') }}
    </template>
    <template #actions>
      <div class="d-flex flex-column">
        <v-btn
          color="success"
          @click="handleAccept(true)"
        >
          {{ t('cookies.accept') }}
        </v-btn>
        <v-btn
          color="error"
          @click="handleAccept(false)"
        >
          {{ t('cookies.reject') }}
        </v-btn>
      </div>
    </template>
  </v-banner>
</template>

<script lang="ts" setup>
import mdiCookieAlertOutline from "~icons/mdi/cookie-alert-outline"

const { t } = useI18n()

const showBanner = ref(true)
const cloudflareWebAnalyticsToken = "bc6495e08a30452e82f5ff0613cdc85b"

function handleAccept(accepted: boolean) {
  showBanner.value = false

  if (accepted) {
    localStorage.setItem("cookie-consent", "true")
    cookieConsentTrigger.accept()
  } else {
    localStorage.setItem("cookie-consent", "false")
  }
}

useScriptCloudflareWebAnalytics({
  token: cloudflareWebAnalyticsToken,
  spa: false,
  scriptOptions: {
    bundle: true,
    trigger: cookieConsentTrigger,
  },
})

onMounted(() => {
  const localStorageCookieConsent = localStorage.getItem("cookie-consent")

  if (localStorageCookieConsent !== null) {
    handleAccept(localStorageCookieConsent === "true")
  }
})
</script>

<style scoped>
.cookie-consent-banner.v-banner {
  position: fixed !important;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.cookie-consent-banner :deep(.v-banner__content .v-banner-text) {
  -webkit-line-clamp: none !important;
  line-clamp: none !important;
  padding: 0.8rem 0rem !important;
}

.cookie-consent-banner :deep(.v-banner__prepend) {
  margin-top: 0.8rem !important;
}
</style>
