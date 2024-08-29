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
  ]
})

export default router
