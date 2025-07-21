<template>
  <v-container class="d-flex flex-column align-center">
    <div
      v-if="loading"
      class="loading"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      />
      <span class="ml-2">Loading README...</span>
    </div>

    <div
      v-else-if="error"
      class="error"
    >
      <v-alert
        type="error"
        :text="error"
      />
    </div>

    <template v-else-if="renderedContent">
      <Suspense>
        <template #fallback>
          <div class="loading">
            <v-progress-circular
              indeterminate
              color="primary"
            />
            <span class="ml-2">Rendering README...</span>
          </div>
        </template>
        <template #default>
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="markdown-body"
            v-html="renderedContent"
          />
          <!-- eslint-enable vue/no-v-html -->
        </template>
      </Suspense>
    </template>

    <div
      v-else
      class="no-content"
    >
      <v-alert
        type="info"
        text="No README found for this repository."
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import mdiLinkVariant from "~icons/mdi/linkVariant?raw"

import slugify from "@sindresorhus/slugify"
import hljs from "highlight.js"
import MarkdownIt from "markdown-it"
import mditAnchor from "markdown-it-anchor"
import mditAttrs from "markdown-it-attrs"
import mditHljs from "markdown-it-highlightjs"
import mditLinkAttributes from "markdown-it-link-attributes"

import { cleanMarkdown } from "~/composables/useCleanMarkdown"
import { useCopyCode } from "~/composables/useCopyCode"
import { useCopySlug } from "~/composables/useCopySlug"

import { full as emoji } from "markdown-it-emoji"
import { alert } from "@mdit/plugin-alert"
import { imgLazyload } from "@mdit/plugin-img-lazyload"
import { imgSize } from "@mdit/plugin-img-size"
import { spoiler } from "@mdit/plugin-spoiler"
import { tab } from "@mdit/plugin-tab"
import { tasklist } from "@mdit/plugin-tasklist"

interface Props {
  name: string
  branch?: string
}

const props = defineProps<Props>()

const { t } = useI18n()

const loading = ref(false)
const error = ref<string | null>(null)
const markdownContent = ref<string>("")

const md = new MarkdownIt({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
})
  .use(mditHljs, {
    hljs,
    inline: true,
  })
  .use(mditAnchor, {
    slugify: (s) => slugify(s),
    permalink: mditAnchor.permalink.headerLink(),
    permalinkClass: "header-link",
  })
  .use(emoji)
  .use(mditAttrs)
  .use(mditLinkAttributes, {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
    matcher(href: string, _config: unknown) {
      return !href.startsWith("#")
    },
  })
  .use(alert, { deep: true })
  .use(imgLazyload)
  .use(imgSize)
  .use(spoiler)
  .use(tab, {
    name: "tabs",
  })
  .use(tasklist)

md.core.ruler.push("heading_copy_icon", (state) => {
  const { tokens } = state

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i]?.type === "heading_open") {
      const inline = tokens[i + 1]
      const id = tokens[i]?.attrGet("id")

      const html = `
        <span
          class="header-copy-icon"
          role="button"
          data-slug="${id}"
        >
          ${mdiLinkVariant}
        </span>
      `.trim()

      const newToken = new state.Token("html_inline", "", 0)

      newToken.content = html
      inline?.children?.unshift(newToken)
    }
  }
})

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]!
  const langName = token.info.trim()
  const isSupported = hljs.getLanguage(langName)

  const highlightedCode = isSupported
    ? hljs.highlight(token.content, { language: langName }).value
    : hljs.highlightAuto(token.content).value

  return `
    <div class='code-block'>
      <div class='code-block-header'>
        <span class='code-block-lang'>${langName || "plaintext"}</span>
        <button class='copy-code-button'>
          Copy
        </button>
      </div>
      <pre><code class='hljs ${langName}'>${highlightedCode}</code></pre>
    </div>
  `
}

const renderedContent = computed(() => {
  if (!markdownContent.value) {
    return ""
  }

  return md.render(markdownContent.value)
})

async function fetchReadme() {
  if (!props.name) {
    return
  }

  loading.value = true
  error.value = null
  markdownContent.value = ""
  let branch = props.branch || "master"

  try {
    const { data } = await useFetch<string>(`https://raw.githubusercontent.com/${props.name}/${branch}/README.md`, {
      retry: 1,
    })

    markdownContent.value = cleanMarkdown(data.value ?? "", props.name, branch)
    loading.value = false
  } catch (fetchError) {
    branch = "main"

    try {
      const { data } = await useFetch<string>(`https://raw.githubusercontent.com/${props.name}/${branch}/README.md`, {
        retry: 1,
      })

      markdownContent.value = cleanMarkdown(data.value ?? "", props.name, branch)
      loading.value = false
    } catch (secondError) {
      branch = ""
      console.error("Failed to fetch README :", secondError)
      error.value = `Failed to fetch README for ${props.name}. Repository may not exist or README.md may not be available.`
      loading.value = false
    }
  }
}

async function getRepoDetails() {
  if (!props.name) {
    return null
  }

  try {
    const { data } = await useFetch<{ full_name: string; description?: string }>(`https://api.github.com/repos/${props.name}`, {
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    if (!data.value) {
      throw new Error("Repository not found")
    }

    if (!data.value.full_name) {
      throw new Error("Repository not found")
    }

    return {
      name: data.value.full_name,
      description: data.value.description || "",
    }
  } catch (error) {
    console.error("Failed to fetch repository details :", error)

    return null
  }
}

const head = useHead({
  title: `EDM115 - ${t("projects.project")} ${props.name}`,
  meta: [
    {
      name: "og:title",
      content: `EDM115 - ${t("projects.project")} ${props.name}`,
    },
  ],
})

await fetchReadme()
const repoDetails = await getRepoDetails()

useCopySlug()
useCopyCode()

if (repoDetails) {
  head.patch({
    title: `EDM115 - ${t("projects.project")} ${repoDetails.name}`,
    meta: [
      {
        name: "description",
        content: repoDetails.description || `No description available for ${repoDetails.name}`,
      },
      {
        name: "og:title",
        content: `EDM115 - ${t("projects.project")} ${repoDetails.name}`,
      },
      {
        name: "og:description",
        content: repoDetails.description || `No description available for ${repoDetails.name}`,
      },
    ],
  })
}

watch(() => props.name, fetchReadme, { immediate: true })
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(var(--v-theme-on-surface));
}

.error,
.no-content {
  margin: 1rem 0;
}

.markdown-body {
  width: 100%;
}
</style>
