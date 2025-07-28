<template>
  <v-col>
    <v-row
      v-for="stat in stats"
      id="statsCounters"
      :key="stat.id"
      class="d-flex justify-center align-center"
    >
      <v-card class="ma-2">
        <v-card-title style="overflow-wrap: normal; overflow: visible; white-space: wrap;">
          {{ stat.name }}
        </v-card-title>
        <v-card-text>
          <div
            :id="'od-' + stat.id"
            class="odometer mockup-odometer"
          >
            {{ formatZeros(stat.value) }}
          </div>
        </v-card-text>
      </v-card>
    </v-row>
    <!-- <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://stats.edm115.dev/api?username=EDM115&count_private=true&show_icons=true&cache_seconds=1800&bg_color=30,833ab4,fd1d1d,fcb045&include_all_commits=True&title_color=fff&icon_color=fff&border_color=000&text_color=70ffff"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://stats.edm115.dev/api/top-langs/?username=EDM115&langs_count=10&layout=compact&theme=merko&bg_color=30,833ab4,fd1d1d,fcb045&title_color=fff&icon_color=fff&border_color=000&text_color=70ffff"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://github-readme-activity-graph.vercel.app/graph?username=EDM115&theme=dracula&line=50fa7b&point=ff79c6&area_color=f1fa8c&bg_color=282a36&color=8be9fd&title_color=8be9fd&area=true&hide_border=true&radius=8"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://github-readme-streak-stats.herokuapp.com/?user=EDM115&theme=dracula&hide_border=true&date_format=j%20M%5B%20Y%5D"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://github-profile-trophy.vercel.app/?username=EDM115&theme=dracula&no-bg=true&no-frame=true"
      />
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-img
        :draggable="false"
        src="https://lanyard.cnrad.dev/api/625240117560475658?theme=dark&bg=282a36&borderRadius=30&animated=true&idleMessage=No%20RPC%20activity%20detected&showDisplayName=true"
      />
    </v-row> -->
  </v-col>
</template>

<script setup lang="ts">
import { useMainStore } from "~/stores/main"

const { locale, t } = useI18n()
const store = useMainStore()
const userLocale = computed(() => store.getI18n)

// Different from what you see ? I include private repos here too :)
const projectsNumber = ref(65)
const usersNumber = ref(46568)
const projectsLoc = ref({
  // active
  "ban-all-except-admins": 441,
  "better-maps": 13863,
  "booleanfix": 534,
  // "boubot": 4177,
  "bulk-youtube-download": 293,
  // "cursedChess-bot": 2658,
  // "DiceWizard": 2741,
  "dotfiles": 35267,
  "EDM115": 296,
  "website": 11337,
  "website-v1": 137999,
  // "edm115.fot.one / edm115.shadd.eu.org / edm115.ethar.xyz / walad.link/edm115": 384 + 3061,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1198,
  "EDM115-ohmyposh-theme": 671,
  "Grundy2": 6477,
  "hugo": 890,
  "jean-marie-bot": 1984,
  "js-imports-sort": 3549,
  "learning-stack": 18412,
  "Markdown_Syntax_FR": 674,
  "monorepo-hash": 4101,
  "obsidian": 10246,
  "palex": 5552,
  "random-algorithm": 370491 - 370118,
  "school-codes": 3379,
  "shared-files": 381,
  "sport-track": 1582,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 512,
  "The-Very-Restrictive-License": 311,
  // "ThunderBot": 2196,
  "unrar-alpine": 1689,
  "unzip-bot": 7469,
  "useful-stuff": 794,
  "VGM-KHI-download": 310,
  "web-logs": 303,

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
})
const linesOfCode = ref(Object.values(projectsLoc.value).reduce((acc, cur) => acc + cur, 0))

const stats = ref([
  { id: 0, name: t("stats.projects"), value: projectsNumber.value },
  { id: 1, name: t("stats.users"), value: usersNumber.value },
  { id: 2, name: t("stats.loc"), value: linesOfCode.value },
])

