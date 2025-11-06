export interface BlogPostMeta {
  id: string
  title: string
  description: string
  summary?: string
  date?: string
  publishedTime?: string
  tags?: string[]
  lang?: string
  path: string
  link: string
  excerpt: string
  isTelegram: boolean
}

export interface BlogFilters {
  search?: string
  tag?: string
  lang?: string
  before?: string
  after?: string
  at?: string
}

export interface PaginationInfo {
  page: number
  perPage: number
  total: number
  totalPages: number
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
  
  const pagination = computed<PaginationInfo>(() => ({
    page: currentPage.value,
    perPage: perPage.value,
    total: filteredPosts.value.length,
    totalPages: Math.ceil(filteredPosts.value.length / perPage.value),
  }))
  
  // Load posts from static JSON
  const loadPosts = async () => {
    loading.value = true
    error.value = null
    
    try {
      const endpoint = isTelegram ? "/api/telegram-posts.json" : "/api/blog-posts.json"
      const response = await fetch(endpoint)
      
      if (!response.ok) {
        throw new Error(`Failed to load posts: ${response.statusText}`)
      }
      
      allPosts.value = await response.json()
      applyFilters()
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to load posts"
      console.error("Error loading posts:", e)
    }
    finally {
      loading.value = false
    }
  }
  
  // Apply filters to posts
  const applyFilters = () => {
    let posts = [...allPosts.value]
    
    // Search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      const exactSearch = searchLower.startsWith("\"") && searchLower.endsWith("\"")
      const searchTerm = exactSearch ? searchLower.slice(1, -1) : searchLower
      
      posts = posts.filter(post => {
        const searchableText = [
          post.title,
          post.excerpt,
          post.description,
          post.summary,
        ].join(" ").toLowerCase()
        
        if (exactSearch) {
          return searchableText.includes(searchTerm)
        }
        
        // Fuzzy search: split into words and check each
        const words = searchTerm.split(/\s+/).filter(w => w.length > 2) // Omit basic words (< 3 chars)
        return words.some(word => searchableText.includes(word))
      })
    }
    
    // Tag filter
    if (filters.value.tag) {
      posts = posts.filter(post => post.tags?.includes(filters.value.tag!))
    }
    
    // Language filter
    if (filters.value.lang) {
      posts = posts.filter(post => post.lang === filters.value.lang)
    }
    
    // Date filters
    if (filters.value.at) {
      posts = posts.filter(post => post.date?.startsWith(filters.value.at!))
    }
    
    if (filters.value.before) {
      posts = posts.filter(post => post.date && post.date < filters.value.before!)
    }
    
    if (filters.value.after) {
      posts = posts.filter(post => post.date && post.date > filters.value.after!)
    }
    
    filteredPosts.value = posts
    applyPagination()
  }
  
  // Apply pagination
  const applyPagination = () => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    paginatedPosts.value = filteredPosts.value.slice(start, end)
  }
  
  // Update filters
  const setFilters = (newFilters: Partial<BlogFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1 // Reset to first page when filters change
    applyFilters()
  }
  
  // Clear filters
  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    applyFilters()
  }
  
  // Change page
  const setPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      currentPage.value = page
      applyPagination()
    }
  }
  
  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return !!(
      filters.value.search ||
      filters.value.tag ||
      filters.value.lang ||
      filters.value.before ||
      filters.value.after ||
      filters.value.at
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
    setFilters,
    clearFilters,
    setPage,
  }
}
