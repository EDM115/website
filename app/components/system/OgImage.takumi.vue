<template>
  <div
    class="w-full h-full flex flex-col relative"
    :style="mainStyle"
  >
    <div
      class="flex flex-row justify-between items-center w-full"
      :style="contentRowStyle"
    >
      <div
        class="flex flex-col justify-center h-full pr-[50px]"
        :style="{ width: '65%' }"
      >
        <h1
          class="m-0 font-bold leading-tight"
          :style="titleStyle"
        >
          {{ displayTitle }}
        </h1>

        <p
          v-if="displayDescription"
          class="leading-snug"
          :style="descriptionStyle"
        >
          {{ displayDescription }}
        </p>
      </div>

      <div
        class="flex flex-col justify-center items-center h-full"
        :style="{ width: '35%' }"
      >
        <img
          :src="image[0]"
          :width="image[1]"
          :height="image[2]"
          :style="{
            width: image[1],
            height: image[2],
            borderRadius: image[1] === image[2] ? '15%' : '5px',
            objectFit: 'cover',
            border: glowColor !== false ? `5px solid #${glowColor}` : undefined,
            boxShadow: glowColor !== false ? `0 0 50px rgba(${parseInt(glowColor.slice(0, 2), 16)}, ${parseInt(glowColor.slice(2, 4), 16)}, ${parseInt(glowColor.slice(4, 6), 16)}, 0.35)` : undefined,
          }"
        >
      </div>
    </div>

    <div
      :style="{
        width: '100%',
        height: '1px',
        backgroundColor: 'rgba(234, 231, 222, 0.2)',
        marginTop: '40px',
        marginBottom: '30px',
      }"
    />

    <div
      class="flex flex-row items-center justify-center w-full"
    >
      <div
        class="flex items-center justify-center"
        :style="{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          marginRight: '20px',
          background: 'linear-gradient(135deg, #ffb86c 25%, #8be9fd 50%, #bd93f9 75%)',
        }"
      />

      <span
        class="font-medium"
        :style="{ color: '#8be9fd', fontSize: '36px', fontFamily: 'Inter500' }"
      >
        {{ cleanPath }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"

import type { ImageTuple } from "~/types"

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
  image?: ImageTuple;
  path?: string;
  domain?: string;
  glowColor?: string | false;
}>(), {
  title: undefined,
  description: undefined,
  image: () => [ "/img/system/profile-img.jpg", "500px", "500px" ] as const,
  path: undefined,
  domain: undefined,
  glowColor: "ffb86c",
})

const { t } = useI18n()

const displayTitle = computed(() => props.title || t("main.head"))
const displayDescription = computed(() => props.description || "")

const isDenseTextLayout = computed(() => {
  const titleLength = displayTitle.value.length
  const descriptionLength = displayDescription.value.length

  // Weighted score tuned for a 1920x1080 OG canvas.
  // Description tends to wrap more lines than title at this font ratio.
  const densityScore = titleLength + (descriptionLength * 0.75)

  return densityScore > 220
})
const isTitleLarge = computed(() => displayTitle.value.length > 100)

const mainStyle = computed(() => ({
  backgroundColor: "#00040e",
  color: "#eae7de",
  backgroundImage: `
    radial-gradient(1600px 900px at 80% -10%, rgba(189, 147, 249, 0.25), transparent),
    radial-gradient(1400px 700px at -10% 10%, rgba(139, 233, 253, 0.25), transparent),
    radial-gradient(1400px 900px at 50% 120%, rgba(255, 184, 108, 0.2), transparent)
  `,
  backdropFilter: "blur(40px) saturate(140%)",
  padding: "50px 80px",
  fontFamily: "Inter",
  fontWeight: 400,
  fontFeatureSettings: `
    "liga" 1, "calt" 1, "case" 1, "ccmp" 1, "cpsp" 1,
    "cv01" 1, "cv05" 1, "cv08" 1, "cv10" 1, "dlig" 1, "frac" 1, "ss01" 1,
    "ss02" 1, "ss07" 1, "ss08" 1, "tnum" 0, "zero" 1
  `,
}))

const contentRowStyle = computed(() => ({
  flex: "1",
  marginTop: isDenseTextLayout.value
    ? "-24px"
    : undefined,
  marginBottom: isDenseTextLayout.value
    ? "-24px"
    : undefined,
}))

const titleStyle = computed(() => ({
  color: "#eae7de",
  fontSize: isTitleLarge.value
    ? "72px"
    : "90px",
  overflow: isDenseTextLayout.value
    ? "visible"
    : "hidden",
  textOverflow: isDenseTextLayout.value
    ? undefined
    : "ellipsis",
  textWrap: "pretty",
  fontFamily: "Nunito",
  fontWeight: 700,
  fontFeatureSettings: `
    "liga" 1, "calt" 1, "case" 1, "ccmp" 1, "frac" 0,
    "ss01" 0, "ss02" 0,
  `,
}))

const descriptionStyle = computed(() => ({
  color: "#c7c4b6",
  fontSize: "42px",
  marginTop: isDenseTextLayout.value
    ? "30px"
    : "40px",
  overflow: isDenseTextLayout.value
    ? "visible"
    : "hidden",
  textOverflow: isDenseTextLayout.value
    ? undefined
    : "ellipsis",
  textWrap: "pretty",
  fontFamily: "Inter",
  fontWeight: 400,
  fontFeatureSettings: `
    "liga" 1, "calt" 1, "case" 1, "ccmp" 1, "cpsp" 1,
    "cv01" 1, "cv05" 1, "cv08" 1, "cv10" 1, "dlig" 1, "frac" 1, "ss01" 1,
    "ss02" 1, "ss07" 1, "ss08" 1, "tnum" 0, "zero" 1
  `,
}))

const cleanPath = computed(() => {
  const domain = props.domain || "edm115.dev"

  if (!props.path) {
    return domain
  }

  const cleaned = props.path
    .replace(/^https?:\/\//, "")
    .replace(/\?.*$/, "")
    .replace(/#.*$/, "")
    .replace(/\/$/, "")

  if (!cleaned || cleaned === "/") {
    return domain
  }

  if (cleaned.startsWith("/")) {
    return `${domain}${cleaned}`
  }

  if (!cleaned.includes(".")) {
    return `${domain}/${cleaned}`
  }

  return cleaned
})
</script>
