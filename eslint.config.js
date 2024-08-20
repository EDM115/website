import js from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"

export default [
  {
    ignores: [ "**/dist/*", "**/node_modules/*" ]
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/array-bracket-newline": [ "error", { multiline: true }],
      "@stylistic/array-bracket-spacing": [ "error", "always", { objectsInArrays: false, arraysInArrays: false }],
      "@stylistic/array-element-newline": [ "error", "consistent" ],
      "@stylistic/arrow-parens": [ "error", "always" ],
      "@stylistic/arrow-spacing": [ "error", { before: true, after: true }],
      "@stylistic/block-spacing": [ "error", "always" ],
      "@stylistic/brace-style": [ "error", "1tbs", { allowSingleLine: true }],
      "@stylistic/comma-dangle": [ "error", "never" ],
      "@stylistic/comma-spacing": [ "error", { before: false, after: true }],
      "@stylistic/comma-style": [ "error", "last" ],
      "@stylistic/computed-property-spacing": [ "error", "never" ],
      "@stylistic/dot-location": [ "error", "property" ],
      "@stylistic/eol-last": [ "error", "always" ],
      "@stylistic/function-call-argument-newline": [ "error", "consistent" ],
      "@stylistic/function-call-spacing": [ "error", "never" ],
      "@stylistic/function-paren-newline": [ "error", "multiline" ],
      "@stylistic/generator-star-spacing": [ "error", { before: true, after: false }],
      "@stylistic/implicit-arrow-linebreak": [ "error", "beside" ],
      "@stylistic/indent": [ "error", 2, { SwitchCase: 1, VariableDeclarator: "first", outerIIFEBody: 1, MemberExpression: 1, FunctionDeclaration: { parameters: "first", body: 1 }, FunctionExpression: { parameters: "first", body: 1 }, StaticBlock: { body: 1 }, CallExpression: { arguments: "first" }, ArrayExpression: "first", ObjectExpression: "first", ImportDeclaration: "first", flatTernaryExpressions: false, offsetTernaryExpressions: true, ignoreComments: true }],
      "@stylistic/indent-binary-ops": [ "error", 2 ],
      "@stylistic/key-spacing": [ "error", { beforeColon: false, afterColon: true, mode: "strict" }],
      "@stylistic/keyword-spacing": [ "error", { before: true, after: true }],
      "@stylistic/linebreak-style": [ "error", "unix" ],
      "@stylistic/line-comment-position": [ "error", { position: "above" }],
      "@stylistic/lines-around-comment": [ "error", { beforeBlockComment: true, afterBlockComment: false, beforeLineComment: false, afterLineComment: false, allowBlockStart: true, allowBlockEnd: false, allowObjectStart: true, allowObjectEnd: false, allowArrayStart: true, allowArrayEnd: false, allowClassStart: true, allowClassEnd: false }],
      "@stylistic/lines-between-class-members": [ "error", "always", { exceptAfterSingleLine: true }],
      "@stylistic/multiline-comment-style": [ "off", "starred-block" ],
      "@stylistic/multiline-ternary": [ "error", "always-multiline" ],
      "@stylistic/new-parens": [ "error", "always" ],
      "@stylistic/newline-per-chained-call": [ "error", { ignoreChainWithDepth: 3 }],
      "@stylistic/no-confusing-arrow": [ "error", { allowParens: true }],
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": [ "error", { max: 2, maxEOF: 1, maxBOF: 0 }],
      "@stylistic/no-tabs": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/object-curly-spacing": [ "error", "always" ],
      "@stylistic/operator-linebreak": [ "error", "before" ],
      "@stylistic/padded-blocks": [ "error", "never" ],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: [ "throw", "return" ] },
        { blankLine: "always", prev: [ "const", "let", "var" ], next: "*" },
        { blankLine: "any", prev: [ "const", "let", "var" ], next: [ "const", "let", "var" ] },
        { blankLine: "always", prev: "*", next: [ "if", "for", "function", "class", "switch", "while", "with" ] }
      ],
      "@stylistic/quote-props": [ "error", "consistent-as-needed" ],
      "@stylistic/quotes": [ "error", "double" ],
      "@stylistic/rest-spread-spacing": [ "error", "never" ],
      "@stylistic/semi": [ "error", "never" ],
      "@stylistic/space-before-blocks": [ "error", "always" ],
      "@stylistic/space-before-function-paren": [ "error", { anonymous: "always", named: "never", asyncArrow: "always" }],
      "@stylistic/space-in-parens": [ "error", "never" ],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": [ "error", { words: true, nonwords: false }],
      "@stylistic/spaced-comment": [ "error", "always" ],
      "@stylistic/switch-colon-spacing": [ "error", { after: true, before: false }],
      "@stylistic/template-curly-spacing": [ "error", "never" ],
      "@stylistic/template-tag-spacing": [ "error", "never" ],
      "@stylistic/type-annotation-spacing": [ "error", { before: false, after: true }],
      "@stylistic/type-generic-spacing": "error",
      "@stylistic/wrap-iife": [ "error", "outside" ],
      "@stylistic/wrap-regex": "error",
      "@stylistic/yield-star-spacing": [ "error", "before" ],
      "curly": [ "error", "all" ],
      "no-unused-vars": [ "warn" ],
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off"
    }
  }
]
