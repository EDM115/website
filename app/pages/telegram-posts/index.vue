<template>
  <UiContainer>
    <h1>{{ t("telegram.title") }}</h1><br>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <!-- Search Bar -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('telegram.search_placeholder')"
        class="search-input"
        @input="debouncedSearch"
      >
      <button
        v-if="hasActiveFilters"
        class="clear-search"
        @click="clearFilters"
      >
        {{ t("telegram.clear_search") }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="loading">
      Loading...
    </div>

    <!-- Telegram Posts List -->
    <div v-else-if="data?.posts.length" class="blog-list">
      <article
        v-for="post in data.posts"
        :key="post.id"
        class="blog-post"
      >
        <NuxtLink :to="post.link" class="post-link">
          <h3 class="post-title">{{ post.title }}</h3>
          <p v-if="post.date" class="post-date">{{ formatDate(post.date) }}</p>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div v-if="post.tags && post.tags.length" class="post-tags">
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
    <div v-else class="no-results">
      {{ t("telegram.no_results") }}
    </div>

    <!-- Pagination -->
    <div v-if="data && data.pagination.totalPages > 1" class="pagination">
      <button
        :disabled="currentPage === 1"
        class="pagination-btn"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>
      <span class="pagination-info">
        Page {{ currentPage }} of {{ data.pagination.totalPages }}
      </span>
      <button
        :disabled="currentPage === data.pagination.totalPages"
        class="pagination-btn"
        @click="goToPage(currentPage + 1)"
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

// Reactive state from URL params
const currentPage = ref(Number.parseInt(route.query.page as string) || 1)
const searchQuery = ref((route.query.search as string) || "")
const tagFilter = ref((route.query.tag as string) || "")
const langFilter = ref((route.query.lang as string) || "")
const beforeFilter = ref((route.query.before as string) || "")
const afterFilter = ref((route.query.after as string) || "")
const atFilter = ref((route.query.at as string) || "")

// Computed query params
const queryParams = computed(() => ({
  page: currentPage.value,
  perPage: 10,
  search: searchQuery.value,
  tag: tagFilter.value,
  lang: langFilter.value,
  before: beforeFilter.value,
  after: afterFilter.value,
  at: atFilter.value,
}))

// Fetch telegram posts
const { data, pending, refresh } = await useFetch("/api/telegram/posts", {
  query: queryParams,
  watch: [queryParams],
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return !!(searchQuery.value || tagFilter.value || langFilter.value || beforeFilter.value || afterFilter.value || atFilter.value)
})

// Debounce search
let searchTimeout: NodeJS.Timeout | null = null
const debouncedSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    updateURL()
  }, 300)
}

// Update URL without reload
const updateURL = () => {
  const query: Record<string, string> = {}
  if (currentPage.value > 1) query.page = currentPage.value.toString()
  if (searchQuery.value) query.search = searchQuery.value
  if (tagFilter.value) query.tag = tagFilter.value
  if (langFilter.value) query.lang = langFilter.value
  if (beforeFilter.value) query.before = beforeFilter.value
  if (afterFilter.value) query.after = afterFilter.value
  if (atFilter.value) query.at = atFilter.value

  router.push({ query })
}

// Navigate to page
const goToPage = (page: number) => {
  currentPage.value = page
  updateURL()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ""
  tagFilter.value = ""
  langFilter.value = ""
  beforeFilter.value = ""
  afterFilter.value = ""
  atFilter.value = ""
  currentPage.value = 1
  updateURL()
}

// Format date
const formatDate = (dateStr: string) => {
  if (!dateStr) return ""
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
.no-results {
  text-align: center;
  padding: 2rem;
  color: var(--color-text-secondary);
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
</style>
