<template>
  <UiButton
    v-show="showGoToTop"
    fab
    color="primary"
    class="go-to-top"
    :icon="mdiArrowUp"
    :variant
    aria="Go to top"
    @click="scrollToTop"
  />
</template>

<script setup lang="ts">
import mdiArrowUp from "~icons/mdi/arrowUp"

import { useCustomTheme } from "~/composables/useCustomTheme"

const { isDark } = useCustomTheme()
const router = useRouter()

let mounted = false
const showGoToTop = ref(false)

const variant = computed(() => {
  if (!mounted) {
    return "tonal"
  }

  return isDark.value
    ? "tonal"
    : "elevated"
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
  router.replace({ hash: "" })
}

function handleScroll() {
  showGoToTop.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
  mounted = true
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})
</script>

<style>
.go-to-top {
  transition: all 0.5s ease-in-out;
}
</style>
