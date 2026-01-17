<template>
  <UiButton
    v-show="showGoToTop"
    fab
    color="primary"
    hover-color="primary"
    :icon="mdiArrowUp"
    :variant="variant"
    aria="Go to top"
    @click="scrollToTop"
  />
</template>

<script setup lang="ts">
import mdiArrowUp from "~icons/mdi/arrowUp"

const { isDark } = useCustomTheme()
const router = useRouter()

const mounted = ref(false)
const showGoToTop = ref(false)

const variant = computed(() => {
  if (!mounted.value) {
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
  handleScroll()
  mounted.value = true
})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
  mounted.value = false
})
</script>
