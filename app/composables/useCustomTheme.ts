export function useCustomTheme() {
  const theme = useColorMode()

  const isDark = computed(() => {
    if (theme.preference === "dark") {
      return true
    }

    if (theme.preference === "light") {
      return false
    }

    // system
    return theme.value === "dark"
  })

  function changeTheme(themeName: "dark" | "light" | "system") {
    theme.preference = themeName
  }

  function toggleTheme() {
    changeTheme(isDark.value ? "light" : "dark")
  }

  return { isDark, theme, changeTheme, toggleTheme }
}
