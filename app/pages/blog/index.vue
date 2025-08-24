<template>
  <UiContainer>
    <h1>{{ t("blog.title") }}</h1><br>

    <UiDivider style="margin-top: 16px; margin-bottom: 32px;" />

    <div class="showcases">
      <UiShowcase
        v-for="blog in blogPosts"
        :key="blog.id"
        :link="blog.link"
        :aria="blog.title"
      >
        <template #title>
          <h3 style="text-align: left;">
            {{ blog.title }}
          </h3>
        </template>
        <template #description>
          <p style="text-align: left;">
            {{ blog.description }}
          </p>
        </template>
      </UiShowcase>
    </div>
  </UiContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t("blog.head"),
  meta: [
    {
      name: "og:title",
      content: t("blog.head"),
    },
  ],
})

// summary prompt for GPT-5 Thinking mini :
// here is your task : based on the following blog posts, you will generate a 2 sentence summary, without revealing too much, as these 2 sentences will serve as the blog post excerpt in the blog list

const blogPosts = computed(() => [
  {
    id: 4,
    title: "How I migrated to Zod 4",
    description: "This article details my experience migrating a company monorepo to Zod v4 during my internship. It covers the challenges faced, the solutions implemented, and practical tips for developers looking to upgrade their Zod usage.",
    link: "/blog/2025/05/30/how-i-migrated-to-zod-4",
  },
  {
    id: 3,
    title: "How to send DTMF on Android",
    description: "This post shows how I implemented a reliable workaround to send DTMF during active cellular calls, using an AccessibilityService to detect the in-call UI, open the dialpad and simulate digit taps. I explain failed approaches, key pitfalls, and a robust final implementation so you can reproduce it in Kotlin (or Java), handy for assistive-tech projects that need remote control of phone calls.",
    link: "/blog/2025/01/22/how-to-send-dtmf-on-android",
  },
  {
    id: 2,
    title: "Education to Pro",
    description: "A hands-on, personal walkthrough of how I transformed a school-managed Windows Education laptop into a regular, privately controlled Windows machine, covering the migration of files, account changes and cleanup. Packed with practical tips, warnings and troubleshooting notes, it's useful if you kept a school device and want to reclaim it.",
    link: "/blog/2024/08/20/education-to-pro",
  },
  {
    id: 1,
    title: "Google ending Shared Drives",
    description: "Google is ending its Education Shared Drives unlimited-storage offering as part of a broader storage-policy change effective July 2022, a decision driven by widespread abuse and rapidly rising storage use. If you rely on Edu Shared Drives, expect many drives and links to disappear as administrators will face pooled quotas and tighter controls.",
    link: "/blog/2022/05/15/google-ending-shared-drives",
  }
])
</script>

<style lang="scss" scoped>
.showcases {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
</style>
