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
          <v-progress-circular
            :id="'skillsCounter-' + skill.id"
            color="secondary"
            class="pa-4"
            :model-value="skill.displayedValue"
            :size="100"
            :width="10"
          >
            <template #default>
              {{ skill.displayedValue }} %
            </template>
          </v-progress-circular>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from "vue"

let observer = null
const skills = ref([
  { id: 0, name: "Python", value: 85, displayedValue: 0 },
  { id: 1, name: "Java", value: 75, displayedValue: 0 },
  { id: 2, name: "Git", value: 90, displayedValue: 0 },
  { id: 3, name: "JavaScript", value: 80, displayedValue: 0 },
  { id: 4, name: "Vue & Nuxt", value: 85, displayedValue: 0 },
  { id: 5, name: "Docker", value: 60, displayedValue: 0 },
  { id: 6, name: "Pyrogram", value: 85, displayedValue: 0 },
  { id: 7, name: "FL Studio", value: 70, displayedValue: 0 },
  { id: 8, name: "Forza Horizon", value: 100, displayedValue: 0 },
  { id: 9, name: "ChatGPT", value: 90, displayedValue: 0 }
])

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + ((4 - (2 * t)) * t)
}

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id.split("-")[1]
      const skill = skills.value[id]
      const startValue = skill.displayedValue
      const endValue = skill.value
      const duration = 4000
      const startTime = performance.now()

      function animate(time) {
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
      observer.unobserve(entry.target)
    }
  })
}

onMounted(() => {
  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8
  })

  for (let i = 0; i < skills.value.length; i++) {
    observer.observe(document.getElementById("skillsCounter-" + i))
  }
})
</script>
