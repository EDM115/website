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

import { MagicRegExpTransformPlugin } from "magic-regexp/transform"
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
    preprocessorMaxWorkers: 2
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
        md.use(mditAttrs)
      }
    }),
    MagicRegExpTransformPlugin.vite(),
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
