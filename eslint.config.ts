// skipcq: JS-0384
/// <reference path="./eslint-import-resolver-vite.d.ts" />

/* eslint-disable import-x/no-named-as-default-member */
import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import eslintPluginImportX from "eslint-plugin-import-x"
import oxlint from "eslint-plugin-oxlint"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import tseslint from "typescript-eslint"

import { createRequire } from "module"
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript"

const require = createRequire(import.meta.url)
const { createViteImportResolver } = require("eslint-import-resolver-vite")

export default [
  {
    ignores: [ "**/dist/", "**/node_modules/", "**/*.d.ts" ],
  },
  js.configs.all,
  ...tseslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
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
      parserOptions: {
        ecmaVersion: "latest",
        extraFileExtensions: [ ".vue" ],
        parser: tsParser,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import-x/parsers": {
        "@typescript-eslint/parser": [ ".ts" ],
        "vue-eslint-parser": [ ".vue" ],
      },
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: false,
          project: "tsconfig.json",
        }),
        createViteImportResolver({
          viteConfig: (await import("./vite.config")).viteConfigObj,
        }),
      ],
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "capitalized-comments": "off",
      "curly": [ "warn", "all" ],
      "id-length": "off",
      "import-x/no-unresolved": [ "error", { ignore: [ "^~icons/" ] }],
      "max-statements": "off",
      "no-underscore-dangle": "off",
      "no-useless-assignment": "off",
      "one-var": "off",
      "prefer-named-capture-group": "off",
      "require-unicode-regexp": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
    },
  },
  ...oxlint.configs["flat/all"],
]
