import HomeView from "../views/HomeView.vue"
import { generateBlogChildren } from "./blogRoutes"

import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/blog",
      component: () => import("../layouts/BlogLayout.vue"),
      children: [ ...generateBlogChildren() ],
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../views/ProjectsView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: "smooth" })
        }, 500)
      })
    } else {
      if (savedPosition) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(savedPosition)
          }, 500)
        })
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ top: 0, behavior: "smooth" })
          }, 500)
        })
      }
    }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.path.endsWith(".html")) {
    next({ path: to.path.replace(".html", "") })
  }

  const blogRoutes = generateBlogChildren().map((route) => `/blog/${route.path}`)

  if (to.path.startsWith("/blog/") && !blogRoutes.includes(to.path)) {
    next({ name: "home" })
  } else {
    const routeExists = router.getRoutes().some((route) => route.path === to.path)

    if (routeExists) {
      next()
    } else {
      const oldSubdomainRoutes = [ "/ludivine.mp4", "/underrated", "/hugo", "/external-mods", "/external-mods/README.txt", "/cv", "/cv2", "/assets", "/.well-known", "/planparfait", "/socials", "/sporttrack", "/unzip", "/robots.txt" ]

      if (oldSubdomainRoutes.some((route) => to.path.startsWith(route))) {
        window.location.replace(`https://old.edm115.dev${window.location.pathname}${window.location.search}`)
      }

      next({ name: "home" })
    }
  }
})

export default router
