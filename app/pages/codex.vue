<template>
  <UiContainer>
    <UiAlert
      style="justify-self: center; width: 80%; margin-bottom: 2rem;"
      type="error"
    >
      <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
        <UiIcon :icon="lucideConstruction" />
        <h3 style="margin-left: 0.5rem;">
          {{ t('codex.warning') }}
        </h3>
      </div>
      {{ t('codex.explanation') }}
    </UiAlert>

    <UiDivider style="justify-self: center; width: 80%;" />

    <UiReadmeRenderer
      name="CodexMods/.github"
      path="profile/README.md"
    />
  </UiContainer>
</template>

<script setup lang="ts">
import lucideConstruction from "~icons/lucide/construction"

const route = useRoute()
const { t } = useI18n()

useHead({
  title: t("codex.head"),
  meta: [
    {
      name: "description", content: t("codex.description"),
    },
  ],
  link: [
    {
      rel: "icon", type: "image/webp", href: "/img/projects/Codex.webp",
    },
  ],
})

useSeoMeta({
  ogTitle: t("codex.head"),
  ogDescription: t("codex.description"),
})

defineOgImage("SystemOgImageTakumi", {
  title: t("codex.head"),
  description: t("codex.description"),
  path: route.path,
  image: [ "/img/system/projects/Codex.jpg", "500px", "500px" ] as const,
  glowColor: false,
})
</script>
