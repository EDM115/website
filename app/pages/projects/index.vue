<template>
  <UiContainer>
    <h1>{{ t("projects.title") }}</h1>

    <UiButton
      expandable
      :expanded="isMobile"
      hover-color="primary"
      :icon="mdiGithub"
      :text="t('projects.gh')"
      variant="frosted"
      link="https://github.com/EDM115"
      aria="EDM115's GitHub"
      style="margin-top: 16px; margin-bottom: 16px;"
    />

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <div class="showcases">
      <UiShowcase
        v-for="project in projects"
        :key="project.title"
        :link="project.link"
        :aria="project.title"
        :image="project.image"
        actions
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
        <template #actions>
          <UiButton
            v-for="action in project.actions || []"
            :key="`${project.title}-${action.text}`"
            :link="action.link"
            :text="action.text"
            :prepend-icon="action.icon"
            color="primary"
          />
        </template>
      </UiShowcase>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
import simpleNpm from "~icons/simple-icons/npm"
import simplePypi from "~icons/simple-icons/pypi"
import mdiGithub from "~icons/mdi/github"
import mdiLinkVariant from "~icons/mdi/linkVariant"

const route = useRoute()
const { isMobile } = useDevice()
const {
  locale,
  t,
} = useI18n()

useHead({
  title: t("projects.head"),
  meta: [
    {
      name: "description", content: t("projects.description"),
    },
  ],
})

useSeoMeta({
  ogTitle: t("projects.head"),
  ogDescription: t("projects.description"),
})

defineOgImageComponent("OgImage", {
  title: t("projects.head"),
  description: t("projects.description"),
  path: route.path,
})

