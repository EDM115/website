import stylistic from "@stylistic/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
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
    rules: {
      "@stylistic/array-bracket-newline": [ "warn", { multiline: true }],
      "@stylistic/array-bracket-spacing": [
        "warn", "always", {
          singleValue: false,
          objectsInArrays: false,
          arraysInArrays: false,
        },
      ],
      "@stylistic/array-element-newline": [ "warn", "consistent" ],
      "@stylistic/arrow-parens": [ "warn", "always" ],
      "@stylistic/arrow-spacing": [
        "warn", {
          before: true, after: true,
        },
      ],
      "@stylistic/block-spacing": [ "warn", "always" ],
      "@stylistic/brace-style": [ "warn", "1tbs", { allowSingleLine: false }],
      "@stylistic/comma-dangle": [ "warn", "always-multiline" ],
      "@stylistic/comma-spacing": [
        "warn", {
          before: false, after: true,
        },
      ],
      "@stylistic/comma-style": [ "warn", "last" ],
      "@stylistic/computed-property-spacing": [ "warn", "never" ],
      "@stylistic/curly-newline": [ "warn", { minElements: 1 }],
      "@stylistic/dot-location": [ "warn", "property" ],
      "@stylistic/eol-last": [ "warn", "always" ],
      "@stylistic/function-call-argument-newline": [ "warn", "consistent" ],
      "@stylistic/function-call-spacing": [ "warn", "never" ],
      "@stylistic/function-paren-newline": [ "warn", "multiline" ],
      "@stylistic/generator-star-spacing": [
        "warn", {
          before: true, after: false,
        },
      ],
      "@stylistic/implicit-arrow-linebreak": [ "warn", "beside" ],
      "@stylistic/indent": [
        "warn", 2, {
          SwitchCase: 1,
          VariableDeclarator: "first",
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: {
            parameters: "first", body: 1, returnType: 1,
          },
          FunctionExpression: {
            parameters: "first", body: 1, returnType: 1,
          },
          StaticBlock: { body: 1 },
          CallExpression: { arguments: "first" },
          ArrayExpression: "first",
          ObjectExpression: "first",
          ImportDeclaration: "first",
          flatTernaryExpressions: false,
          offsetTernaryExpressions: true,
          offsetTernaryExpressionsOffsetCallExpressions: true,
          ignoreComments: true,
        },
      ],
      "@stylistic/indent-binary-ops": [ "warn", 2 ],
      "@stylistic/key-spacing": [
        "warn", {
          beforeColon: false,
          afterColon: true,
          mode: "strict",
        },
      ],
      "@stylistic/keyword-spacing": [
        "warn", {
          before: true, after: true,
        },
      ],
      "@stylistic/linebreak-style": [ "warn", "unix" ],
      "@stylistic/line-comment-position": [ "warn", { position: "above" }],
      "@stylistic/lines-around-comment": [
        "warn", {
          beforeBlockComment: true,
          afterBlockComment: false,
          beforeLineComment: false,
          afterLineComment: false,
          allowBlockStart: true,
          allowBlockEnd: false,
          allowObjectStart: true,
          allowObjectEnd: false,
          allowArrayStart: true,
          allowArrayEnd: false,
          allowClassStart: true,
          allowClassEnd: false,
          allowEnumStart: true,
          allowInterfaceEnd: true,
          allowInterfaceStart: true,
          allowModuleEnd: true,
          allowModuleStart: true,
          allowTypeEnd: true,
          allowTypeStart: true,
          afterHashbangComment: true,
        },
      ],
      "@stylistic/lines-between-class-members": [
        "warn", "always", {
          exceptAfterSingleLine: true,
          exceptAfterOverload: true,
        },
      ],
      "@stylistic/member-delimiter-style": [
        "warn", {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: false,
          },
          multilineDetection: "brackets",
        },
      ],
      "@stylistic/multiline-comment-style": [ "off", "starred-block" ],
      "@stylistic/multiline-ternary": [ "warn", "always" ],
      "@stylistic/new-parens": [ "warn", "always" ],
      "@stylistic/newline-per-chained-call": [ "warn", { ignoreChainWithDepth: 1 }],
      "@stylistic/no-confusing-arrow": [ "warn", { allowParens: true }],
      "@stylistic/no-extra-parens": [ "warn", "functions" ],
      "@stylistic/no-extra-semi": "warn",
      "@stylistic/no-floating-decimal": "warn",
      "@stylistic/no-mixed-operators": "warn",
      "@stylistic/no-mixed-spaces-and-tabs": "warn",
      "@stylistic/no-multi-spaces": "warn",
      "@stylistic/no-multiple-empty-lines": [
        "warn", {
          max: 2, maxEOF: 1, maxBOF: 0,
        },
      ],
      "@stylistic/no-tabs": "warn",
      "@stylistic/no-trailing-spaces": [ "warn", { ignoreComments: true }],
      "@stylistic/no-whitespace-before-property": "warn",
      "@stylistic/nonblock-statement-body-position": [ "warn", "beside" ],
      "@stylistic/object-curly-newline": [ "warn", { minProperties: 2 }],
      "@stylistic/object-curly-spacing": [ "warn", "always" ],
      "@stylistic/object-property-newline": [ "warn", { allowAllPropertiesOnSameLine: true }],
      "@stylistic/operator-linebreak": [ "warn", "before" ],
      "@stylistic/padded-blocks": [ "warn", "never" ],
      "@stylistic/padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "*",
          next: [ "break", "continue", "debugger", "throw", "return", "export", "try", "enum", "interface", "type" ],
        },
        {
          blankLine: "always",
          prev: [ "const", "let", "var", "directive", "import", "enum", "interface", "type" ],
          next: "*",
        },
        {
          blankLine: "any",
          prev: [ "const", "let", "var", "import" ],
          next: [ "const", "let", "var", "import" ],
        },
        {
          blankLine: "always",
          prev: "*",
          next: [ "if", "for", "function", "class", "switch", "while", "with" ],
        },
        {
          blankLine: "always",
          prev: [ "if", "for", "function", "class", "switch", "while", "with" ],
          next: "*",
        },
      ],
      "@stylistic/quote-props": [ "warn", "consistent-as-needed", { keywords: true }],
      "@stylistic/quotes": [ "warn", "double" ],
      "@stylistic/rest-spread-spacing": [ "warn", "never" ],
      "@stylistic/semi": [ "warn", "never" ],
      "@stylistic/space-before-blocks": [ "warn", "always" ],
      "@stylistic/space-before-function-paren": [
        "warn", {
          "anonymous": "always",
          "named": "never",
          "asyncArrow": "always",
          "catch": "always",
        },
      ],
      "@stylistic/space-in-parens": [ "warn", "never" ],
      "@stylistic/space-infix-ops": "warn",
      "@stylistic/space-unary-ops": [
        "warn", {
          words: true, nonwords: false,
        },
      ],
      "@stylistic/spaced-comment": [ "warn", "always" ],
      "@stylistic/switch-colon-spacing": [
        "warn", {
          after: true, before: false,
        },
      ],
      "@stylistic/template-curly-spacing": [ "warn", "never" ],
      "@stylistic/template-tag-spacing": [ "warn", "never" ],
      "@stylistic/type-annotation-spacing": [
        "warn", {
          before: false, after: true,
        },
      ],
      "@stylistic/type-generic-spacing": "warn",
      "@stylistic/type-named-tuple-spacing": "warn",
      "@stylistic/wrap-iife": [ "warn", "inside" ],
      "@stylistic/wrap-regex": "warn",
      "@stylistic/yield-star-spacing": [
        "warn", {
          before: true, after: false,
        },
      ],
    },
  },
]
