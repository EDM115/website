<template>
  <v-container>
    <h1>My projects (TBD)</h1>

    <h3>Debug colors</h3>

    <v-row
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col
        cols="8"
        class="text-center"
      >
        <v-btn
          color="primary"
          class="ma-5"
        >
          primary
        </v-btn>
        <v-btn
          color="secondary"
          class="ma-5"
        >
          secondary
        </v-btn>
        <v-btn
          color="accent"
          class="ma-5"
        >
          accent
        </v-btn>
        <v-btn
          color="error"
          class="ma-5"
        >
          error
        </v-btn>
        <v-btn
          color="info"
          class="ma-5"
        >
          info
        </v-btn>
        <v-btn
          color="success"
          class="ma-5"
        >
          success
        </v-btn>
        <v-btn
          color="warning"
          class="ma-5"
        >
          warning
        </v-btn>
        <v-btn
          color="background"
          class="ma-5"
        >
          background
        </v-btn>
        <v-btn
          color="text"
          class="ma-5"
        >
          text
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useHead } from "@unhead/vue"

useHead({
  title: "Projects - EDM115"
})
</script>
