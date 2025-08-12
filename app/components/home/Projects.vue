<template>
  <UiCarousel
    hide-delimiters
    hide-delimiter-background
    cycle
  :interval="8000"
    show-arrows="hover"
  >
    <UiCarouselItem
      v-for="project in projects"
      :key="project.id"
      :src="project.image"
    >
      <UiCard
        variant="outlined"
        style="backdrop-filter: blur(4px) brightness(40%);"
      >
        <UiCardTitle>
          <h3>{{ project.name }}</h3>
        </UiCardTitle>

        <UiCardText style="white-space: pre-wrap;">
          {{ project.description }}
        </UiCardText>

        <UiCardActions class="d-flex flex-column">
          <UiButton
            color="primary"
            class="mr-2"
            text="Source"
            :link="project.source"
          />
          <UiButton
            v-if="project.link !== ''"
            color="secondary"
            class="mr-2"
            :link="project.link"
            :text="project.linkText"
          />
        </UiCardActions>
      </UiCard>
    </UiCarouselItem>
  </UiCarousel>
</template>

<script setup lang="ts">
import betteruptimeWebp from "/img/projects/betteruptime.webp"
import senescaladeWebp from "/img/projects/senescalade.webp"
import underratedWebp from "/img/projects/underrated.webp"
import unzipBotWebp from "/img/projects/unzip-bot.webp"
import websiteWebp from "/img/profile-img.webp"

