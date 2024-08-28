import cookie from "cookiejs"

import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    theme: "dark"
  }),
  getters: {
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
    setTheme(theme) {
      this.theme = this.createCookie("theme", theme, 30)
    }
  }
})

export default useMainStore
