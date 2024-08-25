import vue from "@vitejs/plugin-vue"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import Unfonts from "unplugin-fonts/vite"
import Components from "unplugin-vue-components/vite"
import vueDevTools from "vite-plugin-vue-devtools"

import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify"

export default defineConfig({
  clearScreen: false,
  css: {
    preprocessorOptions: {
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
    Components({
      collapseSamePrefixes: true,
      directoryAsNamespace: true,
      dts: false,
      resolvers: [
        IconsResolver({
          prefix: false
        })
      ],
      version: 3
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
    vue({
      features: { optionsAPI: false },
      template: { transformAssetUrls }
    }),
    vueDevTools({ launchEditor: "code-insiders" }),
    vuetify({
      autoImport: { labs: true },
      styles: {
        configFile: "src/styles/settings.scss"
      }
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
