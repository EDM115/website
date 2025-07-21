export function useCustomTheme() {
  const { $vuetify } = useNuxtApp()
  const cookie = useCookie("theme")

  const isDark = useDark({
    valueDark: "dark",
    valueLight: "light",
    initialValue: cookie.value as "dark" | "light" | null | undefined ?? "dark",
    onChanged: (dark: boolean) => {
      $vuetify.theme.change(dark ? "dark" : "light")
    },
  })

  const toggleCT = useToggle(isDark)

  return { isDark, toggleCT }
}
