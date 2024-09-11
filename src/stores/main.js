import cookie from "cookiejs"

import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    displayDialog: "true",
    theme: "dark"
  }),
  getters: {
    getDisplayDialog() {
      const displayDialog = cookie.get("displayDialog")

      if (displayDialog !== false) {
        this.setDisplayDialog(displayDialog)
      }

      return this.displayDialog
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
    setTheme(theme) {
      this.theme = this.createCookie("theme", theme, 30)
    }
  }
})

export default useMainStore
