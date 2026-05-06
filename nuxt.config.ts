import type { Token } from "markdown-exit"

import brOnEmptyLines from "./app/utils/mdBreaks"
import videoControls from "./app/utils/mdVideoControls"
import videoTag from "./app/utils/mdVideoTag"
import ogSlugify from "@sindresorhus/slugify"
import emojiRegex from "emoji-regex-xs"
import hljs from "highlight.js"
import mditAnchor from "markdown-it-anchor"
import mditAttrs from "markdown-it-attrs"
import mditHljs from "markdown-it-highlightjs"
import mditLinkAttributes from "markdown-it-link-attributes"
import markdownItTocDoneRight from "markdown-it-toc-done-right"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import Markdown from "unplugin-vue-markdown/vite"

import { lookupCollection } from "@iconify/json"
import { alert } from "@mdit/plugin-alert"
import { footnote } from "@mdit/plugin-footnote"
import { imgLazyload } from "@mdit/plugin-img-lazyload"
import { imgSize } from "@mdit/plugin-img-size"
import { ins } from "@mdit/plugin-ins"
import { katex } from "@mdit/plugin-katex"
import { mark } from "@mdit/plugin-mark"
import { spoiler } from "@mdit/plugin-spoiler"
import { tab } from "@mdit/plugin-tab"
import { tasklist } from "@mdit/plugin-tasklist"
import { definePerson } from "@unhead/schema-org"
import { emojiToName } from "gemoji"
import { full as emoji } from "markdown-it-emoji"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { readFile } from "node:fs/promises"

const localMdi = await lookupCollection("mdi")
const mdiLinkVariant = `<svg>${localMdi.icons["link-variant"]?.body || ""}</svg>`

const erx = emojiRegex()

function demojifyToGithub(s: string) {
  return s.replace(erx, (m) => {
    const name = emojiToName[m]

    if (!name) {
      return " "
    }

    return ` ${name.replace(/_/g, " ")} `
  })
}

function slugify(s: string) {
  return ogSlugify(demojifyToGithub(s))
}

