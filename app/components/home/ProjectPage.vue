<template>
  <UiReadmeRenderer
    :name="name"
    :branch="branch"
    :path="path"
  />
</template>

<script setup lang="ts">
import type {
  ImageTuple,
  ProjectData,
} from "~/types"

import projectsData from "~/assets/data/projects.json"

const props = defineProps<{
  name: string;
  image?: ImageTuple;
  glowColor?: string | false;
  branch?: string;
  path?: string;
}>()

const route = useRoute()
const { t } = useI18n()

const projects = projectsData as ProjectData[]
const title = ref(`EDM115 - ${t("projects.project")} ${props.name}`)
const description = ref(projects.find((p) => p.repo === props.name)?.description || "")

const head = useHead({
  title: `EDM115 - ${t("projects.project")} ${props.name}`,
})

useSeoMeta({
  ogTitle: () => title.value,
  ogDescription: () => description.value,
})

defineOgImage("SystemOgImageTakumi", {
  title: () => title.value,
  description: () => description.value,
  path: route.path,
  image: () => props.image,
  glowColor: () => props.glowColor,
})

function getRepoDetails() {
  const branch = props.branch ?? "master"
  const fromData = projects.find((project) => {
    return project.repo === props.name && project.branch === branch
  })

  return {
    name: fromData?.name || props.name,
    description: fromData?.description || "",
  }
}

const repoDetails = getRepoDetails()

head.patch({
  title: `EDM115 - ${t("projects.project")} ${repoDetails.name}`,
  meta: [
    {
      name: "description",
      content: repoDetails.description || `No description available for ${repoDetails.name}`,
    },
  ],
})

title.value = `EDM115 - ${t("projects.project")} ${repoDetails.name}`
description.value = repoDetails.description || `No description available for ${repoDetails.name}`
</script>
