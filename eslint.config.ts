import js from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import oxlint from "eslint-plugin-oxlint"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"

import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript"
import { createViteImportResolver } from "eslint-import-resolver-vite"
import { flatConfigs } from "eslint-plugin-import-x"
import { configs as tsEslintConfigs } from "typescript-eslint"

export default [
  {
    ignores: [ "**/analyze/", "**/dist/", "**/node_modules/", "**/*.d.ts" ],
  },
  js.configs.all,
  ...tsEslintConfigs.recommended,
  flatConfigs.recommended,
  flatConfigs.typescript,
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
