<template>
  <v-container>
    <v-row
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col align="center">
        <NuxtImg
          :draggable="false"
          preload
          class="mb-4 rounded-xl"
          height="200"
          width="200"
          alt="EDM115 Logo"
          src="/img/profile-img.webp"
          :placeholder="[200, 200, 50, 5]"
        />

        <h1>EDM115</h1>

        <v-divider class="my-4" />
        <v-row>
          <v-col>
            <NuxtLink
              to="/"
            >
              <v-btn
                color="primary"
                :prepend-icon="mdiHomeOutline"
                :text="t('home.home')"
                variant="elevated"
              />
            </NuxtLink>
          </v-col>
          <v-col>
            <NuxtLink
              to="/projects"
            >
              <v-btn
                color="primary"
                :prepend-icon="mdiInformationOutline"
                :text="t('home.projects')"
                variant="elevated"
              />
            </NuxtLink>
          </v-col>
          <v-col>
            <NuxtLink
              to="/blog"
            >
              <v-btn
                color="primary"
                :prepend-icon="mdiText"
                :text="t('home.blog')"
                variant="elevated"
              />
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      align="center"
      align-content="center"
      justify="center"
    >
      <v-col align="center">
        <v-card
          id="about"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#about"
                class="internal-link"
              >
                {{ t("home.about") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <p>
              {{ t("home.about1") }}<br>
              {{ t("home.about2") }}<br><br>
              {{ t("home.about3") }}<br>
              {{ t("home.about4") }}<br>
              {{ t("home.about5") }}<br>
              {{ t("home.about6") }}<br>
              {{ t("home.about7", { age }) }}<br>
              {{ t("home.about8") }}<br>
              {{ t("home.about9") }} : <NuxtLink
                to="https://edm115.dev"
                target="_blank"
              >
                edm115.dev
              </NuxtLink><br>
              {{ t("home.about10") }} : <NuxtLink
                to="mailto:dev@edm115.dev"
                target="_blank"
                external
              >
                dev@edm115.dev
              </NuxtLink><br>
              {{ t("home.about11") }}<br>
              {{ t("home.about12") }} : <NuxtLink
                to="tel:+33667980504"
                target="_blank"
                external
              >
                +33 6 67 98 05 04
              </NuxtLink><br>
              {{ t("home.about13") }}<br>
            </p>
          </v-card-text>
        </v-card>

        <v-card
          id="stats"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#stats"
                class="internal-link"
              >
                {{ t("home.stats") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeStats
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>

        <v-card
          id="skills"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#skills"
                class="internal-link"
              >
                {{ t("home.skills") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeSkills
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>

        <v-card
          id="resume"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#resume"
                class="internal-link"
              >
                {{ t("home.resume") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeResume
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>

        <v-card
          id="projects"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#projects"
                class="internal-link"
              >
                {{ t("home.projects") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeProjects
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>

        <v-card
          id="opensource"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#opensource"
                class="internal-link"
              >
                {{ t("home.oss") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeOpenSourceContributions
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>

        <v-card
          id="contact"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#contact"
                class="internal-link"
              >
                {{ t("home.contact") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeContact
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>

        <v-card
          id="social"
          class="mx-auto my-4"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <NuxtLink
                to="#social"
                class="internal-link"
              >
                EDM115 • {{ t("home.social") }}
              </NuxtLink>
            </h2>
          </v-card-title>

          <v-card-text>
            <LazyHomeSocialLinks
              :key="userLocale"
              hydrate-on-idle
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiInformationOutline from "~icons/mdi/informationOutline"
import mdiText from "~icons/mdi/text"

import { useMainStore } from "~/stores/main"

const { locale, t } = useI18n()
const store = useMainStore()

const age = ref(21)
const userLocale = computed(() => store.getI18n)

function getAge(): number {
  const birthday = new Date("2004-06-18")
  const diff = Date.now() - birthday.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

onMounted(() => {
  age.value = getAge()
  locale.value = userLocale.value
})
</script>

<style scoped>
.internal-link {
  color: inherit;
}
</style>
