// skipcq: JS-0045
export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.endsWith(".html")) {
    return navigateTo(to.path.replace(".html", ""))
  }

  if (to.path.endsWith("/") && to.path !== "/") {
    return navigateTo(to.path.slice(0, -1))
  }

  const router = useRouter()
  const routeExists = router.getRoutes().some((route) => route.path === to.path)

  if (!routeExists) {
    const internalMap: Record<string, string> = {
      "/cv": "https://edm115.dev/web/cv",
      "/cv2": "https://edm115.dev/web/cv2",
      "/unzip": "https://edm115.dev/web/unzip",
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
        return navigateTo(internalMap[match])
      }
    }

    if (Object.keys(externalMap).some((route) => to.path.startsWith(route))) {
      const match = Object.keys(externalMap).find((route) => to.path.startsWith(route))

      if (match) {
        return navigateTo(externalMap[match], { external: true })
      }
    }

    if (to.path.startsWith("/blog/")) {
      return navigateTo("/blog")
    }

    return navigateTo("/")
  }
})