const projects = computed(() => [
  {
    title: "unzip-bot",
    description: locale.value === "fr"
      ? "Un bot Telegram déployable sur Heroku/VPS qui peut extraire n'importe quelle archive ! Avec support des archives divisées, protégées par mot de passe, téléchargement depuis une URL, renommage de fichiers, changement de miniature, ... +40k utilisateurs, réécriture complète bientôt™ (en cours de développement depuis 4 ans à ce point), mon projet principal."
      : "A Telegram bot deployable to Heroku/VPS that can extract every archive ! With support for split archives, password protected, download from URL, file rename, thumbnail changer, ... +40k users, complete rewrite coming soon™ (been in the works for 4 years at this point), my main project.",
    link: "/projects/unzip-bot",
    image: "/img/projects/unzip-bot.webp",
    actions: [
      {
        text: t("projects.more-info"),
        link: "/unzip",
        icon: mdiLinkVariant,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/unzip-bot",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "monorepo-hash",
    description: locale.value === "fr"
      ? "Un outil en CLI pour générer des hashes pour les workspaces d'un monorepo, créé pendant un stage et surdev ensuite pour le fun."
      : "A CLI tool to generate hashes for the workspaces of a monorepo, created during an intership and over-engineered afterwards for fun.",
    link: "/projects/monorepo-hash",
    image: "/img/projects/monorepo-hash.webp",
    actions: [
      {
        text: t("projects.npm"),
        link: "https://www.npmx.dev/package/monorepo-hash",
        icon: simpleNpm,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/monorepo-hash",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Spendly",
    description: locale.value === "fr"
      ? "Une webapp de suivi de budget avec des tableaux, des stats et des graphiques. Créée pour ma copine, mon premier site où on peut vraiment s'inscrire et l'utiliser (et il y a même une démo)."
      : "A budget tracking webapp with tables, stats and charts. Made for my gf, my first website where you can actually signup and use it (and there's even a demo).",
    link: "/projects/spendly",
    image: "/img/projects/spendly.webp",
    actions: [
      {
        text: t("projects.demo"),
        link: "https://spendly.edm115.dev",
        icon: mdiLinkVariant,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/Spendly",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Better Maps",
    description: locale.value === "fr"
      ? "Google Maps mais avec des pins personnalisables sur la carte et quelques filtres/recherches. Fait pour ma copine aussi, mais pas de version publique parce que l'API n'est pas gratuite."
      : "Google Maps but there's customizable pins on the map and some filters/search. Made for my gf again, but no public version because the API ain't free.",
    link: "/projects/better-maps",
    image: "/img/projects/better-maps.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/better-maps",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "UnRAR Alpine",
    description: locale.value === "fr"
      ? "J'avais besoin d'UnRAR pour Alpine Linux (cf. le unzip-bot) et maintenant d'autres personnes en dépendent. Le créateur de RAR l'a approuvé !"
      : "I needed UnRAR for Alpine Linux (cf. the unzip-bot) and now other people depend on it. RAR's creator approved it !",
    link: "/projects/unrar-alpine",
    image: "/img/projects/unrar-alpine.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/unrar-alpine",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "edm115.dev",
    description: locale.value === "fr"
      ? "Tout simplment le site que vous êtes en train de visiter. Beaucoup de trucs faits sur mesure pour lui, allez plonger dans le code !"
      : "Basically the very website you're on right now. Lots of stuff custom-made for it, go dive into the code !",
    link: "/projects/website",
    image: "/img/projects/website.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/website",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "EDM115's OhMyPosh theme",
    description: locale.value === "fr"
      ? "Mon thème Oh My Posh, qui a eu une traction folle quand My Linux For Work l'a réutilisé dans ses dotfiles."
      : "My very own Oh My Posh theme, which got insane traction as My Linux For Work reused it in his dotfiles.",
    link: "/projects/edm115-ohmyposh-theme",
    image: "/img/projects/edm115-ohmyposh-theme.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/EDM115-ohmyposh-theme",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "palex",
    description: locale.value === "fr"
      ? "Un générateur de palettes de couleurs en JS fait pendant mon premier stage, à réécrire car il est un peu bugué."
      : "A color palette generator in JS made during my first internship, to be rewritten because it's a bit buggy.",
    link: "/projects/palex",
    image: "/img/projects/palex.webp",
    actions: [
      {
        text: t("projects.npm"),
        link: "https://www.npmx.dev/package/palex",
        icon: simpleNpm,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/palex",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "js-imports-sort",
    description: locale.value === "fr"
      ? "À l'origine un script pour trier les imports comme je le voulais, puis prévu pour être un plugin ESLint, puis OxLint, mais je vois le plugin Perfectionist et je me demande si je devrais encore le faire... Peut-être comme un projet fun d'expérimentation/apprentissage ?"
      : "Originally a script to sort imports the way I want, then planned to be an ESLint plugin, then OxLint plugin, but I see the Perfectionist plugin and I wonder if I should still make it... Maybe as a fun experiment/learning project ?",
    link: "/projects/js-imports-sort",
    image: "/img/projects/js-imports-sort.webp",
    actions: [
      {
        text: t("projects.npm"),
        link: "https://www.npmx.dev/package/js-imports-sort",
        icon: simpleNpm,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/js-imports-sort",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "booleanfix",
    description: locale.value === "fr"
      ? "Une lib Python pour utiliser les booléens en minuscules. Comme chaque langage de programmation sain."
      : "Basically a Python lib to use booleans in lowercase. Like every sane programming language.",
    link: "/projects/booleanfix",
    image: "/img/projects/booleanfix.webp",
    actions: [
      {
        text: t("projects.pypi"),
        link: "https://pypi.org/project/booleanfix/",
        icon: simplePypi,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/booleanfix",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "random_algorithm",
    description: locale.value === "fr"
      ? "Et si le hasard était généré à partir... de mots ? Bizarre mais ça marche, même si c'est lent et pas vraiment \"aléatoire\"."
      : "What if randomness was generated from... words ? Weird but it does work, although it's slow and not really \"random\".",
    link: "/projects/random-algorithm",
    image: "/img/projects/random-algorithm.webp",
    actions: [
      {
        text: t("projects.pypi"),
        link: "https://pypi.org/project/random-algorithm/",
        icon: simplePypi,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/random-algorithm",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "edm115-lint",
    description: locale.value === "fr"
      ? "Des configurations ESLint Stylistic & OxLint prêtes à l'emploi pour ne pas réécrire les mêmes trucs dans tous mes projets."
      : "Ready-to-use ESLint Stylistic & OxLint configs to not rewrite the same things in all my projects.",
    link: "/projects/edm115-lint",
    image: "/img/projects/edm115-lint.webp",
    actions: [
      {
        text: t("projects.npm"),
        link: "https://www.npmx.dev/package/edm115-lint",
        icon: simpleNpm,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/edm115-lint",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "light-odometer",
    description: locale.value === "fr"
      ? "Un fork d'un fork pour que les jolies stats que vous voyez sur la page d'accueil soient fluides et légères."
      : "A fork of a fork so the nice stats you see on the homepage are smooth and lightweight.",
    link: "/projects/light-odometer",
    image: "/img/projects/light-odometer.webp",
    actions: [
      {
        text: t("projects.npm"),
        link: "https://www.npmx.dev/package/light-odometer",
        icon: simpleNpm,
      },
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/light-odometer",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Senescalade",
    description: locale.value === "fr"
      ? "Mon tout premier projet avec Nuxt, fait avec 2 amis comme projet de fin d'année scolaire. Une webapp complète pour gérer les membres d'une association de grimpe avec toutes les fonctionnalités qu'on peut attendre."
      : "My very first project with Nuxt, made with 2 friends as an end-of-year school project. A complete webapp to manage members of a climbing association with every feature you might expect.",
    link: "/projects/senescalade",
    image: "/img/projects/senescalade.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115-org/Senescalade",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Bulk /(YouTube|Video)/ Downloader",
    description: locale.value === "fr"
      ? "Un script shell qui permet de télécharger plusieurs vidéos à la fois. Utilise yt-dlp le goat et fonctionne sur Windows & Linux. Créé à l'origine parce que quelqu'un m'a demandé comment télécharger une chaîne YT entière."
      : "A shell script that allows to download multiple videos at once. Uses yt-dlp the goat and works on Windows & Linux. Originally created as somebody asked me how to download a whole YT channel.",
    link: "/projects/bulk-youtube-download",
    image: "/img/projects/bulk-youtube-download.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/Bulk-YouTube-Download",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "VGM KHI download",
    description: locale.value === "fr"
      ? "Téléchargez tous les morceaux d'un album du site de musique de jeux vidéo KH Insider et choisissez le format (si besoin)."
      : "Download all songs from an album from KH Insider's Video Game Music site and select the format (if any).",
    link: "/projects/vgm-khi-download",
    image: "/img/projects/vgm-khi-download.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/VGM-KHI-download",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Shared files",
    description: locale.value === "fr"
      ? "Un script fait pour faciliter le travail en CI lors d'un stage que j'ai fait, en gros partager et synchroniser des fichiers à travers plusieurs repos GitHub automatiquement."
      : "A script made to ease the CI work at an internship I did, basically share and sync files across multiple GitHub repos automatically.",
    link: "/projects/shared-files",
    image: "/img/projects/shared-files.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/shared-files",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Dotfiles",
    description: locale.value === "fr"
      ? "Eh bien, ce sont des dotfiles... Pour Windows et Linux, avec quelques scripts personnalisés et même ma propre animation de démarrage Linux parce que pourquoi pas."
      : "Well, it's dotfiles... For Windows and Linux, with some custom scripts and even my very own Linux boot animation because why not.",
    link: "/projects/dotfiles",
    image: "/img/projects/dotfiles.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/dotfiles",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Web logs",
    description: locale.value === "fr"
      ? "Mes bots Discord généraient des logs, je voulais les voir sur une page sans passer par SSH, alors voilà la solution."
      : "My discord bots spat logs, I wanted to see them in one page without SSH-ing, so here is the solution.",
    link: "/projects/web-logs",
    image: "/img/projects/web-logs.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/web-logs",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Markdown Syntax FR",
    description: locale.value === "fr"
      ? "Un guide écrit en français pour écrire du Markdown, et surtout du GitHub Flavored Markdown."
      : "A guide written in French to write Markdown, and especially GitHub Flavored Markdown.",
    link: "/projects/markdown-syntax-fr",
    image: "/img/projects/markdown-syntax-fr.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/Markdown_Syntax_FR",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "Useful stuff",
    description: locale.value === "fr"
      ? "Des scripts et thèmes aléatoires que j'ai faits au fil des années qui n'ont pas de page de projet à eux seuls mais peuvent quand même être utiles à quelqu'un."
      : "Random scripts and themes I made along the years that don't deserve a whole project page but still can be useful to someone.",
    link: "/projects/useful-stuff",
    image: "/img/projects/useful-stuff.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/useful-stuff",
        icon: mdiGithub,
      },
    ],
  },
  {
    title: "The Very Restrictive License",
    description: locale.value === "fr"
      ? "Une licence bizarre faite pour le fun pendant un cours de droit."
      : "A weird license made for fun during a law course.",
    link: "/projects/the-very-restrictive-license",
    image: "/img/projects/the-very-restrictive-license.webp",
    actions: [
      {
        text: t("opensource.link"),
        link: "https://github.com/EDM115/The-Very-Restrictive-License",
        icon: mdiGithub,
      },
    ],
  },
])
</script>

<style scoped lang="scss">
.showcases {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
</style>
