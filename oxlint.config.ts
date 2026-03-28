import { oxlint as edm115Lint } from "edm115-lint"
import { defineConfig } from "oxlint"

export default defineConfig({
  "env": {
    "es2025": true,
    "browser": true,
    "shared-node-browser": true,
  },
  "extends": [edm115Lint],
  "ignorePatterns": [
    "**/.nuxt/",
    "**/.output/",
    "**/dist/",
    "**/node_modules/",
    "**/patches/",
    "**/public/",
    "**/*.md",
  ],
  "options": {
    typeAware: true,
  },
  "plugins": ["vue"],
})
