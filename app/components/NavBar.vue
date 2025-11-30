<template>
  <UiAppBar
    class="rounded-b-lg"
    invisible
    hit-through
  >
    <template #prepend>
      <template v-if="!isMobile">
        <UiButton
          v-if="showSecondaryButtons"
          :icon="mdiHomeOutline"
          hover-color="primary"
          variant="frosted"
          link="/"
          aria="Home"
        />
        <UiButton
          v-if="showSecondaryButtons"
          :icon="mdiArrowLeft"
          hover-color="primary"
          variant="frosted"
          aria="Back"
          @click="goBack"
        />
        <UiDivider
          v-if="showSecondaryButtons"
          vertical
        />
        <UiButton
          expandable
          :expanded="route.path === '/' && !isMobile"
          :color="route.path.startsWith('/projects') ? 'primary' : undefined"
          hover-color="primary"
          :icon="mdiCodeBlockTags"
          :text="t('home.projects')"
          variant="frosted"
          link="/projects"
          aria="Projects"
        />
        <UiButton
          expandable
          :expanded="route.path === '/' && !isMobile"
          :color="route.path.startsWith('/blog') ? 'primary' : undefined"
          hover-color="primary"
          :icon="mdiTextBoxEditOutline"
          :text="t('home.blog')"
          variant="frosted"
          link="/blog"
          aria="Blog"
        />
        <UiButton
          expandable
          :expanded="route.path === '/' && !isMobile"
          :color="route.path.startsWith('/unzip') ? 'primary' : undefined"
          hover-color="primary"
          :icon="flowbiteFileZipOutline"
          :text="t('home.unzip')"
          variant="frosted"
          link="/unzip"
          aria="unzip-bot"
        />
      </template>
      <UiButton
        v-else
        class="navbar-mobile-toggle"
        expandable
        :expanded="isMobileMenuOpen"
        :icon="menuToggleIcon"
        hover-color="primary"
        variant="frosted"
        text="Menu"
        :aria="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMobileMenu"
      />
    </template>

    <template #append>
      <template v-if="!isMobile">
        <UiMenu frosted>
          <template #activator="{ props }">
            <UiButton
              v-bind="props"
              :icon="mdiLanguage"
              color="text"
              hover-color="primary"
              variant="frosted"
              aria="Language switcher"
            />
          </template>
          <UiList compact>
            <UiListItem
              v-for="l in availableLocales"
              :key="l"
              :active="l === locale"
              @click="switchLocale(l)"
            >
              {{ getFlagEmoji(l) }}
            </UiListItem>
          </UiList>
        </UiMenu>
        <UiButton
          :icon="iconTheme"
          color="text"
          hover-color="primary"
          variant="frosted"
          aria="Theme switcher"
          @click="switchTheme()"
        />
      </template>
    </template>
  </UiAppBar>

  <Teleport to="body">
    <Transition name="navbar-mobile-fade">
      <section
        v-show="isMobile && isMobileMenuOpen"
        class="navbar-mobile-panel"
        aria-label="Main menu"
      >
        <div class="navbar-mobile-panel--links">
          <UiButton
            v-if="showSecondaryButtons"
            class="navbar-mobile-panel--link"
            :prepend-icon="mdiHomeOutline"
            hover-color="primary"
            variant="frosted"
            link="/"
            :text="t('home.home')"
            aria="Home"
            @click="toggleMobileMenu"
          />
          <UiButton
            v-if="showSecondaryButtons"
            class="navbar-mobile-panel--link"
            :prepend-icon="mdiArrowLeft"
            hover-color="primary"
            variant="frosted"
            :text="t('home.back')"
            aria="Back"
            @click="() => {toggleMobileMenu(); goBack()}"
          />
          <UiDivider v-if="showSecondaryButtons" />
          <UiButton
            class="navbar-mobile-panel--link"
            :color="route.path.startsWith('/projects') ? 'primary' : undefined"
            hover-color="primary"
            :prepend-icon="mdiCodeBlockTags"
            :text="t('home.projects')"
            variant="frosted"
            link="/projects"
            aria="Projects"
            @click="toggleMobileMenu"
          />
          <UiButton
            class="navbar-mobile-panel--link"
            :color="route.path.startsWith('/blog') ? 'primary' : undefined"
            hover-color="primary"
            :prepend-icon="mdiTextBoxEditOutline"
            :text="t('home.blog')"
            variant="frosted"
            link="/blog"
            aria="Blog"
            @click="toggleMobileMenu"
          />
          <UiButton
            class="navbar-mobile-panel--link"
            :color="route.path.startsWith('/unzip') ? 'primary' : undefined"
            hover-color="primary"
            :prepend-icon="flowbiteFileZipOutline"
            :text="t('home.unzip')"
            variant="frosted"
            link="/unzip"
            aria="unzip-bot"
            @click="toggleMobileMenu"
          />
        </div>

        <UiDivider />

        <div class="navbar-mobile-panel--groups">
          <UiButtonGroup
            class="navbar-mobile-panel--group"
            :options="languageOptions"
            :model-value="locale"
            aria="Language switcher"
            @update:model-value="value => switchLocale(value as 'en' | 'fr')"
          />
          <UiButtonGroup
            class="navbar-mobile-panel--group"
            :options="themeOptions"
            :model-value="currentTheme"
            aria="Theme switcher"
            @update:model-value="value => switchTheme(value as 'light' | 'dark')"
          />
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import flowbiteFileZipOutline from "~icons/flowbite/fileZipOutline"
import mdiArrowLeft from "~icons/mdi/arrowLeft"
import mdiClose from "~icons/mdi/close"
import mdiCodeBlockTags from "~icons/mdi/codeBlockTags"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiLanguage from "~icons/mdi/language"
import mdiMenu from "~icons/mdi/menu"
import mdiTextBoxEditOutline from "~icons/mdi/textBoxEditOutline"
import mdiWeatherNight from "~icons/mdi/weatherNight"
import mdiWeatherSunny from "~icons/mdi/weatherSunny"

