<template>
  <UiCol>
    <UiRow
      v-for="stat in stats"
      id="statsCounters"
      :key="stat.id"
      style="align-items: center; display: flex; justify-content: center;"
    >
      <UiCard variant="flat">
        <template #title>
          {{ stat.name }}
        </template>

        <div
          :id="'od-' + stat.id"
          class="odometer mockup-odometer"
        >
          {{ formatZeros(stat.value) }}
        </div>
      </UiCard>
    </UiRow>
  </UiCol>
</template>

<script setup lang="ts">
const { t } = useI18n()

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

// new: keep mutation observers so we re-apply grouping when odometer DOM changes
const digitObservers = ref<MutationObserver[]>([])

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

    function applyDigitGrouping(container: HTMLElement) {
      const allDigits = Array.from(container.querySelectorAll<HTMLElement>(".odometer-digit"))
      const visibleDigits = allDigits.filter((d) => {
        const val = d.querySelector<HTMLElement>(".odometer-value")?.textContent ?? ""

        return val.trim() !== ""
      })

      allDigits.forEach((d) => {
        d.classList.remove("group-left", "group-right", "both-groups")
      })

      let i = visibleDigits.length
      const groups: HTMLElement[][] = []

      while (i > 0) {
        const start = Math.max(0, i - 3)

        groups.unshift(visibleDigits.slice(start, i))
        i -= 3
      }

      groups.forEach((group) => {
        if (group.length === 1) {
          group[0]?.classList.add("both-groups")
        } else {
          group[0]?.classList.add("group-left")
          group[group.length - 1]?.classList.add("group-right")
        }
      })
    }

    applyDigitGrouping(el as HTMLElement)

    const mo = new MutationObserver(() => applyDigitGrouping(el as HTMLElement))

    mo.observe(el as HTMLElement, { childList: true, subtree: true, characterData: true })
    digitObservers.value[idx] = mo
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  digitObservers.value.forEach((m) => m.disconnect())
  digitObservers.value = []
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
  font-size: 3em;
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
  font-size: 3em;
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

    &.group-left {
      border-radius: $borderRadius 0 0 $borderRadius;
    }

    &.group-right {
      border-radius: 0 $borderRadius $borderRadius 0;
    }

    &.both-groups {
      border-radius: $borderRadius;
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
