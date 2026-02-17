# AGENTS.md — EDM115/website
Rules for AI agents working in this repo (personal website).

## Stack & tooling (quick view)
- Runtime/package manager: `Node.js v25`, `PNPM`
- Framework: `Nuxt 4` + `Vue 3` + Composition API + `TypeScript` + `Vite`
- Lint/format: `oxlint` + ESLint (Vue + Stylistic)
- WASM: `assemblyscript` + generated `docfind`/`pagefind` assets
- Icons: `Iconify`, `unplugin-icons`
- Blog: Markdown via `unplugin-vue-markdown`
	- Uses `markdown-exit` (patched replacement for `markdown-it`)
	- Patches are applied by PNPM

## Package manager rules
- Run commands as `pnpm <command>`
- If dependencies change:
	- keep `~` ranges in `package.json`
	- run `pnpm up -L` to refresh lockfile
- Do **not** use `pnpm i` / `pnpm add`

## Main commands
```zsh
pnpm typecheck   # TypeScript typecheck
pnpm lint:oxlint # Lint with Oxlint
pnpm format      # Format with ESLint Stylistic
pnpm generate    # Generate static site in dist/
```
Ignore other commands unless needed.

## Project quirks
- No CSS framework; all styling is custom SCSS
- No component library; UI components live in `app/components/ui/`
- SSG app: keep everything SSR-safe so dev/generation works properly
- No cookies; preferences use `localStorage` (e.g. theme)
- Theme styles:
	- `app/assets/styles/_variables.scss` = color system
	- `app/assets/styles/main.scss` = global styles
- Projects page renders GitHub README content
- i18n: `@nuxtjs/i18n` with `en`/`fr`
- Light/dark theme; keep legibility and aesthetics in both modes

## Coding rules
- No tests required (Vitest/TDD not part of this project)
- Do not create git worktrees; use current branch
- Use available Skills, but validate suggestions against repo conventions
	- no dedicated skill tool here: use `read_file`
- TypeScript only (no JavaScript); top-level await is allowed
- SCSS for styles; use SCSS features (nesting, etc.)
- Prefer function declarations over arrow functions unless necessary
- Vue files should follow this order:
	1. `<template>`
	2. `<script setup lang="ts">`
	3. `<style scoped lang="scss">` (rare exceptions can be unscoped)
- UI components:
	- check existing `app/components/ui/` first
	- keep style consistent when editing
	- document new props
	- new components must be generic/reusable and use PascalCase
	- do not use raw HTML controls outside UI components (e.g. `<input>`)
	- if a UI component is not right (e.g. link/image), check Nuxt components (`<NuxtLink>`, `<NuxtImg>`) used in repo
- Never use `any` or disable typechecking
	- use proper typing (`unknown` + narrowing if needed)
- Add comments for complex or non-obvious logic
- Do not stage files or commit
	- user handles git
	- if asked, suggest Conventional Commits:
		- `<type>(<scope>): <short description>`
		- scope examples: `ui`, `deps`, `docs`, `ci`
		- optional body with bullet points for details
		- check git history for style examples
- Do not manually import Vue/Nuxt/VueUse APIs
	- Nuxt auto-imports them
	- component names follow folders (`app/components/ui/Button.vue` => `UiButton`)
- Prefer VueUse utilities over raw browser/JS logic when possible
- Always optimize for performance
	- avoid heavy main-thread work, large deps, needless re-renders
	- use workers/parallelization when appropriate
	- watch oxlint feedback for perf issues

## Verification guidance
- Standard verification order:
	1. `pnpm typecheck`
	2. `pnpm lint:oxlint`
- Large features only:
	1. `pnpm typecheck` (fix all errors)
	2. `pnpm lint:oxlint` (fix all errors/warnings)
	3. `pnpm format`
	4. share a detailed summary (with examples if useful)
- If shell output is silent for 45s, skip tests and ask user to run them
- If command execution is denied 3 times in a row, stop retrying and ask user to run them

## Extras (living notes)
> Free space for future AI-agent tips/gotchas/rules. Keep useful entries, remove outdated ones.

- `create_file` can produce garbled output; prefer creating empty then filling with `apply_patch`/`edit_file`
- Last resort: create files via terminal, then verify file content
- For complex tasks, create:
	- `plans/feature-name/implementation.md` with goals, steps, files, deps, gotchas
	- `plans/feature-name/progress.md` with completed / in progress / next
- ...

## Repo structure
```text
/
├── app/                    # Main Nuxt app
│   ├── assets/             # Data and styles
│   ├── components/         # Vue components
│   │   ├── blog/           # Markdown blog posts
│   │   ├── home/blog       # Blog UI components
│   │   ├── home/polychrome # Graphical effect
│   │   └── ui/             # Custom reusable UI components
│   ├── composables/        # Vue composables
│   ├── layouts/            # Main layout(s)
│   ├── middleware/         # Route redirections
│   ├── pages/              # Nuxt routes (file-based)
│   ├── utils/              # Utilities
│   ├── error.vue           # Error UI
│   └── router.options.ts   # Route scroll behavior
├── assembly/               # AssemblyScript source for WASM
├── i18n/                   # Locale config/messages (en/fr)
├── public/                 # Public assets
├── *.script.ts             # Build scripts
├── nuxt.config.ts          # Nuxt config
└── package.json            # Project metadata/deps
```
