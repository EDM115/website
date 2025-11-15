<template>
  <UiContainer style="align-items: center; display: flex; flex-direction: column;">
    <div
      v-if="pending"
      class="loading"
    >
      <UiProgressCircular
        indeterminate
        color="primary"
      />
      <span style="margin-left: 8px;">Loading README...</span>
    </div>

    <div
      v-else-if="error"
      class="error"
    >
      <UiAlert
        type="error"
        :text="error.message"
      />
    </div>

    <!-- eslint-disable vue/no-v-html -->
    <div
      v-else
      class="markdown-body"
      v-html="renderedContent || ''"
    />
    <!-- eslint-enable vue/no-v-html -->
  </UiContainer>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  branch?: string;
}>()

const { t } = useI18n()

const key = computed(() => `readme-html:${props.name}:${props.branch ?? "master"}`)

const {
  data: renderedContent,
  pending,
  error,
} = await useAsyncData(
  key,
  async () => {
    const branches = [ props.branch, "master", "main" ].filter(Boolean) as string[]
    let branchUsed = ""
    let raw = ""

    for (const b of branches) {
      try {
        // oxlint-disable-next-line no-await-in-loop Need to try branches sequentially
        raw = await $fetch<string>(
          `https://raw.githubusercontent.com/${props.name}/${b}/README.md`,
          {
            retry: 1,
            headers: {
              "Accept": "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          },
        )
        branchUsed = b

        break
      } catch {
        // Ignore: continue trying other branches
        // skipcq: JS-0098
        void 0
      }
    }

    if (!raw) {
      throw createError({
        statusCode: 404,
        message: `No README for ${props.name}`,
      })
    }

    if (import.meta.server) {
      const [
        { default: mdiLinkVariant },
        { default: slugify },
        { default: emojiRegex },
        { default: hljs },
        { default: mditAnchor },
        { default: mditAttrs },
        { default: mditHljs },
        { default: mditLinkAttributes },
        { default: brOnEmptyLines },
        { full: emoji },
        { alert },
        { footnote },
        { imgLazyload },
        { imgSize },
        { ins },
        { katex },
        { mark },
        { spoiler },
        { tab },
        { tasklist },
        { emojiToName },
        { createMarkdownExit },
      ] = await Promise.all([
        import("~icons/mdi/linkVariant?raw"),
        import("@sindresorhus/slugify"),
        import("emoji-regex-xs"),
        import("highlight.js"),
        import("markdown-it-anchor"),
        import("markdown-it-attrs"),
        import("markdown-it-highlightjs"),
        import("markdown-it-link-attributes"),
        import("~/utils/mdBreaks"),
        import("markdown-it-emoji"),
        import("@mdit/plugin-alert"),
        import("@mdit/plugin-footnote"),
        import("@mdit/plugin-img-lazyload"),
        import("@mdit/plugin-img-size"),
        import("@mdit/plugin-ins"),
        import("@mdit/plugin-katex"),
        import("@mdit/plugin-mark"),
        import("@mdit/plugin-spoiler"),
        import("@mdit/plugin-tab"),
        import("@mdit/plugin-tasklist"),
        import("gemoji"),
        import("markdown-exit"),
      ])

      const { cleanMarkdown } = await import("~/composables/useCleanMarkdown")

      type Token = import("markdown-exit").Token

      const erx = emojiRegex()

      // skipcq: JS-0016
      function demojifyToGithub(s: string) {
        return s.replace(erx, (m) => {
          const name = emojiToName[m]

          if (!name) {
            return " "
          }

          return ` ${name.replace(/_/g, " ")} `
        })
      }

      // skipcq: JS-0016
      function getTokensText(tokens: Token[]) {
        return tokens
          .filter((token) => ![ "html_inline", "image" ].includes(token.type))
          .map((t) => t.content)
          .join("")
      }

      const md = createMarkdownExit({
        breaks: true,
        html: true,
        linkify: true,
        typographer: true,
      })
        .use(mditHljs, {
          hljs,
          inline: true,
        })
        .use(emoji, { shortcuts: {} })
        .use(mditAnchor, {
          slugify: (s) => slugify(demojifyToGithub(s)),
          permalink: mditAnchor.permalink.headerLink(),
          permalinkClass: "header-link",
          getTokensText,
        })
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
        .use(footnote)
        .use(imgLazyload)
        .use(imgSize)
        .use(ins)
        .use(katex, { delimiters: "all" })
        .use(mark)
        .use(spoiler)
        .use(tab, { name: "tabs" })
        .use(tasklist, { disabled: false })
        .use(brOnEmptyLines)

      md.core.ruler.push("heading_copy_icon", (state) => {
        const { tokens } = state

        for (let i = 0; i < tokens.length; i++) {
          if (tokens[i]?.type === "heading_open" && i + 1 < tokens.length) {
            const inline = tokens[i + 1]
            const id = tokens[i]?.attrGet("id") || ""

            const html = `
              <span
                class="header-copy-icon"
                role="button"
                data-slug="${id}"
              >
                ${mdiLinkVariant.replace(/<svg\b[^>]*>/i, "<svg>")}
              </span>
            `.trim()

            const newToken = new state.Token("html_inline", "", 0)

            newToken.content = html
            inline?.children?.unshift(newToken)
          }
        }
      })

      md.renderer.rules.fence = (tokens, idx) => {
        const token = tokens[idx]

        if (!token) {
          return ""
        }

        const langName = token.info.trim()
        const isSupported = hljs.getLanguage(langName)

        const highlightedCode = isSupported
          ? hljs.highlight(token.content, { language: langName }).value
          : hljs.highlightAuto(token.content).value

        return `
          <div class='code-block'>
            <div class='code-block-header'>
              <span class='code-block-lang'>${langName || "plaintext"}</span>
              <button class='copy-code-button' type='button'>
                Copy
              </button>
            </div>
            <pre><code class='hljs ${langName}'>${highlightedCode}</code></pre>
          </div>
        `
      }

      const src = cleanMarkdown(raw ?? "", props.name, branchUsed)

      const rendered = await md.renderAsync(src)

      return rendered
    }

    return ""
  },
)

const head = useHead({
  title: `EDM115 - ${t("projects.project")} ${props.name}`,
  meta: [
    {
      name: "og:title",
      content: `EDM115 - ${t("projects.project")} ${props.name}`,
    },
  ],
})

async function getRepoDetails() {
  try {
    const { data } = await useFetch<{
      full_name: string;
      description?: string;
    }>(`https://api.github.com/repos/${props.name}`, { headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    } })

    if (!data.value || !data.value.full_name) {
      throw new Error("Repository not found")
    }

    return {
      name: data.value.full_name,
      description: data.value.description || "",
    }
  } catch (error) {
    return null
  }
}

const repoDetails = await getRepoDetails()

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

onMounted(() => {
  useCopySlug()
  useCopyCode()
})
</script>

<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css");

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error {
  margin: 1rem 0;
}
</style>
