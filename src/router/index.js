import HomeView from "../views/HomeView.vue"

import { createRouter, createWebHistory } from "vue-router"

const blogPosts = import.meta.glob("../views/blog/**/*.vue")

function generateBlogRoutes() {
  const routes = []

  for (const path in blogPosts) {
    const routePath = path
      .replace("../views", "")
      .replace("View.vue", "")
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
      .replace(/\/-/, "/")

    routes.push({
      path: routePath,
      component: blogPosts[path]
    })
  }

  return routes
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue")
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../views/ProjectsView.vue")
    },
    ...generateBlogRoutes()
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
  }
})

router.beforeEach((to, from, next) => {
  if (to.path.endsWith(".html")) {
    next({ path: to.path.replace(".html", "") })
  }

  const blogRoutes = generateBlogRoutes().map((route) => route.path)

  if (to.path.startsWith("/blog/") && !blogRoutes.includes(to.path)) {
    next({ name: "home" })
  } else {
    const routeExists = router.getRoutes().some((route) => route.path === to.path)

    if (routeExists) {
      next()
    } else {
      const oldSubdomainRoutes = [ "/ludivine.mp4", "/underrated", "/hugo", "/external-mods", "/external-mods/README.txt", "/cv", "/cv2", "/assets", "/.well-known", "/planparfait", "/socials", "/sporttrack", "/unzip" ]

      if (oldSubdomainRoutes.some((route) => to.path.startsWith(route))) {
        window.location.replace(`http://old.edm115.dev${window.location.pathname}${window.location.search}`)
      }

      next({ name: "home" })
    }
  }
})

export default router
