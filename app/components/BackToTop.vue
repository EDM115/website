<template>
  <v-fab
    v-show="showGoToTop"
    app
    appear
    color="primary"
    class="go-to-top"
    :icon="mdiArrowUp"
    location="bottom right"
    :variant="isDark ? 'tonal' : 'elevated'"
    @click="scrollToTop"
  />
</template>

<script lang="ts" setup>
import mdiArrowUp from "~icons/mdi/arrowUp"

import { useCustomTheme } from "~/composables/useCustomTheme"

const { isDark } = useCustomTheme()

const showGoToTop = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function handleScroll() {
  showGoToTop.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})
</script>
