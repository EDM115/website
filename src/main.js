import "./styles/settings.scss"
import "vuetify/styles"

import App from "./App.vue"
import router from "./router"

import { createPinia } from "pinia"
import { createApp } from "vue"
import { createVuetify } from "vuetify"
import { aliases, mdi } from "vuetify/iconsets/mdi-svg"
import { en } from "vuetify/locale"

const app = createApp(App)

app.use(createPinia())
app.use(createVuetify({
  icons: {
    aliases,
    defaultSet: "mdi",
    sets: {
      mdi
    }
  },
  locale: {
    locale: "en",
    messages: { en }
  },
  ssr: false,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          accent: "#53B9C8",
          background: "#020613",
          error: "#EE3124",
          info: "#53B9C8",
          primary: "#EE3124",
          secondary: "#2646CB",
          success: "#50FA7B",
          text: "#F8F8F2",
          warning: "#F5A249"
        },
        dark: true
      },
      light: {
        colors: {
          accent: "#379DAD",
          background: "#DFDFD2",
          error: "#EE3124",
          info: "#379DAD",
          primary: "#EE3124",
          secondary: "#803EDF",
          success: "#3CD863",
          text: "#070B1A",
          warning: "#FFB86C"
        },
        dark: false
      }
    }
  }
}))
app.use(router)

app.mount("#app")
