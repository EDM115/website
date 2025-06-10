import "aos/dist/aos.css"
import "vuetify/styles"
import "./styles/markdown-alert.scss"
import "./styles/markdown-spoiler.scss"
import "./styles/dracula-hljs.scss"
import "./styles/global.scss"

import AOS from "aos"
import cookie from "cookiejs"
// eslint-disable-next-line import-x/default
import App from "./App.vue"
import router from "./router"

import { createHead } from "@unhead/vue/client"
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
import { createPinia } from "pinia"
import { createApp } from "vue"
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi-svg"
import { en } from "vuetify/locale"
import { createI18n } from "vue-i18n"

const app = createApp(App)
const head = createHead()
const i18n = createI18n({
  fallbackLocale: "en",
  legacy: false,
  locale: cookie("i18n") || navigator.language.split("-")[0],
})

polyfillCountryFlagEmojis()

AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
})
app.use(createPinia())
app.use(createVuetify({
  icons: {
    aliases,
    defaultSet: "mdi",
    sets: { mdi },
  },
  locale: {
    locale: "en",
    messages: { en },
  },
  ssr: false,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          accent: "#BD93F9",
          background: "#00040E",
          error: "#FF5555",
          info: "#8BE9FD",
          primary: "#FFB86C",
          secondary: "#50FA7B",
          success: "#50FA7B",
          text: "#F8F8F2",
          warning: "#FF79C6",
        },
        dark: true,
      },
      light: {
        colors: {
          accent: "#BD93F9",
          background: "#DBDBCC",
          error: "#FF5555",
          info: "#8BE9FD",
          primary: "#FFB86C",
          secondary: "#50FA7B",
          success: "#50FA7B",
          text: "#00040E",
          warning: "#FF79C6",
        },
        dark: false,
      },
    },
    variations: {
      colors: [ "accent", "background", "error", "info", "primary", "secondary", "success", "text", "warning" ],
      darken: 3,
      lighten: 3,
    },
  },
}))
app.use(i18n)
app.use(head)
app.use(router)

app.mount("#app")
