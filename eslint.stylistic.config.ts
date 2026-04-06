import stylistic from "@stylistic/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import vueParser from "vue-eslint-parser"

import { eslint as edm115Lint } from "edm115-lint"

export default [
  { ignores: [ "**/.nuxt/", "**/.output/", "**/dist/", "**/node_modules/", "**/patches/", "**/public/", "**/*.md" ] },
  {
    files: ["**/*.{js,ts,vue}"],
    linterOptions: { reportUnusedDisableDirectives: false },
    plugins: { "@stylistic": stylistic },
    rules: edm115Lint,
  },
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [".vue"],
        parser: tsParser,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
