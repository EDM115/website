import type {
  BlogPostMeta,
  BlogFilters,
  DocfindModule,
  PaginationInfo,
  PagefindModule,
} from "~/types"

import blogPosts from "~/assets/data/blog-posts.json"
import telegramPosts from "~/assets/data/telegram-posts.json"

import { Temporal } from "temporal-polyfill"

const docfindCache = {
  blog: {
    mod: null as DocfindModule | null,
    initPromise: null as Promise<void> | null,
  },
  telegram: {
    mod: null as DocfindModule | null,
    initPromise: null as Promise<void> | null,
  },
}

const pagefindCache = {
  blog: {
    mod: null as PagefindModule | null,
    initPromise: null as Promise<void> | null,
  },
  telegram: {
    mod: null as PagefindModule | null,
    initPromise: null as Promise<void> | null,
  },
}

async function loadDocfindModule(isTelegram: boolean): Promise<DocfindModule | null> {
  if (!import.meta.client) {
    return null
  }

  const key = isTelegram
    ? "telegram"
    : "blog"
  const cached = docfindCache[key]

  if (cached.mod) {
    return cached.mod
  }

  const mod = isTelegram
    ? await import("~~/public/docfind/docfind_telegram.js")
    : await import("~~/public/docfind/docfind_blog.js")

  cached.mod = mod

  return cached.mod
}

async function ensureDocfindInit(isTelegram: boolean): Promise<DocfindModule | null> {
  const key = isTelegram
    ? "telegram"
    : "blog"
  const cached = docfindCache[key]

  const mod = await loadDocfindModule(isTelegram)

  if (!mod) {
    return null
  }

  if (!cached.initPromise) {
    cached.initPromise = mod.init()
  }

  await cached.initPromise

  return mod
}

async function loadPagefindModule(isTelegram: boolean): Promise<PagefindModule | null> {
  if (!import.meta.client) {
    return null
  }

  const key = isTelegram
    ? "telegram"
    : "blog"
  const cached = pagefindCache[key]

  if (cached.mod) {
    return cached.mod
  }

  const mod = await import("~~/public/pagefind/pagefind.js")

  cached.mod = mod

  return cached.mod
}

async function ensurePagefindInit(isTelegram: boolean): Promise<PagefindModule | null> {
  const key = isTelegram
    ? "telegram"
    : "blog"
  const cached = pagefindCache[key]

  const mod = await loadPagefindModule(isTelegram)

  if (!mod) {
    return null
  }

  if (!cached.initPromise) {
    cached.initPromise = Promise.resolve(mod.init())
  }

  await cached.initPromise

  return mod
}

