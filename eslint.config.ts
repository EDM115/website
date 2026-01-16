import { withNuxt } from "./.nuxt/eslint.config.mjs"

import stylistic from "@stylistic/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import vueParser from "vue-eslint-parser"

export default withNuxt(
  { ignores: [ "**/.nuxt/", "**/.output/", "**/dist/", "**/node_modules/", "**/patches/", "./app/components/home/blog/docfind*.js", "./app/components/home/blog/pagefind/" ] },
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.{js,ts,vue}"],
    linterOptions: { reportUnusedDisableDirectives: false },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
        parser: tsParser,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { "@stylistic": stylistic },
    rules: {
      "nuxt/nuxt-config-keys-order": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
    },
  },
)
