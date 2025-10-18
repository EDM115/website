<template>
  <UiOdometer :stats />
</template>

<script setup lang="ts">
const { t } = useI18n()

let projectsNumber = ref(61)
const usersNumber = 50640
const projectsLoc = {
  // active
  "ban-all-except-admins": 441,
  "better-maps": 13863,
  "booleanfix": 534,
  "bulk-youtube-download": 293,
  "dotfiles": 35267,
  "EDM115": 192,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1046,
  "edm115-lint": 390,
  "EDM115-ohmyposh-theme": 671,
  "Grundy2": 6477,
  "hugo": 890,
  "jean-marie-bot": 1984,
  "js-imports-sort": 3549,
  "learning-stack": 18412,
  "light-odometer": 2651,
  "llm-benchmark-demo": 12483,
  "Markdown_Syntax_FR": 674,
  "monorepo-hash": 4560,
  "obsidian": 19813,
  "palex": 5552,
  "random-algorithm": 370491 - 370118,
  "school-codes": 3379,
  "shared-files": 381,
  "sport-track": 1582,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 512,
  "The-Very-Restrictive-License": 311,
  "unrar-alpine": 1699,
  "unzip-bot": 7161,
  "useful-stuff": 794,
  "VGM-KHI-download": 310,
  "web-logs": 303,
  "website": 21395,
  "website-export-action": 1063,

  "school-codes-v2": 885105,
  "IUT": 396155,

  // archived
  "bots-status": 214,
  "drive_uploader": 1163,
  "E5": 143,
  "EDM115-enhanced-experience": 14338,
  "feedback-bot": 25,
  "HerokuBans": 17,
  "IUT-mc-modpack": 19978,
  "nextgen-leech": 17,
  "portfolio": 72691,
  "pyrogram-heroku-template": 117 + 122,
  "sncf-wish": 86,
  "stpaul-homepage": 201,
  "TeleTest": 99,
  "TextToUrl-bot": 177,
  "underrated-producers-list": 15095,
  "vscode-extension-test": 2750,
  "Werewolf_Discord_bot": 70,
}

const stats = computed(() => [
  {
    id: 0, name: t("stats.projects"), value: projectsNumber.value,
  },
  {
    id: 1, name: t("stats.users"), value: usersNumber,
  },
  {
    id: 2,
    name: t("stats.loc"),
    value: Object.values(projectsLoc)
      .reduce((acc, cur) => acc + cur, 0),
  },
])

async function fetchProjectsNumber() {
  try {
    const { public_repos } = await $fetch<{ public_repos: number }>("https://api.github.com/users/EDM115", { headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    } })

    projectsNumber.value = public_repos
  } catch (error) {
    console.error("Failed to fetch projects number :", error)
  }
}

onMounted(async () => {
  await fetchProjectsNumber()
})
</script>
