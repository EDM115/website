<template>
  <component :is="component" />
</template>

<script setup lang="ts">
import type {
  BlogPostMeta,
  MarkdownModule,
} from "~/types"
import blogPosts from "~/assets/data/blog-posts.json"
import telegramPosts from "~/assets/data/telegram-posts.json"

import { Temporal } from "temporal-polyfill"

const props = defineProps<{
  isTelegram: boolean;
}>()

const route = useRoute()
const router = useRouter()
const component = shallowRef<Component | null>(null)
const blogDrtState = useState<{
  publishedTime: string;
  readingTime: string;
} | null>("blog-drt", () => null)

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function extractMetaString(meta: unknown, key: string): string | null {
  if (!Array.isArray(meta)) {
    return null
  }

  for (const entry of meta) {
    if (!isRecord(entry)) {
      continue
    }

    const name = typeof entry.name === "string"
      ? entry.name.trim()
          .toLowerCase()
      : ""

    if (name !== key.trim()
      .toLowerCase()) {
      continue
    }

    const content = entry.content

    if (typeof content === "string") {
      return content
    }

    if (content instanceof Date) {
      return content.toISOString()
    }

    if (
      typeof content === "number"
      || typeof content === "bigint"
      || typeof content === "boolean"
    ) {
      return String(content)
    }
  }

  return null
}

function extractDrtMeta(loadedModule: unknown): {
  publishedTime: string;
  readingTime: string;
} | null {
  if (!isRecord(loadedModule)) {
    return null
  }

  const meta = loadedModule.meta
  const publishedTime = extractMetaString(meta, "article:published_time")
  const readingTime = extractMetaString(meta, "reading_time")

  if (!publishedTime || !readingTime) {
    return null
  }

  return {
    publishedTime,
    readingTime,
  }
}

async function redirectToSearch(searchQuery: string) {
  const basePath = props.isTelegram
    ? "/blog/telegram"
    : "/blog"
  const trimmedSearch = searchQuery.trim()

  await navigateTo({
    path: basePath,
    query: trimmedSearch
      ? {
          search: trimmedSearch,
        }
      : {},
  }, {
    redirectCode: 301,
    replace: true,
  })
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
  return Temporal.PlainDate.from({
    year,
    month,
    day: 1,
  }).daysInMonth
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
    return `at:${year}`
  }

  const month = parsePositiveInt(segments[1])

  if (month === null || month < 1 || month > 12) {
    return null
  }

  if (segments.length === 2) {
    return `at:${formatYearMonth(year, month)}`
  }

  const day = parsePositiveInt(segments[2])

  if (day === null || day < 1 || day > getDaysInMonth(year, month)) {
    return null
  }

  return `at:${formatFullDate({
    year, month, day,
  })}`
}

async function initialize(): Promise<boolean> {
  blogDrtState.value = null

  if (normalizedSegments.length < 4) {
    const searchQuery = buildSearchQuery(normalizedSegments)

    if (!searchQuery) {
      throwNotFound()

      return false
    }

    await redirectToSearch(searchQuery)

    return false
  }

  const blogPath = resolveBlogComponentPath(normalizedSegments)

  if (!blogPath) {
    throwNotFound()

    return false
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

    return false
  }

  const loader = components[componentPath]

  if (!loader) {
    throwNotFound()

    return false
  }

  const loadedModule = await loader()

  if (!loadedModule?.default) {
    throwNotFound()

    return false
  }

  blogDrtState.value = extractDrtMeta(loadedModule)

  component.value = loadedModule.default

  return true
}

const shouldApplySeo = await initialize()

const blogData = props.isTelegram
  ? telegramPosts as BlogPostMeta[]
  : blogPosts as BlogPostMeta[]

const currentPost = shouldApplySeo
  ? blogData.find((post) => post.link === route.path)
  : undefined

if (shouldApplySeo && currentPost) {
  useSeoMeta({
    ogTitle: currentPost.title,
    ogDescription: currentPost.excerpt,
    ogType: "article",
    articleTag: currentPost.tags,
  })

  if (import.meta.server) {
    defineOgImage("SystemOgImageTakumi", {
      title: currentPost.title,
      description: currentPost.excerpt,
      path: route.path,
    })
  }
}
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css");
</style>
