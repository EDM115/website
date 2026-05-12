<template>
  <UiOdometer :stats />
</template>

<script setup lang="ts">
const { t } = useI18n()

const projectsNumber = ref(113)
const usersNumber = 46627
const projectsLoc = {
  // active
  "ban-all-except-admins": 435,
  "better-maps": 14301,
  "booleanfix": 534,
  "bulk-youtube-download": 320,
  "dashboard": 56131,
  "dotfiles": 35195,
  "EDM115": 191,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1294,
  "edm115-lint": 608,
  "edm115-npm": 61,
  "EDM115-ohmyposh-theme": 839,
  "jean-marie-bot": 1238,
  "js-imports-sort": 3550,
  "learning-stack": 18412,
  "light-odometer": 2534,
  "llm-benchmark-demo": 14255,
  "lmgtfy": 8230,
  "Markdown_Syntax_FR": 674,
  "monorepo-hash": 29472,
  "obsidian": 108583,
  "palex": 5536,
  "playground": 305,
  "random-algorithm": 370491 - 370118,
  "shared-files": 296,
  "skills": 24511,
  "spendly": 40197,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 506,
  "The-Very-Restrictive-License": 311,
  "unrar-alpine": 1649,
  "unzip-bot": 7172,
  "useful-stuff": 6242,
  "VGM-KHI-download": 310,
  "web-logs": 303,
  "website": 50172,
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
      "X-GitHub-Api-Version": "2026-03-10",
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
