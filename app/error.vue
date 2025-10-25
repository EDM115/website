<template>
  <h1>{{ error.statusCode }}</h1>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

const router = useRouter()

defineProps<{
  error: NuxtError;
}>()

onMounted(() => {
  router.replace("/")
})
</script>
