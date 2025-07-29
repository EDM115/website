<template>
  <p class="mb-4">
    {{ t("home.contact1") }}<br><br>
    {{ t("home.contact2") }}<br>
    {{ t("home.contact3") }}<br>
  </p>
  <UiButton
    class="mr-2"
    color="secondary"
    :prepend-icon="mdiLink"
    :text="t('home.contact4')"
    href="https://old.edm115.dev"
    target="_blank"
    rel="noopener noreferrer"
  />
  <UiButton
    color="secondary"
    :prepend-icon="mdiLink"
    :text="t('home.contact5')"
    href="https://edm115.netlify.app"
    target="_blank"
    rel="noopener noreferrer"
  />
</template>

<script lang="ts" setup>
import mdiLink from "~icons/mdi/link"

const { t } = useI18n()
</script>
