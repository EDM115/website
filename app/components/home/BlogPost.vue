<template>
  <component :is="component" />
</template>

<script setup lang="ts">
import type { MarkdownModule } from "~/types"

const props = defineProps<{
  isTelegram: boolean;
}>()

const route = useRoute()
const router = useRouter()
const component = shallowRef<Component | null>(null)

const rawPath = route.params.path
const pathSegments = Array.isArray(rawPath)
  ? rawPath
  : [rawPath]

const normalizedSegments = pathSegments.filter((segment): segment is string => typeof segment === "string" && segment.length > 0)

function normalizeBlogGlobKey(path: string): string {
  const normalizedPath = path.replace(/\\/g, "/")
  const marker = props.isTelegram
    ? "components/blog/telegram/"
    : "components/blog/"
  const markerIndex = normalizedPath.lastIndexOf(marker)
  const trimmed = markerIndex === -1
    ? normalizedPath
    : normalizedPath.slice(markerIndex + marker.length)

  return trimmed.replace(/\.md$/, "")
}

function resolveBlogComponentPath(segments: string[]): string | null {
  if (segments.length >= 4) {
    const [ year, month, day, ...slugParts ] = segments

    if (!year || !month || !day) {
      return null
    }

    const normalizedMonth = pad(month)
    const normalizedDay = pad(day)
    const slug = slugParts.join("-")

    const filename = slug
      ? `${normalizedMonth}-${normalizedDay}-${slug}`
      : `${normalizedMonth}-${normalizedDay}`

    return `${year}/${filename}`
  }

  if (segments.length >= 2) {
    const [ year, ...rest ] = segments

    if (!year || !rest.length) {
      return null
    }

    return `${year}/${rest.join("/")}`
  }

  return segments[0] ?? null
}

function throwNotFound() {
  router.replace(props.isTelegram
    ? "/blog/telegram"
    : "/blog")
}

function redirectToSearch(searchQuery: string) {
  const basePath = props.isTelegram
    ? "/blog/telegram"
    : "/blog"
  const trimmedSearch = searchQuery.trim()

  router.push({
    path: basePath,
    query: trimmedSearch
      ? {
          search: trimmedSearch,
        }
      : {},
  })
}

function shiftMonth(year: number, month: number, delta: number): {
  year: number; month: number;
} {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1))

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
  }
}

function formatYearMonth(year: number, month: number): string {
  return `${year}-${pad(month)}`
}

function formatFullDate(parts: {
  year: number; month: number; day: number;
}): string {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0))
    .getUTCDate()
}

function parsePositiveInt(value: string | undefined): number | null {
  if (!value) {
    return null
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  const parsed = Number.parseInt(trimmed, 10)

  if (Number.isNaN(parsed) || parsed <= 0) {
    return null
  }

  return parsed
}

function pad(value: number | string): string {
  return value.toString()
    .padStart(2, "0")
}

function buildSearchQuery(segments: string[]): string | null {
  if (segments.length === 0) {
    return null
  }

  const year = parsePositiveInt(segments[0])

  if (year === null) {
    return null
  }

  if (segments.length === 1) {
    const parts: string[] = [`before:${year + 1}`]

    if (year > 1) {
      parts.push(`after:${year - 1}`)
    }

    return parts.join(" ")
  }

  const month = parsePositiveInt(segments[1])

  if (month === null || month < 1 || month > 12) {
    return null
  }

  if (segments.length === 2) {
    const nextMonth = shiftMonth(year, month, 1)
    const previousMonth = shiftMonth(year, month, -1)
    const parts: string[] = [`before:${formatYearMonth(nextMonth.year, nextMonth.month)}`]

    if (previousMonth.year > 0) {
      parts.push(`after:${formatYearMonth(previousMonth.year, previousMonth.month)}`)
    }

    return parts.join(" ")
  }

  const day = parsePositiveInt(segments[2])

  if (day === null || day < 1 || day > getDaysInMonth(year, month)) {
    return null
  }

  return `at:${formatFullDate({
    year, month, day,
  })}`
}

async function initialize() {
  if (normalizedSegments.length < 4) {
    const searchQuery = buildSearchQuery(normalizedSegments)

    if (!searchQuery) {
      throwNotFound()

      return
    }

    redirectToSearch(searchQuery)

    return
  }

  const blogPath = resolveBlogComponentPath(normalizedSegments)

  if (!blogPath) {
    throwNotFound()

    return
  }

  const components = props.isTelegram
    ? import.meta.glob<MarkdownModule>(["~/components/blog/telegram/**/*.md"])
    : import.meta.glob<MarkdownModule>([
        "~/components/blog/**/*.md",
        "!~/components/blog/telegram/**/*.md",
      ])

  const componentPath = Object.keys(components)
    .find((path) => normalizeBlogGlobKey(path) === blogPath)

  if (!componentPath) {
    throwNotFound()

    return
  }

  const loader = components[componentPath]

  if (!loader) {
    throwNotFound()

    return
  }

  const loadedModule = await loader()

  if (!loadedModule?.default) {
    throwNotFound()

    return
  }

  component.value = loadedModule.default
}

await initialize()

</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css");
</style>
