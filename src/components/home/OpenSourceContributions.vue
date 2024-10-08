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
              text="Link"
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
              text="Link"
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

<script setup>
import octiconIssueClosed from "~icons/octicon/issue-closed-16"
import octiconIssueOpened from "~icons/octicon/issue-opened-16"
import octiconPullRequest from "~icons/octicon/git-pull-request-16"
import octiconPullRequestMerged from "~icons/octicon/git-merge-16"

import { ref } from "vue"

const tab = ref(1)
const pullRequests = ref([
  {
    id: 19,
    name: "geode-sdk/geode",
    description: "updated french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/geode-sdk/geode/pull/1082"
  },
  {
    id: 18,
    name: "imputnet/cobalt",
    description: "web/i18n: added complete french translation",
    type: "pr",
    state: "open",
    link: "https://github.com/imputnet/cobalt/pull/726"
  },
  {
    id: 17,
    name: "AlDanial/cloc",
    description: "fix: works when ran through a symlink",
    type: "pr",
    state: "closed",
    link: "https://github.com/AlDanial/cloc/pull/850"
  },
  {
    id: 16,
    name: "SpotX-Official/SpotX",
    description: "Updated the French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/SpotX-Official/SpotX/pull/614"
  },
  {
    id: 15,
    name: "data-fair/processings",
    description: "Complete overhaul (separated Dockerfiles, Nuxt3, ...)",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/processings/pull/29"
  },
  {
    id: 14,
    name: "Rectify11/Website",
    description: "Better download button",
    type: "pr",
    state: "closed",
    link: "https://github.com/Rectify11/Website/pull/3"
  },
  {
    id: 13,
    name: "data-fair/lib",
    description: "Colors rework",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/lib/pull/3"
  },
  {
    id: 12,
    name: "data-fair/app-charts",
    description: "v1.0 : Vue3 rewrite, new features, small bugfixes, ...",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/app-charts/pull/42"
  },
  {
    id: 11,
    name: "ForzaMods/Forza-Mods-AIO",
    description: "added full French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/ForzaMods/Forza-Mods-AIO/pull/7"
  },
  {
    id: 10,
    name: "Rectify11/Installer",
    description: "updated and completed French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/pull/433"
  },
  {
    id: 9,
    name: "dracula/fl-studio-21",
    description: "update for 21.2",
    type: "pr",
    state: "closed",
    link: "https://github.com/dracula/fl-studio-21/pull/2"
  },
  {
    id: 8,
    name: "devblackops/Terminal-Icons",
    description: "Added dracula color theme",
    type: "pr",
    state: "closed",
    link: "https://github.com/devblackops/Terminal-Icons/pull/119"
  },
  {
    id: 7,
    name: "mon5termatt/medicat_installer",
    description: "added french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/mon5termatt/medicat_installer/pull/51"
  },
  {
    id: 6,
    name: "Keksuccino/JustZoom",
    description: "Smoother zoom",
    type: "pr",
    state: "closed",
    link: "https://github.com/Keksuccino/JustZoom/pull/9"
  },
  {
    id: 5,
    name: "peazip/PeaZip",
    description: "[Translation] : French translation updated/reworked",
    type: "pr",
    state: "closed",
    link: "https://github.com/peazip/PeaZip/pull/90"
  },
  {
    id: 4,
    name: "SpotX-Official/SpotX",
    description: "better french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/SpotX-Official/SpotX/pull/253"
  },
  {
    id: 3,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "Linux Method in the Readme",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/39"
  },
  {
    id: 2,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "complete reformat - better changes",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/31"
  },
  {
    id: 1,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "Better script (async)",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/30"
  }
])
const issues = ref([
  {
    id: 18,
    name: "microsft/vscode",
    description: "[BUG] Can't upgrade to 1.94",
    type: "issue",
    state: "closed",
    link: "https://github.com/microsoft/vscode/issues/227899"
  },
  {
    id: 17,
    name: "spicetify/cli",
    description: "[FEATURE REQUEST] Allow to add our own GitHub token for requests",
    type: "issue",
    state: "closed",
    link: "https://github.com/spicetify/cli/issues/3154"
  },
  {
    id: 16,
    name: "Rectify11/Installer",
    description: "[BUG] Can't install updates from commits semver",
    type: "issue",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/issues/603"
  },
  {
    id: 15,
    name: "AlDanial/cloc",
    description: "[BUG] cloc won't work if ran through a symlink on Windows (ex Winget) : Can't locate PAR.pm in @INC",
    type: "issue",
    state: "closed",
    link: "https://github.com/AlDanial/cloc/issues/849"
  },
  {
    id: 14,
    name: "marticliment/UniGetUI",
    description: "[ENHANCEMENT] Sorting a column should keep a second-level sorting",
    type: "issue",
    state: "open",
    link: "https://github.com/marticliment/UniGetUI/issues/2633"
  },
  {
    id: 13,
    name: "nodejs/node",
    description: "[BUG] Installing an update of Node removes any custom permissions of the folder (Windows) and locks the ability to update npm/corepack",
    type: "issue",
    state: "closed",
    link: "https://github.com/nodejs/node/issues/54284"
  },
  {
    id: 12,
    name: "vuetifyjs/vuetify",
    description: "[Bug Report][3.6.9] v-date-input's width doesn't size correctly when specifying percentage",
    type: "issue",
    state: "open",
    link: "https://github.com/vuetifyjs/vuetify/issues/19995"
  },
  {
    id: 11,
    name: "Rectify11/Installer",
    description: "[FEATURE REQUEST] Allow in the Rectify 11 Control center to disable MFE on startup",
    type: "issue",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/issues/563"
  },
  {
    id: 10,
    name: "marticliment/UniGetUI",
    description: "[BUG] version 3.1.0-alpha1 cannot use winget out-of the box and breaks it",
    type: "issue",
    state: "closed",
    link: "https://github.com/marticliment/UniGetUI/issues/2286"
  },
  {
    id: 9,
    name: "pyrogram/pyrogram",
    description: "[PROPOSAL] Pass the project to someone else",
    type: "issue",
    state: "open",
    link: "https://github.com/pyrogram/pyrogram/issues/1425"
  },
  {
    id: 8,
    name: "SUPERCILEX/gnome-clipboard-history",
    description: "[BUG] Upgrading to GNOME 46 breaks the extension (version mismatch ?)",
    type: "issue",
    state: "closed",
    link: "https://github.com/SUPERCILEX/gnome-clipboard-history/issues/166"
  },
  {
    id: 7,
    name: "eslint/config-inspector",
    description: "[BUG] Doesn't work when the config is outside of C: drive on Windows",
    type: "issue",
    state: "closed",
    link: "https://github.com/eslint/config-inspector/issues/47"
  },
  {
    id: 6,
    name: "marticliment/UniGetUI",
    description: "[FEATURE REQUEST] Stop auto installing chocolatey",
    type: "issue",
    state: "closed",
    link: "https://github.com/marticliment/UniGetUI/issues/2131"
  },
  {
    id: 5,
    name: "Rectify11/Installer",
    description: "[BUG] Can't natively open services",
    type: "issue",
    state: "open",
    link: "https://github.com/Rectify11/Installer/issues/513"
  },
  {
    id: 4,
    name: "python/cpython",
    description: "[BUG] Newest 3.12 install on windows misses pip",
    type: "issue",
    state: "open",
    link: "https://github.com/python/cpython/issues/117505"
  },
  {
    id: 3,
    name: "Rectify11/Installer",
    description: "[BUG] Pin to Quick access is gone from the context menu",
    type: "issue",
    state: "open",
    link: "https://github.com/Rectify11/Installer/issues/372"
  },
  {
    id: 2,
    name: "MicaForEveryone/MicaForEveryone",
    description: "Apps using MaterialDesignInXamlToolkit may not be rendered correctly everywhere",
    type: "issue",
    state: "open",
    link: "https://github.com/MicaForEveryone/MicaForEveryone/issues/380"
  },
  {
    id: 1,
    name: "matafokka/ExcelDarkThemeFix",
    description: "Performance issues with ODS",
    type: "issue",
    state: "closed",
    link: "https://github.com/matafokka/ExcelDarkThemeFix/issues/10"
  }
])

function getContribColor(state) {
  return state === "open" ? "open-contrib-color" : "closed-contrib-color"
}
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
