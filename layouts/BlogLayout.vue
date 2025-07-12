<template>
  <v-container class="d-flex flex-column align-center">
    <v-btn
      color="primary"
      class="mb-4"
      :prepend-icon="mdiArrowLeft"
      :text="t('back')"
      @click="$router.push('/blog')"
    />
    <router-view />
  </v-container>
</template>

<i18n>
{
  "en": {
    "back": "Back to blog list",
  },
  "fr": {
    "back": "Retour à la liste des blogs",
  }
}
</i18n>

<script setup lang="ts">
import { useCopyCode } from "@/composables/useCopyCode"
import { useCopySlug } from "@/composables/useCopySlug"
import mdiArrowLeft from "~icons/mdi/arrow-left"

import { useI18n } from "vue-i18n"

const { t } = useI18n()

useCopySlug()
useCopyCode()
</script>
