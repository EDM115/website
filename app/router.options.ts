import type { RouterConfig } from "@nuxt/schema"

export default {
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80,
      }
    } else {
      if (savedPosition) {
        return savedPosition
      } else {
        return {
          top: 0,
          left: 0,
          behavior: "smooth",
        }
      }
    }
  },
} satisfies RouterConfig
