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

const mdi = await lookupCollection("mdi")
const mdiLinkVariant = `<svg>${mdi.icons["link-variant"].body}</svg>`

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-aos",
    "nuxt-svgo",
    "vuetify-nuxt-module",
  ],
  ssr: true,
  devtools: {
    enabled: true,
    timeline: { enabled: true },
    vueDevTools: true,
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: [
    "aos/dist/aos.css",
    "~/assets/styles/markdown-alert.scss",
    "~/assets/styles/markdown-spoiler.scss",
    "~/assets/styles/dracula-hljs.scss",
    "~/assets/styles/global.scss"
  ],
  sourcemap: {
    client: false,
    server: false,
  },
  devServer: {
    port: 8888,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    asyncContext: true,
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
    normalizeComponentNames: true,
    sharedPrerenderData: true,
    typedPages: true,
    viewTransition: true,
  },
  compatibilityDate: "2025-05-15",
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
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              return id.split("node_modules/").pop()?.split("/")[0]
            }

            return id.toString().split("/")[0]
          },
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
              if (tokens[i].type === "heading_open") {
                const inline = tokens[i + 1]
                const id = tokens[i].attrGet("id")!

                const html = `
                  <span
                    class="header-copy-icon"
                    role="button"
                    data-slug="${id}"
                  >
                    ${mdiLinkVariant}
                  </span>
                `.trim()

                const t = new state.Token("html_inline", "", 0)

                t.content = html
                inline.children?.unshift(t)
              }
            }
          })
          md.renderer.rules.fence = (tokens, idx) => {
            const token = tokens[idx]
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
        dts: true,
        extensions: [ "vue", "md" ],
        include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ],
        resolvers: [
          IconsResolver({
            prefix: false,
          }),
        ],
        sourcemap: false,
        version: 3,
      }),
    ],
  },
  typescript: {
    typeCheck: true,
  },
  aos: {
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
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
    baseUrl: "/",
    bundle: {
      optimizeTranslationDirective: false,
    },
    defaultLocale: "en",
    detectBrowserLanguage: {
      cookieKey: "i18n_lang",
      fallbackLocale: "en",
      useCookie: true,
    },
    experimental: {
      typedOptionsAndMessages: "all",
    },
    lazy: true,
    locales: [
      { code: "en", name: "English" },
      { code: "fr", name: "Français" },
    ],
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
  },
  svgo: {
    svgoConfig: {
      multipass: true,
    },
  },
  vuetify: {
    vuetifyOptions: {
      labComponents: true,
      theme: {
        defaultTheme: "dark",
        themes: {
          dark: {
            colors: {
              accent: "#BD93F9",
              background: "#00040E",
              error: "#FF5555",
              info: "#8BE9FD",
              primary: "#FFB86C",
              secondary: "#50FA7B",
              success: "#50FA7B",
              text: "#F8F8F2",
              warning: "#FF79C6",
            },
            dark: true,
          },
          light: {
            colors: {
              accent: "#BD93F9",
              background: "#DBDBCC",
              error: "#FF5555",
              info: "#8BE9FD",
              primary: "#FFB86C",
              secondary: "#50FA7B",
              success: "#50FA7B",
              text: "#00040E",
              warning: "#FF79C6",
            },
            dark: false,
          },
        },
        variations: {
          colors: [ "accent", "background", "error", "info", "primary", "secondary", "success", "text", "warning" ],
          darken: 3,
          lighten: 3,
        },
      },
    },
  },
})