function getTokensText(tokens: Token[]) {
  return tokens
    .filter((token) => ![ "html_inline", "image" ].includes(token.type))
    .map((t) => t.content)
    .join("")
}

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/partytown",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "unplugin-icons/nuxt",
  ],
  ssr: true,
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },
  app: {
    baseURL: "/",
    head: {
      title: "EDM115 - French dev/gamer/music producer",
      meta: [
        {
          name: "darkreader-lock",
          content: "true",
        },
        {
          name: "description",
          content: "Find all infos about EDM115, his projects, blog posts, ...",
        },
      ],
      htmlAttrs: {
        lang: "en",
        translate: "no",
      },
      link: [
        {
          rel: "icon", type: "image/webp", href: "/img/profile-img.webp",
        },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "Blog RSS feed",
          href: "/feeds/blog.xml",
        },
        {
          rel: "alternate",
          type: "application/atom+xml",
          title: "Blog Atom feed",
          href: "/feeds/blog.atom",
        },
        {
          rel: "alternate",
          type: "application/feed+json",
          title: "Blog JSON feed",
          href: "/feeds/blog.json",
        },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "Telegram RSS feed",
          href: "/feeds/telegram.xml",
        },
        {
          rel: "alternate",
          type: "application/atom+xml",
          title: "Telegram Atom feed",
          href: "/feeds/telegram.atom",
        },
        {
          rel: "alternate",
          type: "application/feed+json",
          title: "Telegram JSON feed",
          href: "/feeds/telegram.json",
        },
      ],
    },
    layoutTransition: {
      name: "layout", mode: "out-in",
    },
    pageTransition: {
      name: "page", mode: "out-in",
    },
  },
  css: [
    "~/assets/styles/classes.scss",
    "~/assets/styles/markdown-alert.scss",
    "~/assets/styles/markdown-spoiler.scss",
    "~/assets/styles/dracula-hljs.scss",
    "~/assets/styles/main.scss",
  ],
  site: {
    description: "Find all infos about EDM115, his projects, blog posts, ...",
    name: "EDM115 - French dev/gamer/music producer",
    url: "https://edm115.dev",
  },
  colorMode: {
    fallback: "dark",
    preference: "system",
    storage: "localStorage",
    storageKey: "theme",
  },
  sourcemap: {
    client: false,
    server: false,
  },
  devServer: { port: 8888 },
  future: { typescriptBundlerResolution: true },
  experimental: {
    asyncContext: true,
    buildCache: true,
    clientFallback: true,
    clientNodeCompat: true,
    crossOriginPrefetch: true,
    defaults: { nuxtLink: {
      prefetch: true,
      prefetchOn: {
        interaction: true, visibility: false,
      },
    } },
    entryImportMap: true,
    extractAsyncDataHandlers: true,
    inlineRouteRules: true,
    normalizeComponentNames: true,
    normalizePageNames: true,
    parseErrorData: true,
    sharedPrerenderData: true,
    typedPages: true,
    typescriptPlugin: true,
    viewTransition: true,
    viteEnvironmentApi: true,
  },
  compatibilityDate: "2026-05-01",
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    minify: true,
    prerender: {
      crawlLinks: true,
      failOnError: true,
      ignore: ["/.netlify"],
    },
  },
  vite: {
    build: {
      minify: "oxc",
      rolldownOptions: {
        experimental: {
          lazyBarrel: true,
          nativeMagicString: true,
          resolveNewUrlToAsset: true,
        },
        output: {
          comments: false,
          // Work around Rolldown placing __exportAll across a Vue/Nuxt runtime cycle
          // See https://github.com/rolldown/rolldown/issues/8809
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, "/")

            if (
              normalizedId.includes("/node_modules/.pnpm/@vue+")
              || normalizedId.includes("/node_modules/.pnpm/vue@")
              || (
                normalizedId.includes("/node_modules/.pnpm/nuxt@")
                && normalizedId.includes("/node_modules/nuxt/dist/app/")
              )
            ) {
              return "runtime-vue-nuxt"
            }

            return undefined
          },
          minify: true,
        },
      },
    },
    clearScreen: false,
    optimizeDeps: {
      include: [
        "@mdit/plugin-alert",
        "@mdit/plugin-footnote",
        "@mdit/plugin-img-lazyload",
        "@mdit/plugin-img-size",
        "@mdit/plugin-ins",
        "@mdit/plugin-katex",
        "@mdit/plugin-mark",
        "@mdit/plugin-spoiler",
        "@mdit/plugin-tab",
        "@mdit/plugin-tasklist",
        "@sindresorhus/slugify",
        "country-flag-emoji-polyfill",
        "emoji-regex-xs",
        "gemoji",
        "highlight.js",
        "light-odometer",
        "markdown-exit",
        "markdown-it-anchor",
        "markdown-it-attrs",
        "markdown-it-emoji",
        "markdown-it-highlightjs",
        "markdown-it-link-attributes",
        "temporal-polyfill",
      ],
    },
    plugins: [
      Icons({ compiler: "vue3" }),
      Markdown({
        headEnabled: true,
        markdownOptions: {
          breaks: true,
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownSetup(md) {
          md.use(mditHljs, {
            hljs,
            inline: true,
          })
          md.use(emoji, { shortcuts: {} })
          md.use(mditAnchor, {
            getTokensText,
            permalink: mditAnchor.permalink.headerLink(),
            permalinkClass: "header-link",
            slugify,
          })
          md.use(mditAttrs)
          md.use(mditLinkAttributes, {
            attrs: {
              rel: "noopener noreferrer",
              target: "_blank",
            },
            matcher(href: string, _config: unknown) {
              return !href.startsWith("#")
            },
          })
          md.use(alert, { deep: true })
          md.use(footnote)
          md.use(imgLazyload)
          md.use(imgSize)
          md.use(ins)
          md.use(katex, { delimiters: "all" })
          md.use(mark)
          md.use(spoiler)
          md.use(tab, { name: "tabs" })
          md.use(markdownItTocDoneRight, {
            level: 2,
            listType: "ul",
            slugify,
          })
          md.use(tasklist, { disabled: false })
          md.use(brOnEmptyLines)
          md.use(videoTag)
          md.use(videoControls)
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
        },
      }),
      Components({
        collapseSamePrefixes: true,
        directoryAsNamespace: true,
        dirs: [ "app/components", "components" ],
        extensions: [ "vue", "md" ],
        include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ],
        resolvers: [IconsResolver({ prefix: "Icon" })],
        sourcemap: false,
      }),
    ],
    vue: { include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ] },
  },
  typescript: {
    tsConfig: { compilerOptions: {
      allowArbitraryExtensions: true,
      disableSizeLimit: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      incremental: true,
      noErrorTruncation: true,
      preserveWatchOutput: true,
      removeComments: true,
    } },
    typeCheck: false,
  },
  hooks: {
    async "prerender:routes"({ routes }) {
      const root = fileURLToPath(new URL(".", import.meta.url))
      const files = [
        resolve(root, "app/assets/data/blog-posts.json"),
        resolve(root, "app/assets/data/telegram-posts.json"),
      ]
      const reads = await Promise.allSettled(files.map((p) => readFile(p, "utf8")))

      for (const [ idx, res ] of reads.entries()) {
        if (res.status !== "fulfilled") {
          console.warn("[prerender] skipped", files[idx], res.reason)

          continue
        }

        let items: Array<{ link?: string }> = []

        try {
          items = JSON.parse(res.value)
        } catch (e) {
          console.warn("[prerender] bad JSON", files[idx], e)

          continue
        }

        for (const { link } of items) {
          if (link) {
            routes.add(link)
          }
        }
      }
    },
  },
  eslint: { config: {
    autoInit: false,
    standalone: false,
  } },
  fonts: {
    devtools: true,
    families: [
      {
        name: "Inter",
        src: "/fonts/Inter/InterVariable.woff2",
        weights: ["100 900"],
        style: "normal",
        preload: true,
        global: true,
      },
      {
        name: "Inter",
        src: "/fonts/Inter/InterVariable-Italic.woff2",
        weights: ["100 900"],
        style: "italic",
        preload: true,
        global: true,
      },
      {
        name: "Fira Code",
        src: "/fonts/FiraCode-VF.woff2",
        weights: ["300 700"],
        style: "normal",
        preload: true,
        global: true,
      },
      {
        name: "Nunito",
        src: "/fonts/Nunito/Nunito-VariableFont_wght.woff2",
        weights: ["200 1000"],
        style: "normal",
        preload: true,
        global: true,
      },
      {
        name: "Nunito",
        src: "/fonts/Nunito/Nunito-Italic-VariableFont_wght.woff2",
        weights: ["200 1000"],
        style: "italic",
        preload: true,
        global: true,
      },
      {
        name: "Twemoji Country Flags",
        src: "/fonts/TwemojiCountryFlags.woff2",
        weight: 400,
        style: "normal",
        preload: true,
      },
    ],
    processCSSVariables: true,
    providers: {
      adobe: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      google: false,
      googleicons: false,
      npm: false,
    },
  },
  i18n: {
    baseUrl: "https://edm115.dev",
    defaultLocale: "en",
    detectBrowserLanguage: {
      fallbackLocale: "en",
      useCookie: false,
    },
    experimental: { typedOptionsAndMessages: "all" },
    locales: [
      {
        code: "en", name: "English", language: "en-US",
      },
      {
        code: "fr", name: "Français", language: "fr-FR",
      },
    ],
    strategy: "no_prefix",
  },
  image: { quality: 100 },
  linkChecker: {
    excludeLinks: [
      "/blog/**",
      "/docs/**",
      "/projects/**",
    ],
    report: {
      html: true,
      markdown: true,
      json: true,
    },
    runOnBuild: false,
  },
  ogImage: {
    buildCache: true,
    componentDirs: ["system"],
    defaults: {
      cacheMaxAgeSeconds: 432000,
      height: 1080,
      width: 1920,
    },
    enabled: true,
    security: {
      renderTimeout: 120_000,
    },
    zeroRuntime: true,
  },
  schemaOrg: { identity: definePerson({
    name: "EDM115",
    image: "/img/profile-img.webp",
    description: "EDM115 - French dev/gamer/music producer",
    url: "https://edm115.dev",
    sameAs: [
      "https://www.linkedin.com/in/edm115",
      "https://github.com/edm115",
      "https://x.com/_EDM115",
      "https://www.reddit.com/user/EDM115",
    ],
  }) },
  seo: { automaticDefaults: false },
  sitemap: {
    cacheMaxAgeSeconds: 432000,
    zeroRuntime: true,
  },
  svgo: {
    autoImportPath: "./public/img",
    defaultImport: "component",
    dts: true,
    svgoConfig: { multipass: true },
  },
})
