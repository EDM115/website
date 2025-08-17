<template>
  <p style="margin-bottom: 16px;">
    {{ t("home.contact1") }}<br><br>
    {{ t("home.contact2") }}<br>
    {{ t("home.contact3") }}<br>
  </p>
  <UiButton
    color="secondary"
    style="margin-right: 8px;"
    :prepend-icon="mdiLink"
    :text="t('home.contact4')"
    link="https://old.edm115.dev"
    aria="Old EDM115 website"
  />
  <UiButton
    color="secondary"
    :prepend-icon="mdiLink"
    :text="t('home.contact5')"
    link="https://edm115.netlify.app"
    aria="Live EDM115 website"
  />
</template>

<script lang="ts" setup>
import mdiLink from "~icons/mdi/link"

const { t } = useI18n()
</script>
