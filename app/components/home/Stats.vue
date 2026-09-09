<template>
  <UiOdometer :stats />
</template>

<script setup lang="ts">
const { t } = useI18n()

const projectsNumber = ref(120)
const usersNumber = 51275
const projectsLoc = {
  // active
  "ban-all-except-admins": 435,
  "better-maps": 14301,
  "booleanfix": 534,
  "bulk-youtube-download": 355,
  "cline-usage-tool": 6066,
  "CodexMods": 350148,  // private monorepo for now, will be split later
  "codex-usage-tool": 94047,
  "codex-sessions-viewer": 57361,
  "dashboard": 56131,
  "dotfiles": 38773,
  "EDM115": 191,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1297,
  "edm115-lint": 608,
  "edm115-npm": 143,
  "EDM115-ohmyposh-theme": 839,
  "electron-hotswap": 106745,
  "jean-marie-bot": 1238,
  "js-imports-sort": 3550,
  "learning-stack": 18412,
  "light-odometer": 3000,
  "llm-benchmark-demo": 14255,
  "lmgtfy": 8230,
  "Markdown_Syntax_FR": 674,
  "miniproto": 770296,
  "monorepo-hash": 26318,
  "MPGram": 84,
  "obsidian": 110728,
  "palex": 5536,
  "playground": 4106,
  "PZP-AI": 68911,
  "random-algorithm": 370491 - 370118,
  "shared-files": 302,
  "skills": 26128,
  "spendly": 53885,
  "teledrive-rebirth": 11,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 506,
  "The-Very-Restrictive-License": 311,
  "THOUGHTS": 1081,
  "unrar-alpine": 1654,
  "unzip-bot": 7172,
  "useful-stuff": 6242,
  "VGM-KHI-download": 310,
  "web-logs": 303,
  "website": 51477,
  "website-export-action": 1145,

  // School, mostly archived
  "battleship-cpp": 1611,
  "cinema-android": 876,
  "cluedo": 9511,
  "converter-android": 563,
  "cpp-y2": 83,
  "cpp-y3": 504,
  "devops-y3": 32,
  "dialer-android": 595,
  "epilepsy": 23,
  "Grundy": 848,
  "Grundy2": 6359,
  "hugo": 887,
  "IUT-mc-modpack": 19978,
  "java-y1": 8689,
  "java-y2": 2515,
  "java-y3": 1658,
  "krita-y3": 2895,
  "magasin-sport": 27580,
  "moncinema": 343,
  "planparfait": 12968,
  "python-y1": 2108,
  "python-y2": 23043,
  "python-y3": 26192,
  "SAE-Velos-Nantes": 3748,
  "scanwash": 678,
  "sec-y3": 1391,
  "sport-track": 1577,
  "sporttrack": 14811,
  "sql-y1": 57848,
  "sql-y2": 1940,
  "tetris-py": 614,
  "todo-android": 1286,
  "todo-webapp": 4210,
  "warehouse-py": 438,
  "weather-webapp": 9319,

  // archived
  "bots-status": 214,
  "drive_uploader": 1163,
  "E5": 143,
  "EDM115-enhanced-experience": 14338,
  "feedback-bot": 25,
  "HerokuBans": 17,
  "nextgen-leech": 17,
  "portfolio": 72691,
  "pyrogram-heroku-template": 117 + 122,
  "school-codes": 3379,
  "sncf-wish": 86,
  "stpaul-homepage": 201,
  "TeleTest": 99,
  "TextToUrl-bot": 177,
  "underrated-producers-list": 15095,
  "Werewolf_Discord_bot": 70,
}

const totalProjectsLoc = Object.values(projectsLoc)
  .reduce((acc, cur) => acc + cur, 0)

const stats = computed(() => [
  {
    id: 0, name: t("stats.projects"), value: projectsNumber,
  },
  {
    id: 1, name: t("stats.users"), value: usersNumber,
  },
  {
    id: 2, name: t("stats.loc"), value: totalProjectsLoc,
  },
])

async function fetchProjectsNumber() {
  try {
    const { public_repos } = await $fetch<{ public_repos: number }>("https://api.github.com/users/EDM115", { headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
    } })

    if (!Number.isSafeInteger(public_repos) || public_repos < 0) {
      throw new Error("Invalid public repository count")
    }

    projectsNumber.value = public_repos
  } catch (error) {
    console.error("Failed to fetch projects number :", error)
  }
}

onMounted(async () => {
  await fetchProjectsNumber()
})
</script>
