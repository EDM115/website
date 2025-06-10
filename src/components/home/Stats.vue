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
            id="container"
            class=""
          >
            <div
              id="counter"
              class="middle d-flex justify-center align-center"
            >
              <div
                v-for="(digit, index) in String(stat.value).split('')"
                :id="'digit-container-' + stat.id + '-' + ((String(stat.value).split('').length) - index - 1)"
                :key="index"
                class="numbmask"
              >
                <div
                  :id="'n' + stat.id + '-' + ((String(stat.value).split('').length) - index - 1)"
                  class="numb"
                >
                  0 1 2 3 4 5 6 7 8 9 0
                </div>
                <div class="gradmask fullframe" />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="d-flex justify-center align-center">
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
    </v-row>
  </v-col>
</template>

<i18n>
{
  "en": {
    "loc": "Lines of code in my projects",
    "projects": "Projects made (public)",
    "users": "Users of my services (has yet to be refreshed through an API)"
  },
  "fr": {
    "loc": "Lignes de code dans mes projets",
    "projects": "Projets réalisés (publics)",
    "users": "Utilisateurs de mes services (doit encore être actualisé via une API)"
  }
}
</i18n>

<script setup lang="ts">
import { useMainStore } from "@/stores/main"

import { gsap } from "gsap"
import { ofetch } from "ofetch"
import { computed, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

let observer: IntersectionObserver | null = null
// Different from what you see ? I include private repos here too :)
const projectsNumber = ref(64)

const projectsLoc = ref({
  // active
  "ban-all-except-admins": 441,
  "better-maps": 13787,
  "booleanfix": 534,
  // "boubot": 4177,
  "bulk-youtube-download": 293,
  // "cursedChess-bot": 2658,
  // "DiceWizard": 2741,
  "dotfiles": 35087,
  "EDM115": 296,
  "website": 11767,
  "website-v1": 137999,
  // "edm115.fot.one / edm115.shadd.eu.org / edm115.ethar.xyz / walad.link/edm115": 384 + 3061,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1180,
  "EDM115-ohmyposh-theme": 659,
  "Grundy2": 6477,
  "hugo": 890,
  "jean-marie-bot": 1984,
  "js-imports-sort": 4022,
  "learning-stack": 18412,
  "Markdown_Syntax_FR": 674,
  "obsidian": 9637,
  "palex": 5552,
  "random-algorithm": 370491 - 370118,
  "school-codes": 3379,
  "shared-files": 380,
  "sport-track": 1582,
  "telegram-auto-upload-folder": 369,
  "telegram-backup-dump": 512,
  "The-Very-Restrictive-License": 311,
  // "ThunderBot": 2196,
  "unrar-alpine": 1681,
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
  { id: 0, name: t("projects"), value: projectsNumber.value },
  { id: 1, name: t("users"), value: 44674 },
  { id: 2, name: t("loc"), value: linesOfCode },
])

/**
 * Asynchronously fetches the number of projects from the GitHub API for the user "EDM115".
 * Updates the value of "projectsNumber" with the retrieved number of public repositories.
 * If an error occurs during the fetch operation, the function reverts to the previous value of "projectsNumber".
 */
async function fetchProjectsNumber() {
  projectsNumber.value = await ofetch("https://api.github.com/users/EDM115")
    .then((data) => data.public_repos)
    .catch(() => projectsNumber.value)
}

/**
 * Animates the digits of a specified statistic element.
 *
 * @param {string} statId - The ID of the statistic element to animate.
 * @param {number} value - The value to display and animate as digits.
 */
function animateDigits(statId: string, value: number) {
  const digitArray = String(value).split("")
  const maxTime = 8

  const animTl = gsap.timeline({ defaults: { ease: "none" }, repeat: 0, paused: true })

  digitArray.forEach((digit, index) => {
    const totalDigits = digitArray.length
    const id = `#n${statId}-${totalDigits - index - 1}`
    const duration = (index === 0 ? maxTime : maxTime / ((2 ** index) * 2))
    const repeat = (index === 0 ? 0 : ((2 ** index) * 2) - 1)
    const movement = digit === "0" ? 800 : Number(digit) * 80

    animTl.to(id, { y: `-=${movement}`, repeat, duration }, "p1")
  })

  gsap.to(animTl, { duration: maxTime, progress: 1, ease: "power3.inOut" })

  animTl.play()
}

/**
 * Executes a callback function for each entry in the provided entries array.
 * If an entry is intersecting the viewport, retrieves the statistic element ID and value,
 * then triggers the animation of the digits for the statistic element.
 *
 * @param {IntersectionObserverEntry[]} entries - An array of entries to observe.
 */
function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statElement = entry.target
      const statId = statElement.querySelector(".numb")?.id.split("-")[0].slice(1) ?? ""
      const statValue = stats.value[parseInt(statId)].value

      animateDigits(statId, statValue)
      observer?.unobserve(entry.target)
    }
  })
}

onMounted(async () => {
  locale.value = userLocale.value

  await fetchProjectsNumber()
  stats.value[0].value = projectsNumber.value

  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  })
  document.querySelectorAll("#statsCounters").forEach((el) => observer?.observe(el))
})
</script>

<style scoped>
.middle {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.fullframe {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#container {
  position: relative;
  overflow: hidden;
  color: rgb(var(--v-theme-primary));
  width: 100%;
  height: 76px;
}

#counter {
  width: 100%;
  height: 76px;
  overflow: hidden;
  position: relative;
}

.numbmask {
  position: relative;
  margin: 0px 1px;
  height: 100%;
  width: 33px;
  background-color: rgb(var(--v-theme-background-lighten-2));
  color: rgb(var(--v-theme-primary));
  overflow: hidden;
  float: right;
  border-radius: 8px;
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.5), inset 0px -5px 5px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.numb {
  color: rgb(var(--v-theme-primary));
  text-align: center;
  font-size: 50px;
  font: "Fira Code", monospace;
  font-weight: bold;
  height: 100%;
  width: 100%;
  line-height: 80px;
  z-index: 1;
}

.gradmask {
  position: absolute;
  background: transparent;
}
</style>
