import tsParser from "@typescript-eslint/parser"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import vueParser from "vue-eslint-parser"

export default [
  {
    ignores: [ "**/analyze/", "**/dist/", "**/node_modules/", "**/*.d.ts" ],
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
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
    },
  },
]
