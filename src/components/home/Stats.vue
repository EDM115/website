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
  </v-col>
</template>

<i18n>
{
  "en": {
    "loc": "Lines of code written",
    "projects": "Projects made (public)",
    "users": "Users of my services (has yet to be refreshed through an API)"
  },
  "fr": {
    "loc": "Lignes de code écrites",
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
const projectsNumber = ref(58)

const projectsLoc = ref({
  // active
  "ban-all-except-admins": 271,
  "booleanfix": 364,
  // "boubot": 4177,
  "bulk-youtube-download": 123,
  // "cursedChess-bot": 2658,
  // "DiceWizard": 2741,
  "dotfiles": 26237,
  "EDM115": 128,
  "website": 7757,
  "website-v1": 137999,
  // "edm115.fot.one / edm115.shadd.eu.org / edm115.ethar.xyz / walad.link/edm115": 384 + 3061,
  "EDM115.github.io": 90,
  "EDM115-discord-bot": 1012,
  "EDM115-ohmyposh-theme": 489,
  "Grundy2": 6477,
  "hugo": 890,
  "jean-marie-bot": 2180,
  "js-imports-sort": 3852,
  "Markdown_Syntax_FR": 506,
  "obsidian": 5907,
  "palex": 5384,
  "random-algorithm": 203,
  "school-codes": 3379,
  "sport-track": 1582,
  "telegram-auto-upload-folder": 199,
  "telegram-backup-dump": 342,
  "The-Very-Restrictive-License": 141,
  // "ThunderBot": 2196,
  "unzip-bot": 4683,
  "useful-stuff": 614,
  "VGM-KHI-download": 140,
  "web-logs": 133,
  "school-codes-v2": 745004,
  "IUT": 458520,

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
  "Werewolf_Discord_bot": 70
})
const linesOfCode = ref(Object.values(projectsLoc.value).reduce((acc, cur) => acc + cur, 0))

const stats = ref([
  { id: 0, name: t("projects"), value: projectsNumber.value },
  { id: 1, name: t("users"), value: 39314 },
  { id: 2, name: t("loc"), value: linesOfCode }
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
    threshold: 0.8
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
