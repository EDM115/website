<template>
  <UiTabs
    v-model="tab"
    align-tabs="center"
    color="primary"
  >
    <UiTab
      :text="t('opensource.pr.multiple')"
      :value="1"
    />
    <UiTab
      :text="t('opensource.issue.multiple')"
      :value="2"
    />
  </UiTabs>

  <UiTabsWindow
    v-model="tab"
    class="mt-2"
  >
    <UiTabsWindowItem
      :value="1"
    >
      <UiStepperVertical>
        <UiStepperVerticalItem
          v-for="contrib in pullRequests"
          :key="contrib.id"
          :icon="getContribIcon(contrib.state, contrib.type)"
          :bg-color="getContribColor(contrib.state, contrib.type)[1]"
          color="#eae7de"
          :subtitle="getContribName(contrib.state, contrib.type)"
          :title="contrib.name"
          :value="contrib.id"
          :class="getContribColor(contrib.state, contrib.type)[0]"
        >
          {{ contrib.description }}<br>
          <UiButton
            color="primary"
            class="mt-2"
            :prepend-icon="mdiGithub"
            :text="t('opensource.link')"
            :link="contrib.link"
            aria="GitHub link"
          />
        </UiStepperVerticalItem>
      </UiStepperVertical>
    </UiTabsWindowItem>

    <UiTabsWindowItem
      :value="2"
    >
      <UiStepperVertical>
        <UiStepperVerticalItem
          v-for="contrib in issues"
          :key="contrib.id"
          :icon="getContribIcon(contrib.state, contrib.type)"
          :bg-color="getContribColor(contrib.state, contrib.type)[1]"
          color="#eae7de"
          :subtitle="getContribName(contrib.state, contrib.type)"
          :title="contrib.name"
          :value="contrib.id"
          :class="getContribColor(contrib.state, contrib.type)[0]"
        >
          {{ contrib.description }}<br>
          <UiButton
            color="primary"
            class="mt-2"
            :prepend-icon="mdiGithub"
            :text="t('opensource.link')"
            :link="contrib.link"
            aria="GitHub link"
          />
        </UiStepperVerticalItem>
      </UiStepperVertical>
    </UiTabsWindowItem>
  </UiTabsWindow>
</template>

<script setup lang="ts">
import mdiGithub from "~icons/mdi/github"
import octiconIssueClosed from "~icons/octicon/issue-closed-16"
import octiconIssueOpened from "~icons/octicon/issue-opened-16"
import octiconPullRequest from "~icons/octicon/git-pull-request-16"
import octiconPullRequestClosed from "~icons/octicon/git-pull-request-closed-16"
import octiconPullRequestMerged from "~icons/octicon/git-merge-16"
import pajamasIssueClose from "~icons/pajamas/issue-close"

import contributions from "~/assets/data/contributions.json"

const {
  locale,
  t,
} = useI18n()

const tab = ref(1)
// https://github.com/pulls?q=is%3Apr%20author%3A%40me%20sort%3Acreated-desc
const pullRequests = computed(() => contributions.filter((c) => c.type === "pr"))
// https://github.com/issues/created?q=is%3Aissue%20author%3A%40me%20sort%3Acreated-desc
const issues = computed(() => contributions.filter((c) => c.type === "issue"))

function getContribColor(state: string, type: string) {
  if (type === "pr") {
    switch (state) {
      case "open":
        return [ "open-contrib-color", "#238636" ]
      case "closed":
        return [ "closed-contrib-color", "#AD0116" ]
      case "merged":
        return [ "merged-contrib-color", "#8957E5" ]
      default:
        return [ "closed-contrib-color", "#3D444D" ]
    }
  } else {
    switch (state) {
      case "open":
        return [ "open-contrib-color", "#238636" ]
      case "closed":
        return [ "merged-contrib-color", "#8957E5" ]
      case "ignored":
        return [ "ignored-contrib-color", "#3D444D" ]
      default:
        return [ "ignored-contrib-color", "#3D444D" ]
    }
  }
}

function getContribIcon(state: string, type: string) {
  if (type === "pr") {
    switch (state) {
      case "open":
        return octiconPullRequest
      case "closed":
        return octiconPullRequestClosed
      case "merged":
        return octiconPullRequestMerged
      default:
        return octiconPullRequestClosed
    }
  } else {
    switch (state) {
      case "open":
        return octiconIssueOpened
      case "closed":
        return octiconIssueClosed
      case "ignored":
        return pajamasIssueClose
      default:
        return pajamasIssueClose
    }
  }
}

function getContribName(state: string, type: string) {
  const name = {
    title: "",
    state: "",
  }

  if (type === "pr") {
    switch (state) {
      case "open":
        name.title = t("opensource.pr.title")
        name.state = t("opensource.pr.open")

        break
      case "closed":
        name.title = t("opensource.pr.title")
        name.state = t("opensource.pr.closed")

        break
      case "merged":
        name.title = t("opensource.pr.title")
        name.state = t("opensource.pr.merged")

        break
      default:
        return `${t("opensource.pr.unknown")}`
    }
  } else {
    switch (state) {
      case "open":
        name.title = t("opensource.issue.title")
        name.state = t("opensource.issue.open")

        break
      case "closed":
        name.title = t("opensource.issue.title")
        name.state = t("opensource.issue.closed")

        break
      case "ignored":
        name.title = t("opensource.issue.title")
        name.state = t("opensource.issue.ignored")

        break
      default:
        return `${t("opensource.issue.unknown")}`
    }
  }

  switch (locale.value) {
    case "fr":
      return `${name.title} ${name.state}`
    case "en":
      return `${name.state} ${name.title}`
    default:
      return `${name.state} ${name.title}`
  }
}
</script>

<style scoped>
.mt-2 {
  margin-top: 16px;
}

.open-contrib-color {
  background-color: #238636E6;
  color: var(--text);
}

.merged-contrib-color {
  background-color: #8957E5E6;
  color: var(--text);
}

.closed-contrib-color {
  background-color: #AD0116E6;
  color: var(--text);
}

.ignored-contrib-color {
  background-color: #3D444DE6;
  color: var(--text);
}

.ignored-contrib-color :deep(.ui-stepper-item--marker-icon) {
  rotate: -45deg;
}
</style>
