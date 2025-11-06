<template>
  <UiContainer>
    <h1>{{ t("telegram.title") }}</h1><br>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <!-- Search Bar -->
    <div
      class="search-container"
      :class="{ 'has-filters': hasActiveFilters }"
    >
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('telegram.search_placeholder')"
        class="search-input"
        @input="debouncedSearch"
      >
      <button
        v-if="hasActiveFilters"
        class="clear-search sticky-clear"
        @click="handleClearFilters"
      >
        {{ t("telegram.clear_search") }}
      </button>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <!-- Telegram Posts List -->
    <div
      v-else-if="posts.length"
      class="blog-list"
    >
      <article
        v-for="post in posts"
        :key="post.id"
        class="blog-post"
      >
        <NuxtLink
          :to="post.link"
          class="post-link"
        >
          <h3
            class="post-title"
            v-html="highlightText(post.title, searchQuery)"
          />
          <p
            v-if="post.date"
            class="post-date"
          >
            {{ formatDate(post.date) }}
          </p>
          <p
            class="post-excerpt"
            v-html="highlightText(post.excerpt, searchQuery)"
          />
          <div
            v-if="post.tags && post.tags.length"
            class="post-tags"
          >
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="tag"
            >{{ tag }}</span>
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- No Results -->
    <div
      v-else
      class="no-results"
    >
      {{ t("telegram.no_results") }}
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination.totalPages > 1"
      class="pagination"
    >
      <button
        :disabled="pagination.page === 1"
        class="pagination-btn"
        @click="goToPage(pagination.page - 1)"
      >
        Previous
      </button>
      <span class="pagination-info">
        Page {{ pagination.page }} of {{ pagination.totalPages }}
      </span>
      <button
        :disabled="pagination.page === pagination.totalPages"
        class="pagination-btn"
        @click="goToPage(pagination.page + 1)"
      >
        Next
      </button>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

useHead({
  title: t("telegram.head"),
  meta: [
    {
      name: "og:title",
      content: t("telegram.head"),
    },
  ],
})

// Use the blog posts composable for telegram
const {
  posts,
  loading,
  error,
  pagination,
  hasActiveFilters,
  loadPosts,
  setFilters,
  clearFilters,
  setPage,
} = useBlogPosts(true)

// Local search query for reactive input
const searchQuery = ref((route.query.search as string) || "")

// Initialize from URL params
onMounted(async () => {
  await loadPosts()
  
  // Apply filters from URL
  const urlFilters: any = {}
  if (route.query.search) {urlFilters.search = route.query.search as string}
  if (route.query.tag) {urlFilters.tag = route.query.tag as string}
  if (route.query.lang) {urlFilters.lang = route.query.lang as string}
  if (route.query.before) {urlFilters.before = route.query.before as string}
  if (route.query.after) {urlFilters.after = route.query.after as string}
  if (route.query.at) {urlFilters.at = route.query.at as string}
  
  if (Object.keys(urlFilters).length > 0) {
    setFilters(urlFilters)
  }
  
  if (route.query.page) {
    setPage(Number.parseInt(route.query.page as string) || 1)
  }
})

// Debounce search
let searchTimeout: NodeJS.Timeout | null = null
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    setFilters({ search: searchQuery.value })
    updateURL()
  }, 300)
}

// Update URL without reload
const updateURL = () => {
  const query: Record<string, string> = {}
  if (pagination.value.page > 1) {query.page = pagination.value.page.toString()}
  if (searchQuery.value) {query.search = searchQuery.value}

  router.push({ query })
}

// Navigate to page
const goToPage = (page: number) => {
  setPage(page)
  updateURL()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Clear all filters
const handleClearFilters = () => {
  searchQuery.value = ""
  clearFilters()
  router.push({ query: {} })
}

// Highlight search terms in text
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm || !text) {return text}
  
  const exactSearch = searchTerm.startsWith("\"") && searchTerm.endsWith("\"")
  const term = exactSearch ? searchTerm.slice(1, -1) : searchTerm
  
  if (exactSearch) {
    // Exact match highlighting
    const regex = new RegExp(`(${term})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }
  
  // Fuzzy search highlighting - highlight individual words
  const words = term.split(/\s+/).filter(w => w.length > 2)
  let highlighted = text
  for (const word of words) {
    const regex = new RegExp(`(${word})`, "gi")
    highlighted = highlighted.replace(regex, "<mark>$1</mark>")
  }
  return highlighted
}

// Format date
const formatDate = (dateStr: string) => {
  if (!dateStr) {return ""}
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  position: relative;
}

.search-container.has-filters {
  position: sticky;
  top: 1rem;
  z-index: 100;
  background: var(--color-background);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--color-background);
  color: var(--color-text);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
}

.clear-search {
  padding: 0.75rem 1.5rem;
  background: var(--color-error);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.loading,
.no-results,
.error {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary);
}

.error {
  color: var(--color-error);
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-post {
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.post-date {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.post-excerpt {
  margin: 0 0 1rem 0;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

mark {
  background-color: yellow;
  color: black;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
}
</style>
