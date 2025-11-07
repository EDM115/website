<template>
  <component :is="component" />
</template>

<script setup lang="ts">
definePageMeta({
  key: (currentRoute) => currentRoute.fullPath,
})

const route = useRoute()
const router = useRouter()
const component = shallowRef<Component | null>(null)

const rawPath = route.params.path
const pathSegments = Array.isArray(rawPath)
  ? rawPath
  : [rawPath]

function normalizeBlogGlobKey(path: string): string {
  const normalizedPath = path.replace(/\\/g, "/")
  const marker = "components/blog/"
  const markerIndex = normalizedPath.lastIndexOf(marker)
  const trimmed = markerIndex === -1
    ? normalizedPath
    : normalizedPath.slice(markerIndex + marker.length)

  return trimmed.replace(/\.md$/, "")
}

function resolveBlogComponentPath(segments: (string | undefined)[]): string | null {
  if (!segments.length) {
    return null
  }

  const filteredSegments = segments.filter((segment): segment is string => typeof segment === "string")

  if (filteredSegments.length >= 4) {
    const [ year, month, day, ...slugParts ] = filteredSegments

    if (!year || !month || !day) {
      return null
    }

    const normalizedMonth = month.padStart(2, "0")
    const normalizedDay = day.padStart(2, "0")
    const slug = slugParts.join("-")

    const filename = slug
      ? `${normalizedMonth}-${normalizedDay}-${slug}`
      : `${normalizedMonth}-${normalizedDay}`

    return `${year}/${filename}`
  }

  if (filteredSegments.length >= 2) {
    const [ year, ...rest ] = filteredSegments

    if (!year || !rest.length) {
      return null
    }

    return `${year}/${rest.join("/")}`
  }

  return filteredSegments[0] ?? null
}

function throwNotFound() {
  router.replace("/blog")
}

const blogPath = resolveBlogComponentPath(pathSegments)

if (!blogPath) {
  throwNotFound()
} else {
  type MarkdownModule = { "default": Component }

  const components = import.meta.glob<MarkdownModule>([ "~/components/blog/**/*.md", "!~/components/blog/telegram/**/*.md" ])

  const componentPath = Object.keys(components)
    .find((path) => normalizeBlogGlobKey(path) === blogPath)

  if (!componentPath) {
    throwNotFound()
  } else {
    const loader = components[componentPath]

    if (!loader) {
      throwNotFound()
    } else {
      const loadedModule = await loader()

      if (!loadedModule?.default) {
        throwNotFound()
      } else {
        component.value = loadedModule.default
      }
    }
  }
}
</script>
