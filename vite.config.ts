import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import slugify from "@sindresorhus/slugify"
import vue from "@vitejs/plugin-vue"
import hljs from "highlight.js"
import mditAnchor from "markdown-it-anchor"
import mditAttrs from "markdown-it-attrs"
import mditHljs from "markdown-it-highlightjs"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Unfonts from "unplugin-fonts/vite"
import Components from "unplugin-vue-components/vite"
import Markdown from "unplugin-vue-markdown/vite"
import vueDevTools from "vite-plugin-vue-devtools"
import svgLoader from "vite-svg-loader"

import { lookupCollection } from "@iconify/json"
import { full as emoji } from "markdown-it-emoji"
import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"
import { TemplateType } from "rollup-plugin-visualizer/dist/plugin/template-types"
import { defineConfig } from "vite"
import { analyzer } from "vite-bundle-analyzer"
import { checker } from "vite-plugin-checker"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

const mdi = await lookupCollection("mdi")
const mdiLinkVariant = `<svg>${mdi.icons["link-variant"].body}</svg>`

const analyze = process.env.ANALYZE === "true"

const config = defineConfig({
  build: {
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        compact: true,
        manualChunks(id) {
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
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
      scss: {
        api: "modern-compiler",
      },
    },
    preprocessorMaxWorkers: 4,
  },
  esbuild: {
    target: "esnext",
  },
  plugins: [
    vue({
      include: [ /\.vue$/, /\.md$/ ],
      features: { optionsAPI: false },
      template: { transformAssetUrls },
    }),
    checker({
      typescript: true,
      vueTsc: true,
    }),
    vueDevTools({ launchEditor: "code-insiders" }),
    vuetify({
      autoImport: { labs: true },
      styles: {
        configFile: "src/styles/global.scss",
      },
    }),
    VueI18nPlugin(),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    Icons({
      compiler: "vue3",
    }),
    Unfonts({
      google: {
        injectTo: "head",
        families: [
          {
            name: "Fira Code",
          },
          {
            name: "Inter",
          },
          {
            name: "Nunito",
          },
        ],
      },
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
    analyze
      ? analyzer({
          analyzerMode: "static",
          openAnalyzer: false,
          fileName: "../analyze/analyzer",
          reportTitle: "EDM115 - Vite Bundle Analyzer",
        })
      : null,
    ...(analyze
      ? [ "treemap", "sunburst", "network", "flamegraph" ].map((template) => visualizer({
          filename: `analyze/visualizer/${template}.html`,
          title: `EDM115 - Rollup Plugin Visualizer (${template})`,
          open: false,
          gzipSize: true,
          brotliSize: true,
          template: template as TemplateType,
        }))
      : []),
  ],
  preview: {
    open: true,
    port: 8000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true,
    port: 8888,
  },
})

export const viteConfigObj = {
  resolve: config.resolve,
}

export default config
