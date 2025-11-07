import type {
  BlogPostMeta,
  BlogFilters,
  PaginationInfo,
} from "~/types"

import blogPosts from "~/assets/data/blog-posts.json"
import telegramPosts from "~/assets/data/telegram-posts.json"

export function useBlogPosts(isTelegram = false) {
  const allPosts = ref<BlogPostMeta[]>([])
  const filteredPosts = ref<BlogPostMeta[]>([])
  const paginatedPosts = ref<BlogPostMeta[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const filters = ref<BlogFilters>({})
  const currentPage = ref(1)
  const perPage = ref(10)

  const postsJSONPath = isTelegram
    ? "~/assets/data/telegram-posts.json"
    : "~/assets/data/blog-posts.json"

  const pagination = computed<PaginationInfo>(() => ({
    page: currentPage.value,
    perPage: perPage.value,
    total: filteredPosts.value.length,
    totalPages: Math.ceil(filteredPosts.value.length / perPage.value),
  }))

  async function loadPosts() {
    loading.value = true
    error.value = null

    try {
      allPosts.value = isTelegram
        ? telegramPosts
        : blogPosts
      applyFilters()
    } catch (e) {
      error.value = e instanceof Error
        ? e.message
        : "Failed to load posts"
      console.error("Error loading posts :", e)
    } finally {
      loading.value = false
    }
  }

  function applyFilters() {
    let posts = [...allPosts.value]

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      const exactSearch = searchLower.startsWith("\"") && searchLower.endsWith("\"")
      const searchTerm = exactSearch
        ? searchLower.slice(1, -1)
        : searchLower

      posts = posts.filter((post) => {
        const searchableText = [
          post.title,
          post.excerpt,
        ].join(" ")
          .toLowerCase()

        if (exactSearch) {
          return searchableText.includes(searchTerm)
        }

        // Fuzzy search : split into words and check each (omit words < 3 chars)
        const words = searchTerm.split(/\s+/)
          .filter((w) => w.length > 2)

        return words.some((word) => searchableText.includes(word))
      })
    }

    if (filters.value.tags?.length) {
      const searchTags = filters.value.tags.map((tag) => tag.toLowerCase())

      posts = posts.filter((post) => {
        if (!post.tags?.length) {
          return false
        }

        const postTags = new Set(post.tags.map((tag) => tag.toLowerCase()))

        return searchTags.some((tag) => postTags.has(tag))
      })
    }

    if (filters.value.at) {
      posts = posts.filter((post) => post.date?.startsWith(filters.value.at!))
    }

    if (filters.value.before) {
      posts = posts.filter((post) => post.date && post.date < filters.value.before!)
    }

    if (filters.value.after) {
      posts = posts.filter((post) => post.date && post.date > filters.value.after!)
    }

    filteredPosts.value = posts
    applyPagination()
  }

  function applyPagination() {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value

    paginatedPosts.value = filteredPosts.value.slice(start, end)
  }

  function setFilters(newFilters: Partial<BlogFilters> & { tag?: string | string[] }) {
    let nextFilters: BlogFilters = { ...filters.value }
    let searchWasUpdated = false

    if (Object.prototype.hasOwnProperty.call(newFilters, "search")) {
      const searchInput = (newFilters.search ?? "").toString()
      const parsed = parseBlogSearch(searchInput)

      nextFilters = {
        search: parsed.term,
        tags: parsed.filters.tags.length > 0
          ? parsed.filters.tags
          : undefined,
        before: parsed.filters.before,
        after: parsed.filters.after,
        at: parsed.filters.at,
      }
      searchWasUpdated = true
    }

    if (Object.prototype.hasOwnProperty.call(newFilters, "tags") && !searchWasUpdated) {
      const normalizedTags = normalizeTagsInput(newFilters.tags)

      nextFilters.tags = normalizedTags.length > 0
        ? normalizedTags
        : undefined
    }

    if (Object.prototype.hasOwnProperty.call(newFilters, "tag") && !searchWasUpdated) {
      const normalizedTags = normalizeTagsInput(newFilters.tag)

      nextFilters.tags = normalizedTags.length > 0
        ? normalizedTags
        : undefined
    }

    if (Object.prototype.hasOwnProperty.call(newFilters, "before") && !searchWasUpdated) {
      nextFilters.before = newFilters.before || undefined
    }

    if (Object.prototype.hasOwnProperty.call(newFilters, "after") && !searchWasUpdated) {
      nextFilters.after = newFilters.after || undefined
    }

    if (Object.prototype.hasOwnProperty.call(newFilters, "at") && !searchWasUpdated) {
      nextFilters.at = newFilters.at || undefined
    }

    if (searchWasUpdated) {
      const manualTags = normalizeTagsInput(newFilters.tag)
      const overrideTags = normalizeTagsInput(newFilters.tags)
      const mergedTags = mergeTags(nextFilters.tags, manualTags, overrideTags)

      nextFilters.tags = mergedTags.length > 0
        ? mergedTags
        : undefined

      if (Object.prototype.hasOwnProperty.call(newFilters, "before") && newFilters.before) {
        nextFilters.before = newFilters.before
      }

      if (Object.prototype.hasOwnProperty.call(newFilters, "after") && newFilters.after) {
        nextFilters.after = newFilters.after
      }

      if (Object.prototype.hasOwnProperty.call(newFilters, "at") && newFilters.at) {
        nextFilters.at = newFilters.at
      }
    }

    filters.value = nextFilters
    currentPage.value = 1
    applyFilters()
  }

  function clearFilters() {
    filters.value = {}
    currentPage.value = 1
    applyFilters()
  }

  function setPage(page: number) {
    if (page >= 1 && page <= pagination.value.totalPages) {
      currentPage.value = page
      applyPagination()
    }
  }

  const hasActiveFilters = computed(() => {
    return !!(
      filters.value.search
      || filters.value.tags?.length
      || filters.value.before
      || filters.value.after
      || filters.value.at
    )
  })

  return {
    posts: paginatedPosts,
    allPosts,
    filteredPosts,
    loading,
    error,
    filters: readonly(filters),
    pagination,
    hasActiveFilters,
    loadPosts,
    postsJSONPath,
    setFilters,
    clearFilters,
    setPage,
  }
}

function normalizeTagsInput(input: string | string[] | undefined): string[] {
  if (!input) {
    return []
  }

  const values = Array.isArray(input)
    ? input
    : input.split(",")

  return values.map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0)
}

function mergeTags(...tagGroups: Array<string[] | undefined>): string[] {
  const merged = new Set<string>()

  for (const group of tagGroups) {
    if (!group?.length) {
      continue
    }

    for (const tag of group) {
      merged.add(tag)
    }
  }

  return [...merged]
}
