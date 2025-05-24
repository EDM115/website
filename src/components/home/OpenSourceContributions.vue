<template>
  <v-tabs
    v-model="tab"
    align-tabs="center"
    color="primary"
    grow
  >
    <v-tab
      text="Pull Requests"
      :value="1"
    />
    <v-tab
      text="Issues"
      :value="2"
    />
  </v-tabs>

  <v-tabs-window
    v-model="tab"
    class="mt-2"
  >
    <v-tabs-window-item
      eager
      :value="1"
    >
      <v-stepper-vertical
        non-linear
        ripple
        flat
        multiple
        focusable
        editable
        eager
        hide-actions
        :mandatory="false"
      >
        <template #default>
          <v-stepper-vertical-item
            v-for="contrib in pullRequests"
            :key="contrib.id"
            :icon="contrib.state === 'open' ? octiconPullRequest : octiconPullRequestMerged"
            :edit-icon="contrib.state === 'open' ? octiconPullRequest : octiconPullRequestMerged"
            :color="contrib.state === 'open' ? '#238636' : '#8957E5'"
            :bg-color="contrib.state === 'open' ? '#238636' : '#8957E5'"
            :subtitle="contrib.type === 'pr' ? 'Pull Request' : 'Issue'"
            :title="contrib.name"
            :value="contrib.id"
            :class="getContribColor(contrib.state)"
          >
            {{ contrib.description }}<br>
            <v-btn
              color="primary"
              class="mt-2"
              :text="t('link')"
              :href="contrib.link"
              target="_blank"
              rel="noopener noreferrer"
            />
          </v-stepper-vertical-item>
        </template>
      </v-stepper-vertical>
    </v-tabs-window-item>

    <v-tabs-window-item
      eager
      :value="2"
    >
      <v-stepper-vertical
        non-linear
        ripple
        flat
        multiple
        focusable
        editable
        eager
        hide-actions
        :mandatory="false"
      >
        <template #default>
          <v-stepper-vertical-item
            v-for="contrib in issues"
            :key="contrib.id"
            :icon="contrib.state === 'open' ? octiconIssueOpened : octiconIssueClosed"
            :edit-icon="contrib.state === 'open' ? octiconIssueOpened : octiconIssueClosed"
            :color="contrib.state === 'open' ? '#238636' : '#8957E5'"
            :bg-color="contrib.state === 'open' ? '#238636' : '#8957E5'"
            :subtitle="contrib.type === 'pr' ? 'Pull Request' : 'Issue'"
            :title="contrib.name"
            :value="contrib.id"
            :class="getContribColor(contrib.state)"
          >
            {{ contrib.description }}<br>
            <v-btn
              color="primary"
              class="mt-2"
              :text="t('link')"
              :href="contrib.link"
              target="_blank"
              rel="noopener noreferrer"
            />
          </v-stepper-vertical-item>
        </template>
      </v-stepper-vertical>
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<i18n>
{
  "en": {
    "link": "Link"
  },
  "fr": {
    "link": "Lien"
  }
}
</i18n>

<script setup lang="ts">
import octiconIssueClosed from "~icons/octicon/issue-closed-16"
import octiconIssueOpened from "~icons/octicon/issue-opened-16"
import octiconPullRequest from "~icons/octicon/git-pull-request-16"
import octiconPullRequestMerged from "~icons/octicon/git-merge-16"
import { useMainStore } from "@/stores/main"