import { useCustomTheme } from "~/composables/useCustomTheme"

const {
  locale,
  t,
} = useI18n()
const {
  isDark,
  changeTheme,
} = useCustomTheme()
const { isMobile } = useDevice()
const route = useRoute()
const router = useRouter()

const availableLocales = [ "en", "fr" ] as const
const iconTheme = computed(() => (isDark.value
  ? mdiWeatherSunny
  : mdiWeatherNight))
const showSecondaryButtons = computed(() => route.path !== "/")
const isMobileMenuOpen = ref(false)
const menuToggleIcon = computed(() => (isMobileMenuOpen.value
  ? mdiClose
  : mdiMenu))
const currentTheme = computed(() => (isDark.value
  ? "dark"
  : "light"))

const languageOptions = computed(() => availableLocales.map((code) => ({
  label: getFlagEmoji(code),
  value: code,
  aria: code === "fr"
    ? "Français"
    : "English",
})))

const themeOptions = computed(() => {
  return [
    {
      value: "light",
      icon: mdiWeatherSunny,
      aria: "Light theme",
    },
    {
      value: "dark",
      icon: mdiWeatherNight,
      aria: "Dark theme",
    },
  ]
})

watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
})

watch(isMobile, (mobile) => {
  if (!mobile) {
    isMobileMenuOpen.value = false
  }
})

if (import.meta.client) {
  watch(isMobileMenuOpen, (open) => {
    document.documentElement.classList.toggle("navbar-no-scroll", open)
  }, { immediate: true })

  onBeforeUnmount(() => {
    document.documentElement.classList.remove("navbar-no-scroll")
  })
}

function switchLocale(newLocale: "en" | "fr") {
  locale.value = newLocale
  localStorage.setItem("i18n", newLocale)
}

function switchTheme(target?: "light" | "dark") {
  const desiredTheme = target ?? (isDark.value
    ? "light"
    : "dark")

  if (target) {
    if (target === "dark" && isDark.value) {
      return
    }

    if (target === "light" && !isDark.value) {
      return
    }
  }

  if (typeof document === "undefined") {
    changeTheme(desiredTheme)

    return
  }

  const root = document.documentElement

  root.classList.add("theme-transition")

  const applyTheme = () => {
    changeTheme(desiredTheme)
  }

  if (!document.startViewTransition) {
    applyTheme()
    root.classList.remove("theme-transition")

    return
  }

  const tx = document.startViewTransition(() => {
    applyTheme()
  })

  tx.finished.finally(() => {
    root.classList.remove("theme-transition")
  })
}

function getFlagEmoji(l: string): string {
  switch (l) {
    case "en":
      return "🇺🇸"
    case "fr":
      return "🇫🇷"
    default:
      return "🌐"
  }
}

function goBack() {
  const path = route.path

  if (path === "/") {
    return "/"
  }

  let end = -1

  if (path.startsWith("/blog/") && !path.endsWith("/telegram")) {
    end = -4
  }

  router.push(path
    .split("/")
    .slice(0, end)
    .join("/")
    || "/")
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped lang="scss">
.rounded-b-lg {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}

/* .navbar-mobile-toggle :deep(.ui-btn--inside-text) {
  margin-right: 0.5rem;
} */

.navbar-mobile-panel {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 5rem 1.5rem 2rem;
  background: rgb(from var(--surface) r g b / 92%);
  backdrop-filter: blur(18px);
  box-shadow: var(--glass-shadow);
  overflow-y: auto;

  &--menu {
    align-self: flex-start;
  }

  &--links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &--link {
    width: 100%;
    height: 3rem;
    font-size: large;
    border-radius: 1rem;
  }

  &--groups {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &--group {
    height: 3rem;
    width: 100%;
  }
}

.navbar-mobile-fade-enter-active,
.navbar-mobile-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.navbar-mobile-fade-enter-from,
.navbar-mobile-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

:global(.navbar-no-scroll) {
  overflow: hidden;
}
</style>
