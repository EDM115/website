export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.endsWith(".html")) {
    return navigateTo(to.path.replace(".html", ""))
  }

  const router = useRouter()
  const routeExists = router.getRoutes().some((route) => route.path === to.path)

  if (!routeExists) {
    const oldSubdomainRoutes = [
      "/ludivine.mp4",
      "/underrated",
      "/hugo",
      "/external-mods",
      "/external-mods/README.txt",
      "/cv",
      "/cv2",
      "/assets",
      "/.well-known",
      "/planparfait",
      "/socials",
      "/sporttrack",
      "/unzip",
      "/robots.txt",
    ]

    if (oldSubdomainRoutes.some((route) => to.path.startsWith(route))) {
      return navigateTo(`https://old.edm115.dev${to.fullPath}`, { external: true })
    }
  }
})
