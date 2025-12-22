export function useCustomTheme() {
  const theme = ref(useColorMode())

  const isDark = computed(() => {
    if (theme.value.preference === "dark") {
      return true
    }

    if (theme.value.preference === "light") {
      return false
    }

    if (theme.value.unknown) {
      // SSR or prerender, dark by default
      return true
    }

    // system
    return theme.value.value === "dark"
  })

  function changeTheme(themeName: "dark" | "light") {
    theme.value.preference = themeName
  }

  function toggleTheme() {
    changeTheme(isDark.value
      ? "light"
      : "dark")
  }

  return {
    isDark,
    theme,
    changeTheme,
    toggleTheme,
  }
}
