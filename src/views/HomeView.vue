<template>
  <v-container>
    <v-row
      align="center"
      align-content="center"
      data-aos="zoom-in"
      data-aos-delay="100"
      justify="center"
    >
      <v-col align="center">
        <v-img
          :draggable="false"
          eager
          class="mb-4"
          max-height="200"
          max-width="200"
          rounded="xl"
          alt="EDM115 Logo"
          src="@/assets/img/profile-img-resized.webp"
          rel="preload"
        />

        <h1>EDM115</h1>

        <v-divider class="my-4" />
        <v-row>
          <v-col>
            <RouterLink
              :to="{ name: 'home' }"
            >
              <v-btn
                color="primary"
                :prepend-icon="mdiHomeOutline"
                :text="t('home')"
                variant="elevated"
              />
            </RouterLink>
          </v-col>
          <v-col>
            <RouterLink
              :to="{ name: 'projects' }"
            >
              <v-btn
                color="primary"
                :prepend-icon="mdiInformationOutline"
                :text="t('projects')"
                variant="elevated"
              />
            </RouterLink>
          </v-col>
          <v-col>
            <RouterLink
              :to="{ name: 'blog' }"
            >
              <v-btn
                color="primary"
                :prepend-icon="mdiText"
                :text="t('blog')"
                variant="elevated"
              />
            </RouterLink>
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
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#about"
                class="internal-link"
              >{{ t("about") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <p>
              {{ t("about1") }}<br>
              {{ t("about2") }}<br><br>
              {{ t("about3") }}<br>
              {{ t("about4") }}<br>
              {{ t("about5") }}<br>
              {{ t("about6") }}<br>
              {{ t("about7", { age }) }}<br>
              {{ t("about8") }}<br>
              {{ t("about9") }} : <a
                href="https://edm115.dev"
                target="_blank"
                rel="noopener noreferrer"
              >edm115.dev</a><br>
              {{ t("about10") }} : <a
                href="mailto:dev@edm115.dev"
                target="_blank"
                rel="noopener noreferrer"
              >dev@edm115.dev</a><br>
              {{ t("about11") }}<br>
              {{ t("about12") }} : <a
                href="tel:+33667980504"
                target="_blank"
                rel="noopener noreferrer"
              >+33 6 67 98 05 04</a><br>
              {{ t("about13") }}<br>
            </p>
          </v-card-text>
        </v-card>

        <v-card
          id="stats"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#stats"
                class="internal-link"
              >{{ t("stats") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <HomeStats :key="userLocale" />
          </v-card-text>
        </v-card>

        <v-card
          id="skills"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#skills"
                class="internal-link"
              >{{ t("skills") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <HomeSkills :key="userLocale" />
          </v-card-text>
        </v-card>

        <v-card
          id="resume"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#resume"
                class="internal-link"
              >{{ t("resume") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <p>
              {{ t("resume1") }}<br>
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
                    :subtitle="t('resume2')"
                    title="EDM115"
                    :icon="mdiAccountTieOutline"
                    :edit-icon="mdiAccountTieOutline"
                    value="1"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>{{ t("resume3") }}</v-list-item-title>
                        {{ t("resume4") }}<br>
                        <a
                          href="mailto:dev@edm115.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >dev@edm115.dev</a><br>
                        <a
                          href="tel:+33667980504"
                          target="_blank"
                          rel="noopener noreferrer"
                        >+33 6 67 98 05 04</a>
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('resume5')"
                    :title="t('resume6')"
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
                        {{ t("resume7") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('resume5')"
                    :title="t('resume8')"
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
                        {{ t("resume9") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('resume10')"
                    :title="t('resume11')"
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
                        {{ t("resume12") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    :subtitle="t('resume10')"
                    :title="t('resume13')"
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
                        {{ t("resume14") }}
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>
                </template>
              </v-stepper-vertical>
            </p>
            <h3 class="mt-4 mb-2">
              {{ t("downloadResume") }}
            </h3>
            <v-btn
              class="mr-2"
              color="secondary"
              :prepend-icon="mdiFileDownload"
              :text="t('downloadPdf')"
              href="https://old.edm115.dev/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="secondary"
              :prepend-icon="mdiWeb"
              :text="t('downloadOnline')"
              href="https://old.edm115.dev/cv"
              target="_blank"
              rel="noopener noreferrer"
            />
          </v-card-text>
        </v-card>

        <v-card
          id="projects"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#projects"
                class="internal-link"
              >{{ t("projects") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <HomeProjects :key="userLocale" />
          </v-card-text>
        </v-card>

        <v-card
          id="opensource"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#opensource"
                class="internal-link"
              >{{ t("oss") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <HomeOpenSourceContributions :key="userLocale" />
          </v-card-text>
        </v-card>

        <v-card
          id="contact"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#contact"
                class="internal-link"
              >{{ t("contact") }}</a>
            </h2>
          </v-card-title>

          <v-card-text>
            <p class="mb-4">
              {{ t("contact1") }}<br><br>
              {{ t("contact2") }}<br>
              {{ t("contact3") }}<br>
            </p>
            <v-btn
              class="mr-2"
              color="secondary"
              :prepend-icon="mdiLink"
              :text="t('contact4')"
              href="https://old.edm115.dev"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="secondary"
              :prepend-icon="mdiLink"
              :text="t('contact5')"
              href="https://edm115.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            />
          </v-card-text>
        </v-card>

        <v-card
          id="social"
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>
              <a
                href="#social"
                class="internal-link"
              >EDM115 • {{ t("social") }}</a>
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

<i18n>
{
  "en": {
    "about": "About",
    "about1": "I'm a French developer who like to play with different programming languages",
    "about10": "Email",
    "about11": "Birthday : 18th June",
    "about12": "Phone",
    "about13": "Degree : Computer Science BUT (Bachelor of Technology), Baccalureate+3",
    "about2": "Managing both dev & relationship, I'm passionnated and involved into everything I try out",
    "about3": "Web dev • Python enthusiast • Java dev",
    "about4": "I mostly made things in Vue, Python and Java",
    "about5": "You can check all my projects on my GitHub",
    "about6": "Name : Lussandre Lederrey",
    "about7": "Age : {age} years old",
    "about8": "City : Rouen, France",
    "about9": "Website",
    "blog": "Blog",
    "contact": "Contact",
    "contact1": "Not ready yet. Email and phone number available upper, and social links below",
    "contact2": "If you reached this far, congratulations.",
    "contact3": "Here's 2 buttons : the first lead to the old version of my website, the second one is the new one but updated live at each commit",
    "contact4": "Old",
    "contact5": "Live",
    "downloadOnline": "Online",
    "downloadPdf": "PDF",
    "downloadResume": "Download my Resume",
    "home": "Home",
    "oss": "Open Source contributions",
    "projects": "Projects",
    "resume": "Resume",
    "resume1": "What is my path ? Discover it there",
    "resume2": "Summary",
    "resume3": "I'm a developer searching for a job",
    "resume4": "Rouen, France",
    "resume5": "Professional experience",
    "resume6": "Internship {'@'} Nexelec",
    "resume7": "A 16 week internship where I learnt how to work in a large team, how to use Next.js, Fastify, Terraform, InfluxDB, ...",
    "resume8": "Internship {'@'} Koumoul",
    "resume9": "A 10 week internship where I learnt how to work in a team, how to use Docker Compose, Vue, Nuxt, ...",
    "resume10": "Education",
    "resume11": "BUT Computer Science",
    "resume12": "3 years where I learnt Java, SQL, Bash, economy, gestion, english, communication, ...",
    "resume13": "BAC",
    "resume14": "I learnt here the basics of programmation with Python and SQL",
    "skills": "Skills",
    "social": "Social links",
    "stats": "Stats"
  },
  "fr": {
    "about": "À propos",
    "about1": "Je suis un développeur français qui aime jouer avec différents langages de programmation",
    "about10": "Email",
    "about11": "Anniversaire : 18 Juin",
    "about12": "Téléphone",
    "about13": "Diplôme : BUT Informatique, BAC+3",
    "about2": "Gérant à la fois le dev & ma relation, je suis passionné et impliqué dans tout ce que j'essaie",
    "about3": "Dev Web • Enthousiaste Python • Dev Java",
    "about4": "J'ai principalement fait des choses en Vue, Python et Java",
    "about5": "Vous pouvez consulter tous mes projets sur mon GitHub",
    "about6": "Nom : Lussandre Lederrey",
    "about7": "Âge : {age} ans",
    "about8": "Ville : Rouen, France",
    "about9": "Site web",
    "blog": "Blog",
    "contact": "Contact",
    "contact1": "Pas encore prêt. Email et numéro de téléphone disponibles ci-dessus, et liens sociaux ci-dessous",
    "contact2": "Si vous êtes arrivé jusqu'ici, félicitations.",
    "contact3": "Voici 2 boutons : le premier mène à l'ancienne version de mon site web, le second est la nouvelle mais mise à jour en direct à chaque commit",
    "contact4": "Ancien",
    "contact5": "En direct",
    "downloadOnline": "En ligne",
    "downloadPdf": "PDF",
    "downloadResume": "Télécharger mon CV",
    "home": "Accueil",
    "oss": "Contributions Open Source",
    "projects": "Projets",
    "resume": "CV",
    "resume1": "Quel est mon parcours ? Découvrez-le ici",
    "resume2": "Résumé",
    "resume3": "Je suis un développeur à la recherche d'un emploi",
    "resume4": "Rouen, France",
    "resume5": "Expérience professionnelle",
    "resume6": "Stage {'@'} Nexelec",
    "resume7": "Un stage de 16 semaines où j'ai appris à travailler dans une grande équipe, à utiliser Next.js, Fastify, Terraform, InfluxDB, ...",
    "resume8": "Stage {'@'} Koumoul",
    "resume9": "Un stage de 10 semaines où j'ai appris à travailler en équipe, à utiliser Docker Compose, Vue, Nuxt, ...",
    "resume10": "Éducation",
    "resume11": "BUT Informatique",
    "resume12": "3 ans où j'ai appris Java, SQL, Bash, l'économie, la gestion, l'anglais, la communication, ...",
    "resume13": "BAC",
    "resume14": "J'ai appris ici les bases de la programmation avec Python et SQL",
    "skills": "Compétences",
    "social": "Liens sociaux",
    "stats": "Stats"
  }
}
</i18n>

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
import { useMainStore } from "@/stores/main"

import { computed, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

const age = ref(20)
const store = useMainStore()
const userLocale = computed(() => store.getI18n)
const { locale, t } = useI18n()

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