interface OdometerInstance {
  update: (value: number)=> void
}

function formatZeros(value: number): string {
  const len = value.toString().length
  const zeros = "0".repeat(len)

  return zeros.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

let observer: IntersectionObserver | null = null
const odos = ref<OdometerInstance[]>([])

async function fetchProjectsNumber() {
  try {
    const { public_repos } = await $fetch<{ public_repos: number }>("https://api.github.com/users/EDM115", {
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    projectsNumber.value = public_repos
  } catch (error) {
    console.error("Failed to fetch projects number :", error)
  }
}

onMounted(async () => {
  locale.value = userLocale.value

  await fetchProjectsNumber()

  if (stats.value[0] !== undefined && stats.value[0].value !== projectsNumber.value) {
    stats.value[0].value = projectsNumber.value
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const idx = Number(el.id.split("-")[1])

          odos.value[idx]?.update(stats.value[idx]?.value ?? 0)
          observer?.unobserve(el)
        }
      })
    },
    { root: null, rootMargin: "0px", threshold: 0.8 },
  )

  // dynamically load tm-odometer in browser
  const TmOdometer = (await import("tm-odometer")).default

  document.querySelectorAll(".odometer").forEach((el, idx) => {
    const odo = new TmOdometer({
      el: el as HTMLElement,
      value: 0,
      animation: "slide",
      duration: 8000,
      format: "( ddd)",
    })

    el.classList.remove("mockup-odometer")
    odos.value[idx] = odo
    observer?.observe(el)
  })
})
</script>

<style lang="scss">
$borderRadius: .2em;
$padding: .15em;

.mockup-odometer {
  display: inline-block;
  position: relative;
  vertical-align: middle;

  border-radius: $borderRadius;
  margin: 0px 1px;
  padding: 0.35em $padding;

  font-family: "Fira Code", monospace;
  font-size: 3em !important;
  font-weight: 600;
  line-height: 1.2;

  background-color: var(--bg-light);
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);
  color: var(--primary);
}

.odometer.odometer-auto-theme {
  display: inline-block;
  position: relative;
  vertical-align: middle;

  border-radius: 0.5em;
  padding: 0.35em $padding;

  font-family: "Fira Code", monospace;
  font-size: 3em !important;
  font-weight: 600;
  line-height: 1.2;

  color: var(--primary);

  .odometer-digit {
    display: inline-block;
    position: relative;
    vertical-align: middle;

    margin: 0px 1px;
    padding: $padding $padding;

    background-color: var(--bg-light);
    box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);

    &:first-child {
      border-radius: $borderRadius 0 0 $borderRadius;
    }

    &:last-child {
      border-radius: 0 $borderRadius $borderRadius 0;
    }

    .odometer-digit-inner {
      display: block;
      position: absolute;

      overflow: hidden;
      padding-top: $padding;
      text-align: left;

      top: 0;
      left: $padding;
      right: 0;
      bottom: 0;
    }

    .odometer-digit-spacer {
      display: inline-block;
      vertical-align: middle;
      visibility: hidden;
    }

    .odometer-ribbon {
      display: block;
    }

    .odometer-ribbon-inner {
      display: block;
      backface-visibility: hidden;
    }

    .odometer-value {
      display: block;
      transform: translateZ(0);

      &.odometer-last-value {
        position: absolute;
      }
    }
  }

  &.odometer-animating-up .odometer-ribbon-inner,
  &.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
    transition-timing-function: ease-in-out;
  }

  &.odometer-animating-up {
    .odometer-ribbon-inner {
      transition: transform 8s;
    }

    &.odometer-animating .odometer-ribbon-inner {
      transform: translateY(-100%);
    }
  }

  &.odometer-animating-down {
    .odometer-ribbon-inner {
      transform: translateY(-100%);
    }

    &.odometer-animating .odometer-ribbon-inner {
      transition: transform 8s;
      transform: translateY(0);
    }
  }
}
</style>
