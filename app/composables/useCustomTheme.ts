import { useMainStore } from "~/stores/main"

export function useCustomTheme() {
  const { $vuetify } = useNuxtApp()
  const store = useMainStore()
  let theme: "dark" | "light" = "dark"

  if (import.meta.client) {
    const localStorageTheme = localStorage.getItem("theme")
    if (!localStorageTheme) {
      theme = store.getTheme
    } else {
      theme = localStorageTheme === "light" ? "light" : "dark"
    }
  }

  const isDark = useDark({
    storageKey: "theme",
    initialValue: theme,
    onChanged(dark: boolean) {
      const theme = dark ? "dark" : "light"
      $vuetify.theme.change(theme)
      store.setTheme(theme)
    },
  })

  const toggleTheme = useToggle(isDark)

  return { isDark, toggleTheme }
}
