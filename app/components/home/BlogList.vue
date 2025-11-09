<template>
  <div>
    <UiSearchBar
      v-model="searchQuery"
      :placeholder="t(isTelegram ? 'blog.telegram.search_placeholder' : 'blog.search_placeholder')"
      :has-filters="hasActiveFilters"
      :is-sticky="hasActiveFilters"
      :has-clear-button="hasActiveFilters"
      :clear-text="t('blog.clear_search')"
      @update:model-value="debouncedSearch"
      @clear="handleClearFilters"
    />

    <div
      v-if="loading"
      class="loading"
    >
      {{ t("blog.loading") }}
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
      {{ t(isTelegram ? "blog.telegram.no_results" : "blog.no_results") }}
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
        {{ t("blog.nav.previous") }}
      </button>
      <span class="pagination-info">
        {{ t("blog.nav.range", { page: pagination.page, totalPages: pagination.totalPages }) }}
      </span>
      <button
        :disabled="pagination.page === pagination.totalPages"
        class="pagination-btn"
        @click="goToPage(pagination.page + 1)"
      >
        {{ t("blog.nav.next") }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isTelegram: boolean;
}>()

const route = useRoute()
const router = useRouter()

const {
  locale,
  t,
} = useI18n()

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
} = useBlogPosts(props.isTelegram)

const initialSearch = computed(() => buildSearchInputFromQuery(route.query as Record<string, string>))
const searchQuery = ref(initialSearch.value)

let searchTimeout: NodeJS.Timeout | null = null

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

function debouncedSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    setFilters({ search: searchQuery.value })
    updateURL()
  }, 200)
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
  clearFilters()
  router.push({ query: {} })
}

function highlightText(text: string, searchTerm: string) {
  if (!searchTerm || !text) {
    return text
  }

  const parsed = parseBlogSearch(searchTerm)
  const sanitizedTerm = parsed.term
  const trimmedTerm = sanitizedTerm.trim()

  if (!trimmedTerm) {
    return text
  }

  const exactSearch = trimmedTerm.startsWith("\"") && trimmedTerm.endsWith("\"") && trimmedTerm.length > 1
  const term = exactSearch
    ? trimmedTerm.slice(1, -1)
    : trimmedTerm

  if (exactSearch) {
    const regex = new RegExp(`(${term})`, "gi")

    return text.replace(regex, "<mark>$1</mark>")
  }

  // Fuzzy search highlighting - highlight individual words
  const tokens = term.match(/"[^"]+"|\S+/g) ?? []
  const words = tokens
    .map((token) => token.replaceAll("\"", ""))
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

  return date.toLocaleDateString(locale.value === "fr"
    ? "fr-FR"
    : "en-US", {
    day: "2-digit",
    weekday: "long",
    month: "long",
    year: "numeric",
  })
}

onMounted(async () => {
  await loadPosts()

  if (searchQuery.value) {
    setFilters({ search: searchQuery.value })
  }

  if (route.query.page) {
    setPage(Number.parseInt(route.query.page as string) || 1)
  }
})
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
  color: var(--bg);
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
  padding: 0 0.25rem;
  border-radius: 0.25rem;
}
</style>
