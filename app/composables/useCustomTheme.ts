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

      if (import.meta.client) {
        const styleId = "color-scheme-style"
        let styleElement = document.getElementById(styleId) as HTMLStyleElement

        if (!styleElement) {
          styleElement = document.createElement("style")
          styleElement.id = styleId
          document.head.appendChild(styleElement)
        }

        styleElement.textContent = `:root { color-scheme: ${theme}; }`
      }
    },
  })

  const toggleTheme = useToggle(isDark)

  return { isDark, toggleTheme }
}