import { computed, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

const tab = ref(1)
const pullRequests = ref([
  {
    id: 26,
    name: "KieranP/Github-Releases-Feed",
    description: "fix: Read more, login input and other buttons appears correctly on whacky Windows machines that have their global styles edited by things like Rectify11",
    type: "pr",
    state: "closed",
    link: "https://github.com/KieranP/Github-Releases-Feed/pull/16",
  },
  {
    id: 26,
    name: "Mayuri-Chan/pyrofork",
    description: "fix: properly handle FloodPremiumWait",
    type: "pr",
    state: "open",
    link: "https://github.com/Mayuri-Chan/pyrofork/pull/126",
  },
  {
    id: 25,
    name: "i18next/i18next-http-middleware",
    description: "fix: Fastify no longer complains about the type",
    type: "pr",
    state: "closed",
    link: "https://github.com/i18next/i18next-http-middleware/pull/83",
  },
  {
    id: 24,
    name: "ripienaar/free-for-dev",
    description: "chore: remove eu.org entry in Domain category",
    type: "pr",
    state: "closed",
    link: "https://github.com/ripienaar/free-for-dev/pull/3680",
  },
  {
    id: 23,
    name: "AlDanial/cloc",
    description: "feat: implement #890 and definitely solve #849",
    type: "pr",
    state: "closed",
    link: "https://github.com/AlDanial/cloc/pull/891",
  },
  {
    id: 22,
    name: "DishpitDev/Slopify",
    description: "feat: added anti-inspect",
    type: "pr",
    state: "closed",
    link: "https://github.com/DishpitDev/Slopify/pull/408",
  },
  {
    id: 21,
    name: "lifecompanionaac/lifecompanion",
    description: "feat: add PhoneControl plugin",
    type: "pr",
    state: "open",
    link: "https://github.com/lifecompanionaac/lifecompanion/pull/408",
  },
  {
    id: 20,
    name: "maksimr/vscode-kotlin",
    description: "fix: paths with spaces are handled",
    type: "pr",
    state: "open",
    link: "https://github.com/maksimr/vscode-kotlin/pull/1",
  },
  {
    id: 19,
    name: "qubvel-org/segmentation_models.pytorch",
    description: "fix(examples): correct Colab links",
    type: "pr",
    state: "closed",
    link: "https://github.com/qubvel-org/segmentation_models.pytorch/pull/965",
  },
  {
    id: 18,
    name: "geode-sdk/geode",
    description: "updated french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/geode-sdk/geode/pull/1082",
  },
  {
    id: 17,
    name: "AlDanial/cloc",
    description: "fix: works when ran through a symlink",
    type: "pr",
    state: "closed",
    link: "https://github.com/AlDanial/cloc/pull/850",
  },
  {
    id: 16,
    name: "SpotX-Official/SpotX",
    description: "Updated the French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/SpotX-Official/SpotX/pull/614",
  },
  {
    id: 15,
    name: "data-fair/processings",
    description: "Complete overhaul (separated Dockerfiles, Nuxt3, ...)",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/processings/pull/29",
  },
  {
    id: 14,
    name: "Rectify11/Website",
    description: "Better download button",
    type: "pr",
    state: "closed",
    link: "https://github.com/Rectify11/Website/pull/3",
  },
  {
    id: 13,
    name: "data-fair/lib",
    description: "Colors rework",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/lib/pull/3",
  },
  {
    id: 12,
    name: "data-fair/app-charts",
    description: "v1.0 : Vue3 rewrite, new features, small bugfixes, ...",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/app-charts/pull/42",
  },
  {
    id: 11,
    name: "ForzaMods/Forza-Mods-AIO",
    description: "added full French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/ForzaMods/Forza-Mods-AIO/pull/7",
  },
  {
    id: 10,
    name: "Rectify11/Installer",
    description: "updated and completed French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/pull/433",
  },
  {
    id: 9,
    name: "dracula/fl-studio-21",
    description: "update for 21.2",
    type: "pr",
    state: "closed",
    link: "https://github.com/dracula/fl-studio-21/pull/2",
  },
  {
    id: 8,
    name: "devblackops/Terminal-Icons",
    description: "Added dracula color theme",
    type: "pr",
    state: "closed",
    link: "https://github.com/devblackops/Terminal-Icons/pull/119",
  },
  {
    id: 7,
    name: "mon5termatt/medicat_installer",
    description: "added french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/mon5termatt/medicat_installer/pull/51",
  },
  {
    id: 6,
    name: "Keksuccino/JustZoom",
    description: "Smoother zoom",
    type: "pr",
    state: "closed",
    link: "https://github.com/Keksuccino/JustZoom/pull/9",
  },
  {
    id: 5,
    name: "peazip/PeaZip",
    description: "[Translation] : French translation updated/reworked",
    type: "pr",
    state: "closed",
    link: "https://github.com/peazip/PeaZip/pull/90",
  },
  {
    id: 4,
    name: "SpotX-Official/SpotX",
    description: "better french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/SpotX-Official/SpotX/pull/253",
  },
  {
    id: 3,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "Linux Method in the Readme",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/39",
  },
  {
    id: 2,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "complete reformat - better changes",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/31",
  },
  {
    id: 1,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "Better script (async)",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/30",
  },
])

const issues = ref([
  {
    id: 52,
    name: "fastify/fastify",
    description: "Fastify drops schemas that overlaps when using oneOf",
    type: "issue",
    state: "open",
    link: "https://github.com/fastify/fastify/issues/6133",
  },
  {
    id: 51,
    name: "JanDeDobbeleer/oh-my-posh",
    description: "Bring back the \"origin\" version when doing an upgrade",
    type: "issue",
    state: "closed",
    link: "https://github.com/JanDeDobbeleer/oh-my-posh/issues/6439",
  },
  {
    id: 50,
    name: "inocan-group/vue3-google-map",
    description: "[BUG] AdvancedMarkers that are added to the map are styled like Markers until other AdvancedMarkers are added",
    type: "issue",
    state: "open",
    link: "https://github.com/inocan-group/vue3-google-map/issues/322",
  },
  {
    id: 49,
    name: "8LWXpg/ptr",
    description: "[FEAT] Add an option in the config to not run PowerToys after an update",
    type: "issue",
    state: "closed",
    link: "https://github.com/8LWXpg/ptr/issues/17",
  },
  {
    id: 48,
    name: "getsentry/sentry-javascript",
    description: "Since v9.17.0, peer dependencies issues have been introduced",
    type: "issue",
    state: "closed",
    link: "https://github.com/getsentry/sentry-javascript/issues/16245",
  },
  {
    id: 47,
    name: "oxc-project/eslint-plugin-oxlint",
    description: "The plugin doesn't seem to care about categories",
    type: "issue",
    state: "closed",
    link: "https://github.com/oxc-project/eslint-plugin-oxlint/issues/385",
  },
  {
    id: 46,
    name: "Stirling-Tools/Stirling-PDF",
    description: "[Feature Request]: The windows installer should remember the installation folder",
    type: "issue",
    state: "open",
    link: "https://github.com/Stirling-Tools/Stirling-PDF/issues/3213",
  },
  {
    id: 45,
    name: "dracula/obsidian",
    description: "The bounding box of inline code blocks is slightly offset to the bottom",
    type: "issue",
    state: "open",
    link: "https://github.com/dracula/obsidian/issues/52",
  },
  {
    id: 44,
    name: "Codium-ai/codiumai-vscode-release",
    description: "The extension should stop adding .qodo to the .gitignore",
    type: "issue",
    state: "open",
    link: "https://github.com/Codium-ai/codiumai-vscode-release/issues/195",
  },
  {
    id: 43,
    name: "marticliment/UniGetUI",
    description: "[IMPROVEMENT] Allow to override the Winget package ID per package",
    type: "issue",
    state: "open",
    link: "https://github.com/marticliment/UniGetUI/issues/3455",
  },
  {
    id: 42,
    name: "withgraphite/year-in-code",
    description: "[FEATURE REQUEST] Let us download the video 🙏",
    type: "issue",
    state: "open",
    link: "https://github.com/withgraphite/year-in-code/issues/42",
  },
  {
    id: 41,
    name: "Stirling-Tools/Stirling-PDF",
    description: "[Bug]: The window is empty on Windows (it worked only once after the first install)",
    type: "issue",
    state: "closed",
    link: "https://github.com/Stirling-Tools/Stirling-PDF/issues/2766",
  },
  {
    id: 40,
    name: "KieranP/Github-Releases-Feed",
    description: "Ignored repositories should be an owner+repo pair to avoid collision",
    type: "issue",
    state: "closed",
    link: "https://github.com/KieranP/Github-Releases-Feed/issues/13",
  },
  {
    id: 39,
    name: "hetznercloud/cli",
    description: "Release hcloud to winget",
    type: "issue",
    state: "open",
    link: "https://github.com/hetznercloud/cli/issues/958",
  },
  {
    id: 38,
    name: "AsmSafone/HackerNews",
    description: "Display title animation only once",
    type: "issue",
    state: "closed",
    link: "https://github.com/AsmSafone/HackerNews/issues/1",
  },
  {
    id: 37,
    name: "BerriAI/litellm",
    description: "[Bug]: v1.57.5 broke Windows compatibility on litellm cli proxy",
    type: "issue",
    state: "closed",
    link: "https://github.com/BerriAI/litellm/issues/7677",
  },
  {
    id: 36,
    name: "KurimuzonAkuma/pyrogram",
    description: "Kurigram stops receiving updates after a while",
    type: "issue",
    state: "open",
    link: "https://github.com/KurimuzonAkuma/pyrogram/issues/127",
  },
  {
    id: 35,
    name: "KieranP/Github-Releases-Feed",
    description: "Bug: certain repos doesn't have their release title displayed",
    type: "issue",
    state: "closed",
    link: "https://github.com/KieranP/Github-Releases-Feed/issues/11",
  },
  {
    id: 34,
    name: "KieranP/Github-Releases-Feed",
    description: "Feature: add some kind of attribution",
    type: "issue",
    state: "closed",
    link: "https://github.com/KieranP/Github-Releases-Feed/issues/10",
  },
  {
    id: 33,
    name: "KieranP/Github-Releases-Feed",
    description: "Feature requests (random stuff to improve UX)",
    type: "issue",
    state: "closed",
    link: "https://github.com/KieranP/Github-Releases-Feed/issues/4",
  },
  {
    id: 32,
    name: "Abdenasser/neohtop",
    description: "[REQUEST] Release neohtop to winget",
    type: "issue",
    state: "open",
    link: "https://github.com/Abdenasser/neohtop/issues/127",
  },
  {
    id: 31,
    name: "JanDeDobbeleer/oh-my-posh",
    description: "[BUG] Reported installed version is wrong system-wide",
    type: "issue",
    state: "closed",
    link: "https://github.com/JanDeDobbeleer/oh-my-posh/issues/6023",
  },
  {
    id: 30,
    name: "oven-sh/bun",
    description: "[BUG] Can't upgrade bun on windows if its install directory is symlinked to another drive",
    type: "issue",
    state: "open",
    link: "https://github.com/oven-sh/bun/issues/15279",
  },
  {
    id: 29,
    name: "marticliment/UniGetUI",
    description: "[CRASH] Uniget doesn't respond for certain packages (Claude)",
    type: "issue",
    state: "open",
    link: "https://github.com/marticliment/UniGetUI/issues/2979",
  },
  {
    id: 28,
    name: "microsoft/vscode-gradle",
    description: "[FEATURE REQUEST] Ability to run a task with environment variables like in IntelliJ",
    type: "issue",
    state: "open",
    link: "https://github.com/microsoft/vscode-gradle/issues/1624",
  },
  {
    id: 27,
    name: "8LWXpg/ptr",
    description: "Support different zip structure",
    type: "issue",
    state: "closed",
    link: "https://github.com/8LWXpg/ptr/issues/10",
  },
  {
    id: 26,
    name: "8LWXpg/ptr",
    description: "[BUG] Doesn't work when PowerToys is installed in a custom location",
    type: "issue",
    state: "closed",
    link: "https://github.com/8LWXpg/ptr/issues/9",
  },
  {
    id: 25,
    name: "unplugin/unplugin-icons",
    description: "Error while loading some icons : Property \"idMap\" was accessed during render but is not defined on instance.",
    type: "issue",
    state: "closed",
    link: "https://github.com/unplugin/unplugin-icons/issues/385",
  },
  {
    id: 24,
    name: "nimsandu/spicetify-bloom",
    description: "[BUG] The download progress bar and some buttons aren't themed properly",
    type: "issue",
    state: "open",
    link: "https://github.com/nimsandu/spicetify-bloom/issues/370",
  },
  {
    id: 23,
    name: "pysathq/pysat",
    description: "[BUG] Error while installing with Python 3.13 on Windows",
    type: "issue",
    state: "closed",
    link: "https://github.com/pysathq/pysat/issues/180",
  },
  {
    id: 22,
    name: "TelegramPlayGround/pyrogram-tgcrypto",
    description: "Version agnostic builds",
    type: "issue",
    state: "closed",
    link: "https://github.com/TelegramPlayGround/pyrogram-tgcrypto/issues/1",
  },
  {
    id: 21,
    name: "wow-actions/update-authors",
    description: "[BUG] The action replaces the current entry instead of adding a new one",
    type: "issue",
    state: "open",
    link: "https://github.com/wow-actions/update-authors/issues/5",
  },
  {
    id: 20,
    name: "KRTirtho/spotube",
    description: "Stop overriding the registry value for default spotify links handler",
    type: "issue",
    state: "open",
    link: "https://github.com/KRTirtho/spotube/issues/1997",
  },
  {
    id: 19,
    name: "leonardssh/vscord",
    description: "PSA : How to make sure the extension works (VS Code's SCM issue)",
    type: "issue",
    state: "open",
    link: "https://github.com/leonardssh/vscord/issues/343",
  },
  {
    id: 18,
    name: "microsft/vscode",
    description: "[BUG] Can't upgrade to 1.94",
    type: "issue",
    state: "closed",
    link: "https://github.com/microsoft/vscode/issues/227899",
  },
  {
    id: 17,
    name: "spicetify/cli",
    description: "[FEATURE REQUEST] Allow to add our own GitHub token for requests",
    type: "issue",
    state: "closed",
    link: "https://github.com/spicetify/cli/issues/3154",
  },
  {
    id: 16,
    name: "Rectify11/Installer",
    description: "[BUG] Can't install updates from commits semver",
    type: "issue",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/issues/603",
  },
  {
    id: 15,
    name: "AlDanial/cloc",
    description: "[BUG] cloc won't work if ran through a symlink on Windows (ex Winget) : Can't locate PAR.pm in @INC",
    type: "issue",
    state: "closed",
    link: "https://github.com/AlDanial/cloc/issues/849",
  },
  {
    id: 14,
    name: "marticliment/UniGetUI",
    description: "[ENHANCEMENT] Sorting a column should keep a second-level sorting",
    type: "issue",
    state: "open",
    link: "https://github.com/marticliment/UniGetUI/issues/2633",
  },
  {
    id: 13,
    name: "nodejs/node",
    description: "[BUG] Installing an update of Node removes any custom permissions of the folder (Windows) and locks the ability to update npm/corepack",
    type: "issue",
    state: "closed",
    link: "https://github.com/nodejs/node/issues/54284",
  },
  {
    id: 12,
    name: "vuetifyjs/vuetify",
    description: "[Bug Report][3.6.9] v-date-input's width doesn't size correctly when specifying percentage",
    type: "issue",
    state: "closed",
    link: "https://github.com/vuetifyjs/vuetify/issues/19995",
  },
  {
    id: 11,
    name: "Rectify11/Installer",
    description: "[FEATURE REQUEST] Allow in the Rectify 11 Control center to disable MFE on startup",
    type: "issue",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/issues/563",
  },
  {
    id: 10,
    name: "marticliment/UniGetUI",
    description: "[BUG] version 3.1.0-alpha1 cannot use winget out-of the box and breaks it",
    type: "issue",
    state: "closed",
    link: "https://github.com/marticliment/UniGetUI/issues/2286",
  },
  {
    id: 9,
    name: "pyrogram/pyrogram",
    description: "[PROPOSAL] Pass the project to someone else",
    type: "issue",
    state: "open",
    link: "https://web.archive.org/web/20241125204558/https://github.com/pyrogram/pyrogram/issues/1425",
  },
  {
    id: 8,
    name: "SUPERCILEX/gnome-clipboard-history",
    description: "[BUG] Upgrading to GNOME 46 breaks the extension (version mismatch ?)",
    type: "issue",
    state: "closed",
    link: "https://github.com/SUPERCILEX/gnome-clipboard-history/issues/166",
  },
  {
    id: 7,
    name: "eslint/config-inspector",
    description: "[BUG] Doesn't work when the config is outside of C: drive on Windows",
    type: "issue",
    state: "closed",
    link: "https://github.com/eslint/config-inspector/issues/47",
  },
  {
    id: 6,
    name: "marticliment/UniGetUI",
    description: "[FEATURE REQUEST] Stop auto installing chocolatey",
    type: "issue",
    state: "closed",
    link: "https://github.com/marticliment/UniGetUI/issues/2131",
  },
  {
    id: 5,
    name: "Rectify11/Installer",
    description: "[BUG] Can't natively open services",
    type: "issue",
    state: "open",
    link: "https://github.com/Rectify11/Installer/issues/513",
  },
  {
    id: 4,
    name: "python/cpython",
    description: "[BUG] Newest 3.12 install on windows misses pip",
    type: "issue",
    state: "closed",
    link: "https://github.com/python/cpython/issues/117505",
  },
  {
    id: 3,
    name: "Rectify11/Installer",
    description: "[BUG] Pin to Quick access is gone from the context menu",
    type: "issue",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/issues/372",
  },
  {
    id: 2,
    name: "MicaForEveryone/MicaForEveryone",
    description: "Apps using MaterialDesignInXamlToolkit may not be rendered correctly everywhere",
    type: "issue",
    state: "open",
    link: "https://github.com/MicaForEveryone/MicaForEveryone/issues/380",
  },
  {
    id: 1,
    name: "matafokka/ExcelDarkThemeFix",
    description: "Performance issues with ODS",
    type: "issue",
    state: "closed",
    link: "https://github.com/matafokka/ExcelDarkThemeFix/issues/10",
  },
])

/**
 * Returns the color class based on the state of the contribution.
 *
 * @param {string} state - The state of the contribution ("open" or "closed").
 * @returns {string} - The color class for the contribution state ("open-contrib-color" or "closed-contrib-color").
 */
function getContribColor(state: string) {
  return state === "open" ? "open-contrib-color" : "closed-contrib-color"
}

onMounted(() => {
  locale.value = userLocale.value
})
</script>

<style scoped>
.open-contrib-color {
  background-color: #238636E6 !important;
  color: rgb(var(--v-theme-text)) !important;
}

.closed-contrib-color {
  background-color: #8957E5E6 !important;
  color: rgb(var(--v-theme-text)) !important;
}
</style>
