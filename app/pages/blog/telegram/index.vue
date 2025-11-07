<template>
  <UiContainer>
    <h1>{{ t("telegram.title") }}</h1><br>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <UiSearchBar
      v-model="searchQuery"
      :placeholder="t('telegram.search_placeholder')"
      :has-filters="hasActiveFilters"
      :is-sticky="hasActiveFilters"
      :has-clear-button="hasActiveFilters"
      :clear-text="t('telegram.clear_search')"
      :before="beforeFilter"
      :after="afterFilter"
      :at="atFilter"
      @update:before="updateFilter('before', $event)"
      @update:after="updateFilter('after', $event)"
      @update:at="updateFilter('at', $event)"
      @update:model-value="debouncedSearch"
      @clear="handleClearFilters"
    />

    <div
      v-if="loading"
      class="loading"
    >
      Loading...
    </div>

    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>

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
          <!-- eslint-disable vue/no-v-html -->
          <h3
            class="post-title"
            v-html="highlightText(post.title, searchQuery)"
          />
          <!-- eslint-enable vue/no-v-html -->
          <p
            v-if="post.date"
            class="post-date"
          >
            {{ formatDate(post.date) }}
          </p>
          <!-- eslint-disable vue/no-v-html -->
          <p
            class="post-excerpt"
            v-html="highlightText(post.excerpt, searchQuery)"
          />
          <!-- eslint-enable vue/no-v-html -->
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

    <div
      v-else
      class="no-results"
    >
      {{ t("telegram.no_results") }}
    </div>

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
const route = useRoute()
const router = useRouter()

const { t } = useI18n()

useHead({
  title: t("telegram.head"),
  meta: [
    {
      name: "og:title",
      content: t("telegram.head"),
    },
  ],
})

const {
  posts,
  loading,
  error,
  pagination,
  hasActiveFilters,
  loadPosts,
  postsJSONPath,
  setFilters,
  clearFilters,
  setPage,
} = useBlogPosts(true)

const searchQuery = ref((route.query.search as string) || "")
const beforeFilter = ref((route.query.before as string) || undefined)
const afterFilter = ref((route.query.after as string) || undefined)
const atFilter = ref((route.query.at as string) || undefined)

onMounted(async () => {
  await loadPosts()

  const urlFilters: Record<string, string> = {}

  if (route.query.search) {
    urlFilters.search = route.query.search as string
  }

  if (route.query.tag) {
    urlFilters.tag = route.query.tag as string
  }

  if (route.query.before) {
    urlFilters.before = route.query.before as string
  }

  if (route.query.after) {
    urlFilters.after = route.query.after as string
  }

  if (route.query.at) {
    urlFilters.at = route.query.at as string
  }

  if (Object.keys(urlFilters).length > 0) {
    setFilters(urlFilters)
  }

  if (route.query.page) {
    setPage(Number.parseInt(route.query.page as string) || 1)
  }
})

function updateFilter(filterName: string, value: string) {
  if (filterName === "before") {
    beforeFilter.value = value || undefined
  } else if (filterName === "after") {
    afterFilter.value = value || undefined
  } else if (filterName === "at") {
    atFilter.value = value || undefined
  }

  setFilters({ [filterName]: value })
  updateURL()
}

let searchTimeout: NodeJS.Timeout | null = null

function debouncedSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    setFilters({ search: searchQuery.value })
    updateURL()
  }, 300)
}

function updateURL() {
  const query: Record<string, string> = {}

  if (pagination.value.page > 1) {
    query.page = pagination.value.page.toString()
  }

  if (searchQuery.value) {
    query.search = searchQuery.value
  }

  router.push({ query })
}

function goToPage(page: number) {
  setPage(page)
  updateURL()
  window.scrollTo({
    top: 0, behavior: "smooth",
  })
}

function handleClearFilters() {
  searchQuery.value = ""
  beforeFilter.value = undefined
  afterFilter.value = undefined
  atFilter.value = undefined
  clearFilters()
  router.push({ query: {} })
}

function highlightText(text: string, searchTerm: string) {
  if (!searchTerm || !text) {
    return text
  }

  const exactSearch = searchTerm.startsWith("\"") && searchTerm.endsWith("\"")
  const term = exactSearch
    ? searchTerm.slice(1, -1)
    : searchTerm

  if (exactSearch) {
    const regex = new RegExp(`(${term})`, "gi")

    return text.replace(regex, "<mark>$1</mark>")
  }

  // Fuzzy search highlighting, highlight individual words
  const words = term.split(/\s+/)
    .filter((w) => w.length > 2)
  let highlighted = text

  for (const word of words) {
    const regex = new RegExp(`(${word})`, "gi")

    highlighted = highlighted.replace(regex, "<mark>$1</mark>")
  }

  return highlighted
}

function formatDate(dateStr: string) {
  if (!dateStr) {
    return ""
  }

  const date = new Date(dateStr)

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
</script>

<style scoped lang="scss">
.loading,
.no-results,
.error {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}

.error {
  color: var(--error);
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.blog-post {
  border: 1px solid color-mix(in srgb, var(--text) 15%, transparent);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 4px 16px color-mix(in srgb, var(--primary) 20%, transparent);
    transform: translateY(-2px);
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
  color: var(--text);
}

.post-date {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.post-excerpt {
  margin: 0 0 1rem 0;
  line-height: 1.6;
  color: var(--text);
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: color-mix(in srgb, var(--primary) 25%, transparent);
  }
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
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--text-muted);
}

mark {
  background-color: var(--warning);
  color: var(--text-dark);
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}
</style>
