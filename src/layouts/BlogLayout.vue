<template>
  <v-container class="d-flex flex-column align-center">
    <v-btn
      color="primary"
      class="mb-4"
      :prepend-icon="mdiArrowLeft"
      text="Back to blog list"
      @click="$router.push('/blog')"
    />
    <router-view />
  </v-container>
</template>

<script setup lang="ts">
import { useCopyCode } from "@/composables/useCopyCode"
import { useCopySlug } from "@/composables/useCopySlug"
import mdiArrowLeft from "~icons/mdi/arrow-left"

useCopySlug()
useCopyCode()
</script>
