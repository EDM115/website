import HomeView from "../views/HomeView.vue"

import { createRouter, createWebHistory } from "vue-router"

const BlogView = () => import("../views/BlogView.vue")
const ProjectsView = () => import("../views/ProjectsView.vue")

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
      component: BlogView
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView
    }
  ]
})

export default router
