<template>
  <v-container class="d-flex flex-column align-center">
    <v-btn
      color="primary"
      class="mb-4"
      :prepend-icon="mdiArrowLeft"
      text="Back to blog list"
      @click="$router.push('/blog')"
    />
    <Blog202205-15-shared-drives-article />
  </v-container>
</template>

<script setup>
import mdiArrowLeft from "~icons/mdi/arrow-left"
</script>
