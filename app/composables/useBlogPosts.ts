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

    if (filters.value.tag) {
      posts = posts.filter((post) => post.tags?.includes(filters.value.tag!))
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

  function setFilters(newFilters: Partial<BlogFilters>) {
    filters.value = {
      ...filters.value, ...newFilters,
    }
    // Reset to first page when filters change
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
      || filters.value.tag
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
