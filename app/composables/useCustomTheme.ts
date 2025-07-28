import { useMainStore } from "~/stores/main"

export function useCustomTheme() {
  const store = useMainStore()
  const theme = useColorMode()

  const isDark = ref(theme.value === "dark")

  function changeTheme(themeName: "dark" | "light" | "system") {
    store.setTheme(themeName)
    theme.preference = themeName
  }

  return { isDark, theme, changeTheme }
}
