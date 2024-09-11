<template>
  <v-container>
    <h1>Blog (TBD)</h1><br>

    <h3>2 random posts, to be completed with a date sorting system. Also broken on mobile</h3>

    <v-divider class="my-4" />

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

<script setup>
import { useHead } from "@unhead/vue"

useHead({
  title: "Blog - EDM115"
})
</script>
