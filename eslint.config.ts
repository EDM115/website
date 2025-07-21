import { withNuxt } from "./.nuxt/eslint.config.mjs"

import tsParser from "@typescript-eslint/parser"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import vueParser from "vue-eslint-parser"

export default withNuxt(
  {
    ignores: [ "**/.nuxt/", "**/.output/", "**/dist/", "**/node_modules/", "**/*.d.ts" ],
  },
  ...pluginVue.configs["flat/recommended"],
  {
    files: [ "**/*.{js,ts,vue}" ],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [ ".vue" ],
        parser: tsParser,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "nuxt/nuxt-config-keys-order": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
    },
  },
)
