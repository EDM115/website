<template>
  <UiOdometer :stats />
</template>

<script setup lang="ts">
const { t } = useI18n()

const projectsNumber = ref(68)
const usersNumber = 43954
const projectsLoc = {
  // active
  "ban-all-except-admins": 441,
  "better-maps": 14301,
  "booleanfix": 534,
  "bulk-youtube-download": 317,
  "dotfiles": 35195,
  "EDM115": 192,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1046,
  "edm115-lint": 394,
  "EDM115-ohmyposh-theme": 839,
  "jean-marie-bot": 1984,
  "js-imports-sort": 3549,
  "learning-stack": 18412,
  "light-odometer": 2472,
  "llm-benchmark-demo": 14173,
  "Markdown_Syntax_FR": 674,
  "monorepo-hash": 9448,
  "obsidian": 108736,
  "palex": 5552,
  "random-algorithm": 370491 - 370118,
  "shared-files": 296,
  "spendly": 38755,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 512,
  "The-Very-Restrictive-License": 311,
  "unrar-alpine": 1640,
  "unzip-bot": 7161,
  "useful-stuff": 1021,
  "VGM-KHI-download": 310,
  "web-logs": 303,
  "website": 32737,
  "website-export-action": 1063,

  "school-codes-v2": 885105,
  "IUT": 396155,

  // archived
  "bots-status": 214,
  "drive_uploader": 1163,
  "E5": 143,
  "EDM115-enhanced-experience": 14338,
  "feedback-bot": 25,
  "Grundy2": 6477,
  "HerokuBans": 17,
  "hugo": 890,
  "IUT-mc-modpack": 19978,
  "nextgen-leech": 17,
  "portfolio": 72691,
  "pyrogram-heroku-template": 117 + 122,
  "SAE-Velos-Nantes": 5958,
  "school-codes": 3379,
  "sncf-wish": 86,
  "sport-track": 1582,
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
