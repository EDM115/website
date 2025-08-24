// skipcq: JS-0045
let redirected = false

export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.endsWith(".html")) {
    redirected = true

    return navigateTo(to.path.replace(".html", ""))
  }

  if (to.path.endsWith("/") && to.path !== "/") {
    redirected = true

    return navigateTo(to.path.slice(0, -1))
  }

  const router = useRouter()
  const publicPaths = [
    "/web/cv",
    "/web/cv2",
  ]
  const routeExists = router.getRoutes().some((route) => route.path === to.path) || publicPaths.includes(to.path)

  if (!routeExists) {
    const internalMap: Record<string, string> = {
      "/cv2": "/web/cv2",
      "/cv": "/web/cv",
    }

    const externalMap: Record<string, string> = {
      "/hugo": "https://edm115.github.io/hugo",
      "/ludivine.mp4": "https://raw.githubusercontent.com/EDM115/website/v1/ludivine.mp4",
      "/sporttrack": "https://edm115.github.io/sport-track",
      "/underrated": "https://edm115.github.io/underrated-producers-list",
    }

    if (Object.keys(internalMap).some((route) => to.path.startsWith(route))) {
      const match = Object.keys(internalMap).find((route) => to.path.startsWith(route))

      if (match) {
        redirected = true

        return navigateTo(internalMap[match])
      }
    }

    if (Object.keys(externalMap).some((route) => to.path.startsWith(route))) {
      const match = Object.keys(externalMap).find((route) => to.path.startsWith(route))

      if (match) {
        redirected = true

        return navigateTo(externalMap[match], { external: true })
      }
    }

    if (to.path.startsWith("/blog/")) {
      redirected = true
      return navigateTo("/blog")
    }

    if (!redirected) {
      return navigateTo("/")
    }
  }
})
