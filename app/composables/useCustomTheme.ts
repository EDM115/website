export function useCustomTheme() {
  const { $vuetify } = useNuxtApp()

  const isDark = useDark({
    valueDark: "dark",
    valueLight: "light",
    initialValue: "dark",
    onChanged: (dark: boolean) => {
      $vuetify.theme.change(dark ? "dark" : "light")
    },
  })

  const toggleCT = useToggle(isDark)

  return { isDark, toggleCT }
}
