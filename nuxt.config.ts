import slugify from "@sindresorhus/slugify"
import hljs from "highlight.js"
import mditAnchor from "markdown-it-anchor"
import mditAttrs from "markdown-it-attrs"
import mditHljs from "markdown-it-highlightjs"
import mditLinkAttributes from "markdown-it-link-attributes"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Components from "unplugin-vue-components/vite"
import Markdown from "unplugin-vue-markdown/vite"

import { lookupCollection } from "@iconify/json"
import { alert } from "@mdit/plugin-alert"
import { imgLazyload } from "@mdit/plugin-img-lazyload"
import { imgSize } from "@mdit/plugin-img-size"
import { spoiler } from "@mdit/plugin-spoiler"
import { tab } from "@mdit/plugin-tab"
import { tasklist } from "@mdit/plugin-tasklist"
import { full as emoji } from "markdown-it-emoji"

const localMdi = await lookupCollection("mdi")
const mdiLinkVariant = `<svg>${localMdi.icons["link-variant"]?.body || ""}</svg>`

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "unplugin-icons/nuxt",
  ],
  ssr: true,
  devtools: {
    enabled: false,
    timeline: { enabled: true },
    vueDevTools: true,
  },
  app: {
    baseURL: "/",
    head: {
      title: "EDM115 - French dev/gamer/music producer",
      meta: [
        { name: "darkreader-lock" },
        { name: "description", content: "Find all infos about EDM115, his projects, blog posts, ..." },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/webp", href: "/img/profile-img.webp" }],
    },
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: [
    "~/assets/styles/classes.scss",
    "~/assets/styles/markdown-alert.scss",
    "~/assets/styles/markdown-spoiler.scss",
    "~/assets/styles/dracula-hljs.scss",
    "~/assets/styles/main.scss",
  ],
  colorMode: {
    fallback: "dark",
    storage: "localStorage",
    storageKey: "theme",
  },
  sourcemap: {
    client: true,
    server: true,
  },
  devServer: {
    port: 8888,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    asyncContext: true,
    browserDevtoolsTiming: true,
    buildCache: true,
    clientFallback: true,
    clientNodeCompat: true,
    crossOriginPrefetch: true,
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { interaction: true, visibility: false },
      },
    },
    inlineRouteRules: true,
    normalizeComponentNames: true,
    parseErrorData: true,
    sharedPrerenderData: true,
    typedPages: true,
    viewTransition: true,
  },
  compatibilityDate: "2025-07-15",
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    minify: true,
    rollupConfig: {
      output: {
        compact: true,
        validate: true,
      },
    },
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          compact: true,
          validate: true,
        },
      },
    },
    clearScreen: false,
    plugins: [
      Icons({
        compiler: "vue3",
      }),
      Markdown({
        headEnabled: true,
        markdownItOptions: {
          breaks: true,
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownItSetup(md) {
          md.use(mditHljs, {
            hljs,
            inline: true,
          })
          md.use(mditAnchor, {
            slugify: (s) => slugify(s),
            permalink: mditAnchor.permalink.headerLink(),
            permalinkClass: "header-link",
          })
          md.use(emoji)
          md.use(mditAttrs)
          md.use(mditLinkAttributes, {
            attrs: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
            matcher(href: string, _config: unknown) {
              return !href.startsWith("#")
            },
          })
          md.use(alert, { deep: true })
          md.use(imgLazyload)
          md.use(imgSize)
          md.use(spoiler)
          md.use(tab, {
            name: "tabs",
          })
          md.use(tasklist)
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
                  <button class='copy-code-button'>
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
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        sourcemap: false,
        version: 3,
      }),
    ],
    vue: {
      include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ],
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        allowArbitraryExtensions: true,
        checkJs: true,
        disableSizeLimit: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        incremental: true,
        noErrorTruncation: true,
        preserveWatchOutput: true,
        removeComments: true,
      },
    },
    typeCheck: true,
  },
  eslint: {
    config: {
      autoInit: false,
      standalone: false,
    },
  },
  fonts: {
    processCSSVariables: true,
    provider: "google",
  },
  i18n: {
    baseUrl: "https://edm115.dev",
    defaultLocale: "en",
    detectBrowserLanguage: {
      fallbackLocale: "en",
      useCookie: false,
    },
    experimental: {
      typedOptionsAndMessages: "all",
    },
    locales: [
      { code: "en", name: "English", language: "en-US" },
      { code: "fr", name: "Français", language: "fr-FR" },
    ],
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
  },
  image: {
    quality: 100,
  },
  svgo: {
    autoImportPath: "./public/img",
    defaultImport: "component",
    dts: true,
    svgoConfig: {
      multipass: true,
    },
  },
})
