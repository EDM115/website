<template>
  <UiContainer>
    <h1>{{ t("projects.title") }}</h1>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <div class="showcases">
      <UiShowcase
        v-for="project in projects"
        :key="project.title"
        :link="project.link"
        :aria="project.title"
        :image="project.image"
      >
        <template #title>
          <h3 style="text-align: left;">
            {{ project.title }}
          </h3>
        </template>
        <template #description>
          <p style="text-align: left;">
            {{ project.description }}
          </p>
        </template>
      </UiShowcase>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t("projects.head"),
  meta: [
    {
      name: "og:title",
      content: t("projects.head"),
    },
  ],
})

const projects = [
  {
    title: "unzip-bot",
    description: "Telegram bot deployable to heroku that can extract every archive !",
    link: "/projects/unzip-bot",
    image: "/img/projects/unzip-bot.webp",
  },
  {
    title: "monorepo-hash",
    description: "A CLI tool to generate hashes for the workspaces of your monorepo",
    link: "/projects/monorepo-hash",
    image: "/img/projects/monorepo-hash.webp",
  },
  {
    title: "better-maps",
    description: "A quick way to add pin-points to a map, with details, filters and more. Made for my gf",
    link: "/projects/better-maps",
    image: "/img/projects/better-maps.webp",
  },
  {
    title: "unrar-alpine",
    description: "UnRAR, built for Alpine Linux. Automatically built and released at each new version",
    link: "/projects/unrar-alpine",
    image: "/img/projects/unrar-alpine.webp",
  },
  {
    title: "website",
    description: "Basically my website, made with Nuxt",
    link: "/projects/website",
    image: "/img/projects/website.webp",
  },
  {
    title: "EDM115-ohmyposh-theme",
    description: "My very own Oh My Posh theme",
    link: "/projects/edm115-ohmyposh-theme",
    image: "/img/projects/edm115-ohmyposh-theme.webp",
  },
  {
    title: "palex",
    description: "A javascript package to help you create color palettes",
    link: "/projects/palex",
    image: "/img/projects/palex.webp",
  },
  {
    title: "js-imports-sort",
    description: "A simple script to sort Javascript imports the way I want",
    link: "/projects/js-imports-sort",
    image: "/img/projects/js-imports-sort.webp",
  },
  {
    title: "Markdown_Syntax_FR",
    description: "Help to write in Markdown on Github [French]",
    link: "/projects/markdown-syntax-fr",
    image: "/img/projects/markdown-syntax-fr.webp",
  },
  {
    title: "The-Very-Restrictive-License",
    description: "A very restrictive license. Anyway...",
    link: "/projects/the-very-restrictive-license",
    image: "/img/projects/the-very-restrictive-license.webp",
  },
]
</script>

<style scoped lang="scss">
.showcases {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
</style>
