import cookie from "cookiejs"

import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    availableLocales: [ "en", "fr" ] as const,
    displayDialog: "false" as "true" | "false",
    i18n: "en" as "en" | "fr",
    theme: "dark" as "dark" | "light",
  }),
  getters: {
    getAvailableLocales(state): readonly [ "en", "fr" ] {
      return state.availableLocales
    },
    getDisplayDialog(state): "true" | "false" {
      return state.displayDialog
    },
    getI18n(state): "en" | "fr" {
      return state.i18n
    },
    getTheme(state): "dark" | "light" {
      return state.theme
    },
  },
  actions: {
    createCookie(name: string, value: string, days: number) {
      cookie(name, value, days)

      return value
    },
    initDisplayDialog() {
      const displayDialog = cookie.get("displayDialog")

      if (displayDialog !== false) {
        this.setDisplayDialog(displayDialog ? "true" : "false")
      }
    },
    initI18n() {
      const storedI18n = cookie.get("i18n")
      let i18n: "en" | "fr" = "en"

      if (storedI18n) {
        if (typeof storedI18n === "boolean") {
          i18n = "en"
        } else {
          i18n = storedI18n as "en" | "fr"
        }

        this.setI18n(i18n)
      } else {
        this.setI18n(navigator.language.split("-")[0] as "en" | "fr" ?? "en")
      }
    },
    initTheme() {
      const storedTheme = cookie.get("theme")
      const localStorageTheme = localStorage.getItem("vueuse-color-scheme")
      let theme: "dark" | "light" = "dark"

      if (storedTheme) {
        if (typeof storedTheme === "boolean") {
          theme = "dark"
        } else {
          theme = storedTheme as "dark" | "light"
        }
      }

      if (localStorageTheme) {
        theme = localStorageTheme === "light" ? "light" : "dark"
      }

      this.setTheme(theme)
    },
    setDisplayDialog(displayDialog: "true" | "false") {
      this.createCookie("displayDialog", displayDialog, 1)
      this.displayDialog = displayDialog
    },
    setI18n(i18n: "en" | "fr") {
      this.createCookie("i18n", i18n, 30)
      this.i18n = i18n
    },
    setTheme(theme: "dark" | "light") {
      this.createCookie("theme", theme, 30)
      this.theme = theme
    },
    initStore() {
      this.initDisplayDialog()
      this.initI18n()
      this.initTheme()
    },
  },
})

export default useMainStore
