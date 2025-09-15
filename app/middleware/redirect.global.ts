// skipcq: JS-0045
export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.endsWith(".html")) {
    return navigateTo({
      path: to.path.replace(".html", ""),
      hash: to.hash,
      query: to.query,
      replace: true,
    })
  }

  if (to.path.endsWith("/") && to.path !== "/") {
    return navigateTo({
      path: to.path.slice(0, -1),
      hash: to.hash,
      query: to.query,
      replace: true,
    })
  }

  const router = useRouter()
  const publicPaths = [
    "/web/cv",
    "/web/cv2",
  ]
  const routeExists = router.getRoutes()
    .some((route) => route.path === to.path)
    || publicPaths.includes(to.path)

  if (!routeExists) {
    // used for pre-built HTML pages
    // const internalMap: Record<string, string> = {}

    const externalMap: Record<string, string> = {
      "/hugo": "https://edm115.github.io/hugo",
      "/sporttrack": "https://edm115.github.io/sport-track",
      "/underrated": "https://edm115.github.io/underrated-producers-list",
    }

    /* const internal = Object.keys(internalMap)
      .find((route) => to.path.startsWith(route))

    if (internal) {
      return navigateTo({
        path: internalMap[internal],
        hash: to.hash,
        query: to.query,
        replace: true,
      })
    } */

    const external = Object.keys(externalMap)
      .find((route) => to.path.startsWith(route))

    if (external) {
      const url = new URL(externalMap[external] ?? "")

      if (to.hash) {
        url.hash = to.hash
      }

      if (to.query && Object.keys(to.query).length) {
        // oxlint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        url.search = new URLSearchParams(to.query as Record<string, string>)
          .toString()
      }

      return navigateTo(url.toString(), { external: true })
    }

    if (to.path.startsWith("/blog/")) {
      return navigateTo({
        path: "/blog", hash: to.hash, query: to.query, replace: true,
      })
    }

    return navigateTo({
      path: "/", hash: to.hash, query: to.query, replace: true,
    })
  }
})
