<template>
  <div
    class="w-full h-full flex flex-col relative"
    :style="{
      backgroundColor: '#00040e',
      color: '#eae7de',
      backgroundImage: `
        radial-gradient(1600px 900px at 80% -10%, rgba(189, 147, 249, 0.25), transparent),
        radial-gradient(1400px 700px at -10% 10%, rgba(139, 233, 253, 0.25), transparent),
        radial-gradient(1400px 900px at 50% 120%, rgba(255, 184, 108, 0.2), transparent)
      `,
      backdropFilter: 'blur(40px) saturate(140%)',
      padding: '50px 80px',
    }"
  >
    <div
      class="flex flex-row justify-between items-center w-full"
      :style="{ flex: '1' }"
    >
      <div
        class="flex flex-col justify-center h-full pr-[50px]"
        :style="{ width: '65%' }"
      >
        <h1
          class="m-0 font-bold leading-tight"
          :style="{
            color: '#eae7de',
            fontSize: '90px',
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textWrap: 'pretty',
          }"
        >
          {{ displayTitle }}
        </h1>

        <p
          v-if="displayDescription"
          class="leading-snug"
          :style="{
            color: '#c7c4b6',
            fontSize: '42px',
            marginTop: '40px',
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textWrap: 'pretty',
          }"
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
            borderRadius: image[1] === image[2] ? '15%' : '5',
            objectFit: 'cover',
            border: glowColor !== false ? `5px solid #${glowColor}` : undefined,
            boxShadow: glowColor !== false ? `0 0 50px rgba(${parseInt(glowColor.slice(0, 2), 16)}, ${parseInt(glowColor.slice(2, 4), 16)}, ${parseInt(glowColor.slice(4, 6), 16)}, 0.35)` : undefined,
          }"
        >
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center w-full"
      :style="{
        borderTop: '1px solid rgba(234, 231, 222, 0.2)',
        paddingTop: '30px',
        marginTop: '40px',
      }"
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
        :style="{ color: '#8be9fd', fontSize: '36px' }"
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