const projects = ref([
  {
    id: 23,
    name: "Unzip bot",
    description: `
    A Telegram bot to extract various types of archives.
    Supports everything, downloads from URL and file, handle password protected archives, renames and change file's thumbnails, ...
    My most advanced project so far, with more than 30k users.
    `,
    image: unzipBotWebp,
    source: "https://github.com/EDM115/unzip-bot",
    link: "/unzip",
    linkText: "More info",
  },
  {
    id: 22,
    name: "Senescalade",
    description: `
    The final project of CS year 2.
    Includes a Nuxt webapp, an API, a MySQL database, a Docker setup, and a ton of other stuff.
    Made as an all-in-one solution to manage the members of the Séné's climbing club.
    `,
    image: senescaladeWebp,
    source: "https://github.com/EDM115-org/Senescalade",
    link: "https://senescalade.edm115.dev",
    linkText: "Live demo",
  },
  {
    id: 21,
    name: "website",
    description: `
    The source of the website you're currently on.
    Made with Nuxt, Reka UI, and more stuff to fill in the dependencies.
    Don't check the v1 branch, it's the old mess in Bootstrap (old.edm115.dev).`,
    image: websiteWebp,
    source: "https://github.com/EDM115/website",
    link: "",
    linkText: "",
  },
  {
    id: 20,
    name: "JS imports sort",
    description: `
    A JavaScript imports sorter.
    A good way to enforce my coding style.
    Currently broken and in beta, have also yet to turn it into an ESLint plugin.
    `,
    image: "https://opengraph.githubassets.com/6af5a3834d3bece8f43a033d037f85aa632d489af80fe69c0b19fb492a1aa7aa/EDM115/js-imports-sort",
    source: "https://github.com/EDM115/js-imports-sort",
    link: "https://www.npmjs.com/package/js-imports-sort",
    linkText: "Get it on NPM",
  },
  {
    id: 19,
    name: "palex",
    description: `
    A javascript package to help you create and manage color palettes.
    Still in beta.
    `,
    image: "https://repository-images.githubusercontent.com/750446367/42da27fd-2733-402c-8446-d263351cb1dc",
    source: "https://github.com/EDM115/palex",
    link: "https://www.npmjs.com/package/palex",
    linkText: "Get it on NPM",
  },
  {
    id: 18,
    name: "dotfiles",
    description: "My config files. All of them.",
    image: "https://opengraph.githubassets.com/cec72ac95dfc861834263b7be625793fefb2b350ec05347a33f38061cc4c823c/EDM115/dotfiles",
    source: "https://github.com/EDM115/dotfiles",
    link: "",
    linkText: "",
  },
  {
    id: 17,
    name: "Web logs",
    description: `
    A simple webapp in Python Flask to retrieve the logs of other apps.
    It is "password protected" haha.
    `,
    image: "https://opengraph.githubassets.com/3881e6f48defc9cc37b2850704b9fc304881b27b4862869222bdcaad5dca0f8d/EDM115/web-logs",
    source: "https://github.com/EDM115/web-logs",
    link: "",
    linkText: "",
  },
  {
    id: 16,
    name: "EDM115's OhMyPosh theme",
    description: `
    My very own Oh My Posh theme, available in 2 variants.
    I obviously use it daily.
    `,
    image: "https://repository-images.githubusercontent.com/698958959/95d62992-bf4a-4438-aea4-6ac272dfc73d",
    source: "https://github.com/EDM115/EDM115-ohmyposh-theme",
    link: "",
    linkText: "",
  },
  {
    id: 15,
    name: "school-codes-v2",
    description: "Everything I code at school (college this time).",
    image: "https://repository-images.githubusercontent.com/538086750/2729a63f-0c0d-4b43-9407-0d9412ced5f0",
    source: "https://github.com/EDM115/school-codes-v2",
    link: "",
    linkText: "",
  },
  {
    id: 14,
    name: "Telegram auto upload folder",
    description: "Automatically uploads the content of a folder to a specific chat when certain conditions are met.",
    image: "https://opengraph.githubassets.com/cac7efb190bff0f2e34fb677d2f1a3654073dfde890d627916672eb011044b2d/EDM115/telegram-auto-upload-folder",
    source: "https://github.com/EDM115/telegram-auto-upload-folder",
    link: "",
    linkText: "",
  },
  {
    id: 13,
    name: "The Very Restrictive License",
    description: `
    A joke license with absurd terms.
    If this holds up in court, I'll do a face reveal.
    `,
    image: "https://opengraph.githubassets.com/140637aa1732c628945d9a2369e625256102c762cffa63ffce3ebda7091f4c70/EDM115/The-Very-Restrictive-License",
    source: "https://github.com/EDM115/The-Very-Restrictive-License",
    link: "",
    linkText: "",
  },
  {
    id: 12,
    name: "Markdown Syntax FR",
    description: "A complete guide written in French to use Markdown at its full potential (and especially GitHub's flavored Markdown).",
    image: "https://repository-images.githubusercontent.com/453032821/fbe1b2cd-7e16-4fcb-aed0-d730b55035c3",
    source: "https://github.com/EDM115/Markdown_Syntax_FR",
    link: "",
    linkText: "",
  },
  {
    id: 11,
    name: "booleanfix",
    description: `
    A python package to make booleans lowercase just like in any reasonable language.
    Useless af but still racks up downloads.
    `,
    image: "https://repository-images.githubusercontent.com/704829178/35896259-c6f0-4312-9386-aa92d84f2c23",
    source: "https://github.com/EDM115/booleanfix",
    link: "https://pypi.org/project/booleanfix/",
    linkText: "Get it on PyPI",
  },
  {
    id: 10,
    name: "PlanParfait",
    description: `
    A todo app made in FlutterFlow for an assignment.
    Includes a login system, a FireBase database and even an APK.
    `,
    image: "https://opengraph.githubassets.com/4a6e6592ead689d999f04bbbe4be857c9094c63abb6ae72518a606997df4b0f9/EDM115/planparfait",
    source: "https://github.com/EDM115/planparfait",
    link: "https://plan-parfait.flutterflow.app/",
    linkText: "Live demo : web app (PWA)",
  },
  {
    id: 9,
    name: "CycloNantais",
    description: `
    The final project of CS year 1.
    Includes databases, graphs, stats and a JavaFX app that packs up everything.
    `,
    image: "https://opengraph.githubassets.com/cbe5b79e78b21d9a686b43d64c6e280f3c8b32760b50b734d9ee9de59c9f1f7d/EDM115/SAE-Velos-Nantes",
    source: "https://github.com/EDM115/SAE-Velos-Nantes",
    link: "",
    linkText: "",
  },
  {
    id: 8,
    name: "Telegram backup dump",
    description: `
    Backs up a whole (or not) chat/channel by forwarding to another one.
    Not working as-is.
    `,
    image: "https://opengraph.githubassets.com/c7dcb98da0c1a3b23f8c9377394dd6960beb517726e25044e06ec8e6c1047202/EDM115/telegram-backup-dump",
    source: "https://github.com/EDM115/telegram-backup-dump",
    link: "",
    linkText: "",
  },
  {
    id: 7,
    name: "Bulk youtube download",
    description: "Download all youtube videos from a playlist or a channel.",
    image: "https://repository-images.githubusercontent.com/695881219/8280c8f8-767a-44df-bea0-a864831a1225",
    source: "https://github.com/EDM115/bulk-youtube-download",
    link: "",
    linkText: "",
  },
  {
    id: 6,
    name: "Ban all except admins",
    description: `
    A bot to ban/kick all members of a Telegram chat excepting admins
    Doesn't work as-is.
    `,
    image: "https://opengraph.githubassets.com/4584e75a6dadbbfc05b2875e4b0c17b84c2b87b43027e912d6376004c833357e/EDM115/ban-all-except-admins",
    source: "https://github.com/EDM115/ban-all-except-admins",
    link: "",
    linkText: "",
  },
  {
    id: 5,
    name: "IUT mc modpack",
    description: `
    Modpack for the IUT Vannes Minecraft Server (now dead).
    Includes 100% client-side mods, shaders and textures.
    `,
    image: "https://repository-images.githubusercontent.com/694060583/0bec3bd0-9f62-4821-8784-93bc08fb55c3",
    source: "https://github.com/EDM115/IUT-mc-modpack",
    link: "https://modrinth.com/modpack/iut-vannes",
    linkText: "Modrinth page",
  },
  {
    id: 4,
    name: "EDM115's enhanced experience",
    description: `
    A Minecraft modpack made for my server (which didn't last long).
    Includes mods, shaders and textures + the world backup.
    `,
    image: "https://opengraph.githubassets.com/0388293abb189e7517d037ecf53ce2861f6037d4f235c6591229a90360c6bd42/EDM115/EDM115-enhanced-experience",
    source: "https://github.com/EDM115/EDM115-enhanced-experience",
    link: "https://modrinth.com/modpack/edm115s-enhanced-experience",
    linkText: "Modrinth page",
  },
  {
    id: 3,
    name: "Underrated producers list",
    description: `
    A list of underrated producers, now a stopped project.
    Made in collaboration with the EDM SAMPLE PACKs Telegram channel (t.me/edmsamplepack).
    `,
    image: underratedWebp,
    source: "https://github.com/EDM115/underrated-producers-list",
    link: "https://edm115.github.io/underrated-producers-list",
    linkText: "Live demo",
  },
  {
    id: 2,
    name: "Sport Track",
    description: `
    A web project made for an assignment.
    A good occasion to learn more about JS and LocalStorage.
    `,
    image: "https://opengraph.githubassets.com/75a39b08193d996f14cf532f5f8ebd3e312b787a9421e6f32c2ec128d3e8ea10/EDM115/sport-track",
    source: "https://github.com/EDM115/sport-track",
    link: "/sporttrack",
    linkText: "Live demo",
  },
  {
    id: 1,
    name: "Uptime",
    description: `
    Check at any time if our services are up.
    Useful if this website is down.
    `,
    image: betteruptimeWebp,
    source: "https://betterstack.com/better-uptime",
    link: "https://up.edm115.dev",
    linkText: "Check the uptime",
  },
])
</script>
