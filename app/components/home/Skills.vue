<template>
  <v-row>
    <v-col
      v-for="skill in skills"
      :key="skill.name"
      cols="12"
      md="6"
      lg="4"
    >
      <v-card class="ma-2">
        <v-card-title style="overflow-wrap: normal; overflow: visible; white-space: wrap;">
          {{ skill.name }}
        </v-card-title>
        <v-card-text>
          <div class="progress-container">
            <v-progress-circular
              :id="'skillsCounter-' + skill.id"
              color="primary"
              class="pa-4"
              :model-value="skill.displayedValue"
              :size="100"
              :width="10"
            >
              <template #default>
                <div class="percentage">
                  {{ skill.displayedValue }} %
                </div>
              </template>
            </v-progress-circular>
            <v-icon
              :icon="currentIcons[skill.id]"
              class="background-icon"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import chatGPT from "/img/icons/chatgpt_icon.svg?component"
import fh5 from "/img/icons/fh5_icon.svg?component"
import flStudio from "/img/icons/fl_studio_icon.svg?component"
import logosDocker from "~icons/logos/docker-icon"
import logosJava from "~icons/logos/java"
import deviconGit from "~icons/devicon/git"
import skillJavascript from "~icons/skill-icons/javascript"
// import vscodeNuxt from "~icons/vscode-icons/file-type-nuxt"
import vscodePython from "~icons/vscode-icons/file-type-python"
import vscodeVue from "~icons/vscode-icons/file-type-vue"

import { markRaw, onMounted, ref, type FunctionalComponent, type SVGAttributes } from "vue"

let observer: IntersectionObserver | null = null
const skills = ref([
  { id: 0, name: "Python", value: 85, displayedValue: 0, icon: vscodePython },
  { id: 1, name: "Java", value: 75, displayedValue: 0, icon: logosJava },
  { id: 2, name: "Git", value: 90, displayedValue: 0, icon: deviconGit },
  { id: 3, name: "JavaScript", value: 80, displayedValue: 0, icon: skillJavascript },
  // { id: 4, name: "Vue & Nuxt", value: 85, displayedValue: 0, icon: [ vscodeVue, vscodeNuxt ] },
  { id: 4, name: "Vue", value: 85, displayedValue: 0, icon: vscodeVue },
  { id: 5, name: "Docker", value: 60, displayedValue: 0, icon: logosDocker },
  { id: 6, name: "FL Studio", value: 70, displayedValue: 0, icon: markRaw(flStudio) },
  { id: 7, name: "Forza Horizon", value: 100, displayedValue: 0, icon: markRaw(fh5) },
  { id: 8, name: "ChatGPT", value: 90, displayedValue: 0, icon: markRaw(chatGPT) },
])

const currentIcons = ref<FunctionalComponent<SVGAttributes>[]>(skills.value.map((skill) => (Array.isArray(skill.icon) ? skill.icon[0] : skill.icon)))
// const iconIntervals = []

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + ((4 - (2 * t)) * t)
}

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const [ , id ] = entry.target.id.split("-")

      if (id === undefined) {
        return
      }
      const skill = skills.value[parseInt(id)]!
      const startValue = skill.displayedValue
      const endValue = skill.value
      const duration = 3000
      const startTime = performance.now()

      // skipcq: JS-0016
      function animate(time: number) {
        const elapsed = time - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeProgress = easeInOut(progress)

        skill.displayedValue = Math.floor(startValue + ((endValue - startValue) * easeProgress))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          skill.displayedValue = endValue
        }
      }

      requestAnimationFrame(animate)
      observer?.unobserve(entry.target)
    }
  })
}

/* function startIconCycle() {
  skills.value.forEach((skill, index) => {
    if (Array.isArray(skill.icon)) {
      let currentIndex = 0

      iconIntervals[index] = setInterval(() => {
        currentIndex = (currentIndex + 1) % skill.icon.length

        if (Array.isArray(skill.icon)) {
          currentIcons.value[index] = skill.icon[currentIndex]
        }
      }, 3000)
    }
  })
} */

onMounted(() => {
  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  })

  for (let i = 0; i < skills.value.length; i++) {
    const element = document.getElementById(`skillsCounter-${i}`)

    if (element) {
      observer.observe(element)
    }
  }

  // startIconCycle()
})
</script>

<style scoped>
.progress-container {
  position: relative;
  display: inline-block;
  transition: all 0.5s ease-in-out;
}

.background-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  transition: all 0.5s ease-in-out;
  z-index: -1;
}

.progress-container:hover .background-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160%;
  height: 160%;
  background-color: rgba(var(--v-theme-surface), 0.75);
  border-radius: 50%;
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
}

.progress-container:hover .percentage {
  opacity: 1;
}
</style>
