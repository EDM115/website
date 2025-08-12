export function useCustomTheme() {
  const theme = useColorMode()

  const isDark = ref(theme.value === "dark")

  watch(theme, (newTheme) => {
    console.log("Theme changed :", newTheme)
  })

  function changeTheme(themeName: "dark" | "light" | "system") {
    theme.preference = themeName
  }

  return { isDark, theme, changeTheme }
}
