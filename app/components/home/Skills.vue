<template>
  <UiRow>
    <UiCol
      v-for="skill in skills"
      :key="skill.name"
      cols="4"
      md="6"
      lg="4"
    >
      <UiCard
        small
        variant="flat"
      >
        <template #title>
          {{ skill.name }}
        </template>

        <div class="progress-container">
          <UiProgressCircular
            :id="'skillsCounter-' + skill.id"
            color="primary"
            style="padding: 8px; --pc-duration: 3s; --pc-ease: cubic-bezier(.42,0,.58,1);"
            :model-value="skill.displayedValue"
            :size="100"
          >
            <div class="percentage">
              {{ skill.displayedValue }} %
            </div>
          </UiProgressCircular>
          <UiIcon
            :icon="skill.icon"
            class="background-icon"
          />
        </div>
      </UiCard>
    </UiCol>
  </UiRow>
</template>

<script setup lang="ts">
import logosDocker from "~icons/logos/docker-icon"
import logosJava from "~icons/logos/java"
import deviconGit from "~icons/devicon/git"
import deviconReact from "~icons/devicon/react"
import deviconMysql from "~icons/devicon/mysql"
import skillTypescript from "~icons/skill-icons/typescript"
import vscodePython from "~icons/vscode-icons/file-type-python"
import vscodeVue from "~icons/vscode-icons/file-type-vue"

import terminal from "~~/public/img/icons/terminal.svg"

let observer: IntersectionObserver | null = null

const skills = ref([
  {
    id: 0, name: "Python", value: 85, displayedValue: 0, icon: vscodePython,
  },
  {
    id: 1, name: "Java", value: 75, displayedValue: 0, icon: logosJava,
  },
  {
    id: 2, name: "React", value: 60, displayedValue: 0, icon: deviconReact,
  },
  {
    id: 3, name: "TypeScript", value: 85, displayedValue: 0, icon: skillTypescript,
  },
  {
    id: 4, name: "Vue", value: 85, displayedValue: 0, icon: vscodeVue,
  },
  {
    id: 5, name: "Docker", value: 70, displayedValue: 0, icon: logosDocker,
  },
  {
    id: 6, name: "Git", value: 90, displayedValue: 0, icon: deviconGit,
  },
  {
    id: 7, name: "SQL", value: 70, displayedValue: 0, icon: deviconMysql,
  },
  {
    id: 8, name: "Bash", value: 80, displayedValue: 0, icon: markRaw(terminal),
  },
])

function callback(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return
    }

    const [ , id ] = entry.target.id.split("-")

    if (id === undefined) {
      return
    }

    const skill = skills.value[parseInt(id)]

    if (!skill) {
      return
    }

    skill.displayedValue = skill.value

    observer?.unobserve(entry.target)
  })
}

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
})
</script>

<style scoped>
.progress-container {
  position: relative;
  display: inline-block;
  transition: all 0.5s ease-in-out;
  z-index: 2;
  overflow: hidden;
}

.background-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
}

.background-icon svg {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.progress-container:hover .background-icon {
  filter: opacity(0.8) blur(1.5px);
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.5s ease-in-out;
  z-index: 2;
}

.progress-container:hover .percentage {
  opacity: 1;
}
</style>
