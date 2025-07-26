// skipcq: JS-C1003
import * as en from "./locales/en"
import * as fr from "./locales/fr"

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: en.default,
    fr: fr.default,
  },
}))
