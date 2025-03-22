import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import vue from "@vitejs/plugin-vue"
import hljs from "highlight.js"
import mditAttrs from "markdown-it-attrs"
import mditHljs from "markdown-it-highlightjs"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Unfonts from "unplugin-fonts/vite"
import Components from "unplugin-vue-components/vite"
import vueDevTools from "vite-plugin-vue-devtools"
import Markdown from "unplugin-vue-markdown/vite"
import svgLoader from "vite-svg-loader"

import { full as emoji } from "markdown-it-emoji"
import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

export default defineConfig({
  clearScreen: false,
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler"
      },
      scss: {
        api: "modern-compiler"
      }
    },
    preprocessorMaxWorkers: 4
  },
  esbuild: {
    target: "esnext"
  },
  plugins: [
    vue({
      include: [ /\.vue$/, /\.md$/ ],
      features: { optionsAPI: false },
      template: { transformAssetUrls }
    }),
    vueDevTools({ launchEditor: "code-insiders" }),
    vuetify({
      autoImport: { labs: true },
      styles: {
        configFile: "src/styles/settings.scss"
      }
    }),
    VueI18nPlugin(),
    svgLoader({
      svgoConfig: {
        multipass: true
      }
    }),
    Icons({
      compiler: "vue3"
    }),
    Unfonts({
      injectTo: "head",
      google: {
        families: [
          {
            name: "Fira Code"
          },
          {
            name: "Inter"
          },
          {
            name: "Nunito"
          }
        ]
      }
    }),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        breaks: true,
        html: true,
        linkify: true,
        typographer: true
      },
      markdownItSetup(md) {
        md.use(mditHljs, {
          hljs,
          inline: true
        }),
        md.use(emoji),
        md.use(mditAttrs),
        md.renderer.rules.fence = (tokens, idx) => {
          const token = tokens[idx]
          const langName = token.info.trim()
          const isSupported = hljs.getLanguage(langName)

          const highlightedCode = isSupported
            ? hljs.highlight(token.content, { language: langName }).value
            : hljs.highlightAuto(token.content).value

          // Return the HTML with language label and copy button
          return `
            <div class='code-block'>
              <div class='code-block-header'>
                <span class='code-block-lang'>${langName || "plaintext"}</span>
                <button class='copy-code-button' onclick='
                  navigator.clipboard.writeText(\`${token.content}\`);
                  const btn = this;
                  btn.textContent = "Copied !";
                  btn.classList.add("copy-code-button-clicked");

                  setTimeout(() => {
                    btn.textContent = "Copy";
                    btn.classList.remove("copy-code-button-clicked");
                    btn.classList.add("copy-code-button");
                  }, 3000);
                '>
                  Copy
                </button>
              </div>
              <pre><code class='hljs ${langName}'>${highlightedCode}</code></pre>
            </div>
          `
        }
      }
    }),
    Components({
      collapseSamePrefixes: true,
      directoryAsNamespace: true,
      dts: false,
      extensions: [ "vue", "md" ],
      include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ],
      resolvers: [
        IconsResolver({
          prefix: false
        })
      ],
      version: 3
    })
  ],
  preview: {
    open: true,
    port: 8000
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    open: true,
    port: 8888
  }
})
