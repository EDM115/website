import cookie from "cookiejs"

import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    availableLocales: [ "en", "fr" ],
    displayDialog: "false",
    i18n: "en",
    theme: "dark"
  }),
  getters: {
    getAvailableLocales(state): string[] {
      return state.availableLocales
    },
    getDisplayDialog(state): string {
      return state.displayDialog
    },
    getI18n(state): string {
      return state.i18n
    },
    getTheme(state): string {
      return state.theme
    }
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
      let storedI18n = cookie.get("i18n")

      if (storedI18n) {
        if (typeof storedI18n === "boolean") {
          storedI18n = "en"
        }

        this.setI18n(storedI18n)
      } else {
        this.setI18n(navigator.language.split("-")[0])
      }
    },
    initTheme() {
      let storedTheme = cookie.get("theme")

      if (storedTheme) {
        if (typeof storedTheme === "boolean") {
          storedTheme = "dark"
        }

        this.setTheme(storedTheme)
      }
    },
    setDisplayDialog(displayDialog: string) {
      this.displayDialog = this.createCookie("displayDialog", displayDialog, 1)
    },
    setI18n(i18n: string) {
      this.i18n = this.createCookie("i18n", i18n, 30)
    },
    setTheme(theme: string) {
      this.theme = this.createCookie("theme", theme, 30)
    },
    initStore() {
      this.initDisplayDialog()
      this.initI18n()
      this.initTheme()
    }
  }
})

export default useMainStore
