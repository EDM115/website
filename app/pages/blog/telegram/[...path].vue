<script setup lang="ts">
const route = useRoute()

// Get the path segments from the route
const pathSegments = route.params.path as string[]
const telegramPath = pathSegments.join("/")

// Convert path to component name following the auto-import pattern
// Example: 2022/01-20-yt-bot-v3 -> BlogTelegram202201-20YtBotV3
// Remove slashes and convert to PascalCase while preserving dashes and numbers
const pathParts = telegramPath.split("/")
let componentName = "BlogTelegram"

for (const part of pathParts) {
  // For each part (year/filename), we need to handle it differently
  if ((/^\d{4}$/).test(part)) {
    // Year folder - just append the digits
    componentName += part
  } else {
    // Filename - convert to PascalCase
    // Split by dash, capitalize first letter of each word, keep numbers
    const words = part.split("-")

    for (const word of words) {
      if (word) {
        // Check if it's a number or starts with a number
        if ((/^\d+$/).test(word)) {
          componentName += word
        } else if ((/^\d/).test(word)) {
          // Starts with number (like "01"), keep as is with number
          componentName += word.charAt(0)
            .toUpperCase() + word.slice(1)
        } else {
          // Regular word - capitalize first letter
          componentName += word.charAt(0)
            .toUpperCase() + word.slice(1)
        }
      }
    }
  }
}

// Dynamically resolve the component
const components = import.meta.glob("~/components/blog/telegram/**/*.md")

// Find matching component path
const componentPath = Object.keys(components)
  .find((path) => {
    const normalized = path
      .replace("~/components/blog/telegram/", "")
      .replace(".md", "")

    return normalized === telegramPath
  })

if (!componentPath) {
  throw createError({
    statusCode: 404,
    statusMessage: "Telegram post not found",
  })
}

const TelegramPost = defineAsyncComponent(() => components[componentPath]!())

useHead({
  title: "Telegram Post - EDM115",
})
</script>

<template>
  <UiContainer>
    <Suspense>
      <component :is="TelegramPost" />
    </Suspense>
  </UiContainer>
</template>
