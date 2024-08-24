import HomeView from "../views/HomeView.vue"

import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue")
    }
  ]
})

export default router
