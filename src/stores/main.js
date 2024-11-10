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
    getAvailableLocales() {
      return this.availableLocales
    },
    getDisplayDialog() {
      const displayDialog = cookie.get("displayDialog")

      if (displayDialog !== false) {
        this.setDisplayDialog(displayDialog)
      }

      return this.displayDialog
    },
    getI18n() {
      const i18n = cookie.get("i18n")

      if (i18n) {
        this.setI18n(i18n)
      } else {
        this.setI18n(navigator.language.split("-")[0])
      }

      return this.i18n
    },
    getTheme() {
      const theme = cookie.get("theme")

      if (theme) {
        this.setTheme(theme)
      }

      return this.theme
    }
  },
  actions: {
    createCookie(name, value, days) {
      cookie(name, value, days)

      return value
    },
    setDisplayDialog(displayDialog) {
      this.displayDialog = this.createCookie("displayDialog", displayDialog, 1)
      this.displayDialog = this.displayDialog === "true"
    },
    setI18n(i18n) {
      this.i18n = this.createCookie("i18n", i18n, 30)
    },
    setTheme(theme) {
      this.theme = this.createCookie("theme", theme, 30)
    }
  }
})

export default useMainStore