export function useBlogPosts(isTelegram = false) {
  const allPosts = ref<BlogPostMeta[]>([])
  const filteredPosts = ref<BlogPostMeta[]>([])
  const paginatedPosts = ref<BlogPostMeta[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const filters = ref<BlogFilters>({})
  const currentPage = ref(1)
  const perPage = ref(10)
  const toComparableTimestampCache = new Map<string, number>()

  let postByLink = new Map<string, BlogPostMeta>()

  function rebuildPostIndex() {
    postByLink = new Map(allPosts.value.map((p) => [ p.link, p ]))
  }

  const docfindHrefOrder = ref<string[] | null>(null)
  const docfindTerm = ref<string>("")
  let docfindRunId = 0

  const pagefindHrefOrder = ref<string[] | null>(null)
  const pagefindTerm = ref<string>("")
  let pagefindRunId = 0

  const pagination = computed<PaginationInfo>(() => ({
    page: currentPage.value,
    perPage: perPage.value,
    total: filteredPosts.value.length,
    totalPages: Math.ceil(filteredPosts.value.length / perPage.value),
  }))

  function getDaysInMonth(year: number, month: number): number {
    return Temporal.PlainDate.from({
      year,
      month,
      day: 1,
    }).daysInMonth
  }

  function parseDateSegments(dateInput: string): {
    year: number; month: number; day: number;
  } | null {
    const match = dateInput.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/)

    if (!match) {
      return null
    }

    const year = Number.parseInt(match?.[1] ?? "0", 10)

    if (Number.isNaN(year)) {
      return null
    }

    const month = match[2] !== undefined
      ? Number.parseInt(match[2], 10)
      : 1
    const day = match[3] !== undefined
      ? Number.parseInt(match[3], 10)
      : 1

    if (Number.isNaN(month) || month < 1 || month > 12) {
      return null
    }

    const maxDay = getDaysInMonth(year, month)

    if (Number.isNaN(day) || day < 1 || day > maxDay) {
      return null
    }

    return {
      year,
      month,
      day,
    }
  }

  function toComparableTimestamp(dateInput: string): number | null {
    const key = dateInput.trim()

    if (!key) {
      return null
    }

    const cached = toComparableTimestampCache.get(key)

    if (cached !== undefined) {
      return Number.isNaN(cached)
        ? null
        : cached
    }

    const segments = parseDateSegments(key)

    if (!segments) {
      toComparableTimestampCache.set(key, Number.NaN)

      return null
    }

    const timestamp = Temporal.PlainDate.from({
      year: segments.year,
      month: segments.month,
      day: segments.day,
    })
      .toZonedDateTime({
        timeZone: "UTC",
        plainTime: Temporal.PlainTime.from("00:00"),
      }).epochMilliseconds

    toComparableTimestampCache.set(key, timestamp)

    return timestamp
  }

  function applyPagination() {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value

    paginatedPosts.value = filteredPosts.value.slice(start, end)
  }

  async function refreshDocfindMatches(term: string) {
    const normalized = term.trim()

    docfindTerm.value = normalized

    if (!import.meta.client || normalized.length < 3) {
      docfindHrefOrder.value = null

      return
    }

    const runId = ++docfindRunId
    const mod = await ensureDocfindInit(isTelegram)

    // If docfind fails to load/init, gracefully fall back to the old search
    if (!mod) {
      docfindHrefOrder.value = null

      return
    }

    const results = await Promise.resolve(mod.default(normalized))

    // avoid out-of-order writes when typing fast
    if (runId !== docfindRunId) {
      return
    }

    docfindHrefOrder.value = results
      .map((r) => r?.href)
      .filter((href): href is string => Boolean(href))
  }

  async function refreshPagefindMatches(term: string, tagFilters?: string[]) {
    const normalized = term.trim()

    pagefindTerm.value = normalized

    if (!import.meta.client || normalized.length < 3) {
      pagefindHrefOrder.value = null

      return
    }

    const runId = ++pagefindRunId
    const mod = await ensurePagefindInit(isTelegram)

    if (!mod) {
      pagefindHrefOrder.value = null

      return
    }

    const originFilter = isTelegram
      ? "telegram"
      : "blog"
    const mergedFilters = {
      origin: [originFilter],
      ...(tagFilters?.length
        ? { tags: tagFilters }
        : {}),
    }
    const results = await mod.search(normalized, mergedFilters
      ? { filters: mergedFilters }
      : undefined)

    if (runId !== pagefindRunId) {
      return
    }

    const urls = await Promise.all((results.results ?? []).map(async (result) => {
      try {
        const data = await result.data()

        return data.raw_url
      } catch {
        return undefined
      }
    }))

    pagefindHrefOrder.value = urls
      .filter((href): href is string => Boolean(href))
  }

  function applyFilters() {
    let posts = [...allPosts.value]
    const beforeTimestamp = filters.value.before
      ? toComparableTimestamp(filters.value.before)
      : null
    const afterTimestamp = filters.value.after
      ? toComparableTimestamp(filters.value.after)
      : null

    if (filters.value.search && filters.value.search.length >= 3) {
      const basePosts = posts
      const searchLower = filters.value.search.toLowerCase()
      // If docfind results correspond to the current term, use them
      const docfindReadyForThisTerm
        = docfindHrefOrder.value?.length
          && docfindTerm.value.trim()
            .toLowerCase() === searchLower.trim()
      // If pagefind results correspond to the current term, use them
      const pagefindReadyForThisTerm
        = pagefindHrefOrder.value?.length
          && pagefindTerm.value.trim()
            .toLowerCase() === searchLower.trim()

      const exactSearch = searchLower.startsWith("\"") && searchLower.endsWith("\"")
      const searchTerm = exactSearch
        ? searchLower.slice(1, -1)
        : searchLower

      const fallbackMatches = basePosts.filter((post) => {
        const searchableText = [
          post.title,
          post.excerpt,
        ].join(" ")
          .toLowerCase()

        if (exactSearch) {
          return searchableText.includes(searchTerm)
        }

        // Fuzzy search : split into words and check each
        const words = searchTerm.split(/\s+/)

        return words.some((word) => searchableText.includes(word))
      })

      if (docfindReadyForThisTerm || pagefindReadyForThisTerm) {
        const ordered: BlogPostMeta[] = []
        const seen = new Set<string>()

        if (pagefindReadyForThisTerm) {
          for (const href of pagefindHrefOrder.value ?? []) {
            const post = postByLink.get(href)

            if (post && !seen.has(post.link)) {
              seen.add(post.link)
              ordered.push(post)
            }
          }
        }

        if (docfindReadyForThisTerm) {
          for (const href of docfindHrefOrder.value ?? []) {
            const post = postByLink.get(href)

            if (post && !seen.has(post.link)) {
              seen.add(post.link)
              ordered.push(post)
            }
          }
        }

        const merged: BlogPostMeta[] = [...ordered]

        for (const p of fallbackMatches) {
          if (!seen.has(p.link)) {
            seen.add(p.link)
            merged.push(p)
          }
        }

        posts = merged
      } else {
        posts = fallbackMatches
      }
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
      posts = posts.filter((post) => post.date?.startsWith(filters.value.at ?? ""))
    }

    if (beforeTimestamp !== null || afterTimestamp !== null) {
      posts = posts.filter((post) => {
        if (!post.date) {
          return false
        }

        const postTimestamp = toComparableTimestamp(post.date)

        if (postTimestamp === null) {
          return false
        }

        if (beforeTimestamp !== null && postTimestamp >= beforeTimestamp) {
          return false
        }

        if (afterTimestamp !== null && postTimestamp <= afterTimestamp) {
          return false
        }

        return true
      })
    }

    filteredPosts.value = posts
    applyPagination()
  }

  function normalizeTagsInput(input: string | string[] | undefined): string[] {
    if (!input) {
      return []
    }

    const values = Array.isArray(input)
      ? input
      : input.split(",")

    return values.map((tag) => tag.trim()
      .toLowerCase())
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

  // skipcq: JS-R1005
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

    // If the search term changed, refresh docfind and pagefind results async, then apply filters
    if (searchWasUpdated) {
      void Promise.all([
        refreshDocfindMatches(filters.value.search ?? ""),
        refreshPagefindMatches(filters.value.search ?? "", filters.value.tags),
      ])
        .finally(() => applyFilters())

      return
    }

    applyFilters()
  }

  function clearFilters() {
    filters.value = {}
    currentPage.value = 1
    docfindHrefOrder.value = null
    docfindTerm.value = ""
    pagefindHrefOrder.value = null
    pagefindTerm.value = ""
    applyFilters()
  }

  function setPage(page: number) {
    if (page >= 1 && page <= pagination.value.totalPages) {
      currentPage.value = page
      applyPagination()
    }
  }

  const hasActiveFilters = computed(() => {
    return Boolean(filters.value.search
      || filters.value.tags?.length
      || filters.value.before
      || filters.value.after
      || filters.value.at)
  })

  async function loadPosts() {
    loading.value = true
    error.value = null

    try {
      allPosts.value = isTelegram
        ? telegramPosts
        : blogPosts
      rebuildPostIndex()

      // Warm up docfind and pagefind in the background
      if (import.meta.client) {
        void ensureDocfindInit(isTelegram)
        void ensurePagefindInit(isTelegram)
      }

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
    setFilters,
    clearFilters,
    setPage,
  }
}
