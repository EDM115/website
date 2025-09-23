import stylistic from "@stylistic/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import edm115Lint from "edm115-lint/eslint-stylistic.json"
import vueParser from "vue-eslint-parser"

export default [
  { ignores: [ "**/.nuxt/", "**/.output/", "**/dist/", "**/node_modules/", "**/*.d.ts" ] },
  {
    files: ["**/*.{js,ts,vue}"],
    linterOptions: { reportUnusedDisableDirectives: false },
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
    plugins: { "@stylistic": stylistic },
    rules: edm115Lint,
  },
]
