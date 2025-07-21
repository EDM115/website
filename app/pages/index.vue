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
            <HomeStats :key="userLocale" />
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
            <HomeSkills :key="userLocale" />
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
            <p>
              {{ t("home.resume1") }}<br>
              <v-stepper-vertical
                non-linear
                ripple
                multiple
                flat
                focusable
                editable
                eager
                hide-actions
                :mandatory="false"
              >
                <template #default>
                  <v-stepper-vertical-item
                    :subtitle="t('home.resume2')"
                    title="EDM115"
                    :icon="mdiAccountTieOutline"
                    :edit-icon="mdiAccountTieOutline"
                    value="1"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>{{ t("home.resume3") }}</v-list-item-title>
                        {{ t("home.resume4") }}<br>
                        <NuxtLink
                          to="mailto:dev@edm115.dev"
                          target="_blank"
                          external
                        >
                          dev@edm115.dev
                        </NuxtLink><br>
                        <NuxtLink
                          to="tel:+33667980504"
                          target="_blank"
                        >
                          +33 6 67 98 05 04
                        </NuxtLink>
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('home.resume5')"
                    :title="t('home.resume6')"
                    :icon="mdiBriefcaseOutline"
                    :edit-icon="mdiBriefcaseOutline"
                    value="2"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2025</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          Nexelec, Saint-Avé
                        </v-list-item-subtitle><br>
                        {{ t("home.resume7") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('home.resume5')"
                    :title="t('home.resume8')"
                    :icon="mdiBriefcaseOutline"
                    :edit-icon="mdiBriefcaseOutline"
                    value="3"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2024</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          Koumoul, Vannes
                        </v-list-item-subtitle><br>
                        {{ t("home.resume9") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('home.resume10')"
                    :title="t('home.resume11')"
                    :icon="mdiSchoolOutline"
                    :edit-icon="mdiSchoolOutline"
                    value="4"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2022 - 2025</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          IUT Vannes
                        </v-list-item-subtitle><br>
                        {{ t("home.resume12") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('home.resume10')"
                    :title="t('home.resume13')"
                    :icon="mdiSchoolOutline"
                    :edit-icon="mdiSchoolOutline"
                    value="5"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2019 - 2022</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          Lycée Saint-Paul, Vannes
                        </v-list-item-subtitle><br>
                        {{ t("home.resume14") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>
                </template>
              </v-stepper-vertical>
            </p>
            <h3 class="mt-4 mb-2">
              {{ t("home.downloadResume") }}
            </h3>
            <v-btn
              class="mr-2"
              color="secondary"
              :prepend-icon="mdiFileDownload"
              :text="t('home.downloadPdf')"
              href="https://old.edm115.dev/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="secondary"
              :prepend-icon="mdiWeb"
              :text="t('home.downloadOnline')"
              href="https://old.edm115.dev/cv"
              target="_blank"
              rel="noopener noreferrer"
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
            <HomeProjects :key="userLocale" />
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
            <HomeOpenSourceContributions :key="userLocale" />
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
            <p class="mb-4">
              {{ t("home.contact1") }}<br><br>
              {{ t("home.contact2") }}<br>
              {{ t("home.contact3") }}<br>
            </p>
            <v-btn
              class="mr-2"
              color="secondary"
              :prepend-icon="mdiLink"
              :text="t('home.contact4')"
              href="https://old.edm115.dev"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="secondary"
              :prepend-icon="mdiLink"
              :text="t('home.contact5')"
              href="https://edm115.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
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
            <HomeSocialLinks :key="userLocale" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiBriefcaseOutline from "~icons/mdi/briefcaseOutline"
import mdiFileDownload from "~icons/mdi/fileDownload"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiInformationOutline from "~icons/mdi/informationOutline"
import mdiLink from "~icons/mdi/link"
import mdiSchoolOutline from "~icons/mdi/schoolOutline"
import mdiText from "~icons/mdi/text"
import mdiWeb from "~icons/mdi/web"

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
