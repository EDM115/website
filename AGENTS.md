# AGENTS.md - AI guide for EDM115/website
This repository houses the code for the personnal website of EDM115.

## Structure
```text
/
├── app/                       # Main Nuxt website code
│   ├── assets/                # Data and stylesheets
│   ├── components/            # Vue components
│   │   ├── blog/              # Blog posts in Markdown
│   │   ├── home/polychrome    # Our complex graphical effect
│   │   └── ui/                # Home-made UI components
│   ├── composables/           # Vue composables
│   ├── layouts/               # Main layout
│   ├── middleware/            # Handles the redirection to other paths
│   ├── pages/                 # Nuxt pages, filename = route
│   ├── utils/                 # Utility functions
│   ├── error.vue              # Error handling component
│   └── router.options.ts      # Ensures we scroll to the right position on route change
├── assembly/                  # AssemblyScript code for the WebAssembly-compiled polychrome effect
├── i18n/                      # Internationalization files (English and French)
├── patches/                   # Dependencies patches for PNPM
├── public/                    # Public assets
├── eslint.config.ts           # ESLint configuration
├── eslint.stylistic.config.ts # ESLint Stylistic configuration
├── .oxlintrc                  # Oxlint configuration
├── *.script.ts                # Build scripts
├── nuxt.config.ts             # Nuxt configuration
├── package.json               # Project metadata and dependencies
├── pnpm-workspace.yaml        # PNPM-specific configuration
├── pnpm-lock.yaml             # PNPM lockfile
└── tsconfig.json              # TypeScript configuration
```

## Tools & dependencies
This project uses `Node.js Krypton (LTS, v24.x)` and `PNPM` as package manager.  
Every command should be run using `pnpm <command>`. If you add/edit a dependency, make sure to run `pnpm up -L` to update the lockfile and not `pnpm i`.  
The website is created using the `Nuxt 4` framework, with `Vue.js 3`, the `composition API`, `TypeScript` and `Vite`.  
The main tool for linting is `oxlint` (think ESLint but in Rust) and `ESLint Stylistic` for code formatting.  
A bit of code is compiled to WebAssembly using `assemblyscript`.  
Icons support is provided by `Iconify` and `unplugin-icons`.  
Blog posts are written in Markdown and rendered using `unplugin-vue-markdown`. By default it uses `markdown-it` but I patched it and all related dependencies to use `markdown-exit`, a modern and fully typed parser. PNPM is responsible for applying those patches automatically.

## Commands
```zsh
pnpm generate  # Generate the static website into the "dist" folder. Calls `prebuild`
pnpm prebuild  # Builds blog posts related files. Calls `wasm`
pnpm wasm      # Compiles AssemblyScript files to WebAssembly
pnpm typecheck # Typechecks the code using TypeScript
pnpm lint      # Lints the code using Oxlint and ESLint for the Vue plugin
pnpm lint:fix  # Fixes linting most issues using Oxlint and ESLint for the Vue plugin
pnpm format    # Formats the code using ESLint Stylistic
```
You don't need to worry about the other commands

## Interesting quirks
- We don't use any CSS framework. All styles are custom made using SCSS.
- We don't use any component library. All components are custom made and located in `app/components/ui/`. They slightly take inspiration from Vuetify and we create them as we need them.
- We use `markdown-exit` instead of `markdown-it` for blog posts rendering. Thanks to `unplugin-vue-markdown` we can import Markdown files as Vue components directly.
- The website uses SSG, which means that we have to keep stuff SSR-friendly for the dev & generation to work properly (ex don't use browserland APIs server-side).
- We don't use cookies, and instead rely on `localStorage` for storing preferences (ex dark mode).
- Style-wise, `app/assets/styles/_variables.scss` contains the color scheme and `app/assets/styles/main.scss` contains the main styles applied everywhere. Each component/page can have its own styles in addition to that.
- Projects page just grabs their README and renders it.
- This website have dark and light mode.

## General rules
- Write all code in TypeScript. No JavaScript allowed. You can use top-level await. Styles should be written in SCSS, using its features when possible (ex nesting).
- Use function declarations instead of arrow functions unless absolutely necessary.
- Vue files should be SFC's, with first the `<template>`, then `<script setup lang="ts">` (composition API) and finally `<style scoped lang="scss">` (can rarely be not scoped).
- If you need a component for the UI, list existing ones in `app/components/ui/` first. If you need to edit one, keep the style consistent and document props if you add some. If you need a new one, create it in `app/components/ui/` and make it generic enough to be reused later. Components should be named using PascalCase. Do not use HTML tags as-is outside of UI components (ex `<input>`). If an UI component doesn't fit an usage you need (ex `<img>` or `<a>`), a Nuxt component probably already fills this role (ex `<NuxtImg>` or `<NuxtLink>`), check the codebase for existing usage.
- Do not use `any` or disable typechecking. There is always a better way to type things, even if it's by using `unknown` and type narrowing as a last resort.
- Follow the existing code style. Use `pnpm format` to automatically format your code.
- Write comments for complex logic or non-obvious decisions. An abundance of comments will always be appreciated.
- If you have the ability to commit, write meaningful commit messages that explain the changes made. Their format should be `<type>(<scope>): <short description>` where `<type>` is one of `feat`, `perf`, `fix`, `refactor`, `chore`; `scope` is the area of the code affected (`ui`, `deps`, `docs`, ...); and `<short description>` is a one-liner summary of the changes. You are allowed (and encouraged) to use multiple lines in the commit message body to explain in details what you did change in a list. Check the git commit history for concrete examples.
- Do not manually import Vue/Nuxt/VueUse components/composables/directives/functions. Nuxt auto imports them. Components naming follows the folder structure, so `app/components/ui/Button.vue` is auto-imported as `UiButton`.
- Always prefer using VueUse utilities over raw HTML/JavaScript when possible. They are already typed and tested, and will save you time.
- Always take performance into account. The website should be as fast as possible, so avoid heavy computations on the main thread, large dependencies, unnecessary re-renders, ... Offload to workers when you have to make heavy tasks, process in parallel with async, and check the oxlint outputs since they might report performance issues. Optimization is key.
- Do not remove the empty lines in `package.json`, they serve to separate scripts for better readability.

## Testing
To test your changes, the easiest way is to run a typecheck first (`pnpm typecheck`). This will catch most errors.  
Then you can lint the code to catch more advanced errors (`pnpm lint`).  
Finally, you can generate the static website (`pnpm generate`) and check for any failures. If it completes without errors, you can consider the tests to be successful.  
Note : if you're waiting for Shell output and nothing comes at all after 45 seconds, skip the tests altogether and tell me to run them separately. Don't waste time on this. If you get denied executing commands 3 times in a row, stop trying and tell me to run them separately as well.

## What to do before finishing ?
- Run a typecheck (`pnpm typecheck`). Fix all errors reported
- Run a lint (`pnpm lint`). Fix all errors and warnings reported
- Run a build (`pnpm generate`). Make sure it completes without errors
- Run a format (`pnpm format`). Do not go against the formatting rules
- Give a summary of the changes made, along with some detailed explanations and examples if necessary
