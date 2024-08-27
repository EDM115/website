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
          class="mb-4"
          max-height="200"
          max-width="200"
          rounded="xl"
          alt="EDM115 Logo"
          src="@/assets/img/profile-img.jpg"
        />

        <h1>EDM115</h1>

        <v-divider class="my-4" />
        <v-row>
          <v-col>
            <RouterLink
              :to="{ name: 'home' }"
            >
              <v-btn
                color="secondary"
                :prepend-icon="mdiHomeOutline"
                text="Home"
                variant="elevated"
              />
            </RouterLink>
          </v-col>
          <v-col>
            <RouterLink
              :to="{ name: 'projects' }"
            >
              <v-btn
                color="secondary"
                :prepend-icon="mdiInformationOutline"
                text="Projects"
                variant="elevated"
              />
            </RouterLink>
          </v-col>
          <v-col>
            <RouterLink
              :to="{ name: 'blog' }"
            >
              <v-btn
                color="secondary"
                :prepend-icon="mdiText"
                text="Blog"
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
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>About</h2>
          </v-card-title>

          <v-card-text>
            <p>
              I'm a French developer, who like to play with different programming languages<br>Managing both studies, dev & relationship, I'm passionnated and involved into everything I try out<br><br>
              Java dev • Python enthusiast • Web dev<br>
              I mostly made things in Java, Python and HTML<br>
              You can check all my projects on my GitHub<br>
              Name : Lussandre Lederrey<br>
              Age : {{ age }}<br>
              City : Vannes, France<br>
              Website : <a
                href="https://edm115.dev"
                target="_blank"
                rel="noopener noreferrer"
              >edm115.dev</a><br>
              Email : <a
                href="mailto:dev@edm115.dev"
                target="_blank"
                rel="noopener noreferrer"
              >dev@edm115.dev</a><br>
              Birthday : 18th June<br>
              Phone : <a
                href="tel:+33667980504"
                target="_blank"
                rel="noopener noreferrer"
              >+33 6 67 98 05 04</a><br>
              Degree : Not applicable yet (I have the baccalaureate, and I'm currently in 3rd year of Computer Science)<br>
            </p>
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Stats</h2>
          </v-card-title>

          <v-card-text>
            <p>
              Here are some numbers about me<br>
              Projects made (public) : {{ projectsNumber }}<br>
              Users of my services (has yet to be refreshed through an API) : {{ servicesUsers }}<br>
              Lines of code written : {{ linesOfCode }}+<br>
              ...
            </p>
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Skills</h2>
          </v-card-title>

          <v-card-text>
            <p>
              Here's what I master (or not)<br>
              Python : 80%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="80"
              /><br>
              Java : 70%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="70"
              /><br>
              Git : 80%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="80"
              /><br>
              HTML : 85%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="85"
              /><br>
              CSS : 55%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="55"
              /><br>
              Notion : 60%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="60"
              /><br>
              Miro : 50%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="50"
              /><br>
              FL Studio : 85%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="85"
              /><br>
              Watch_Dogs : 100%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="100"
              /><br>
              Adobe softwares : 10%
              <v-progress-circular
                color="secondary"
                class="ma-2"
                model-value="10"
              />
            </p>
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Resume</h2>
          </v-card-title>

          <v-card-text>
            <p>
              What is my path ? Discover it there<br>
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
                    subtitle="Summary"
                    title="EDM115"
                    :icon="mdiAccountTieOutline"
                    :edit-icon="mdiAccountTieOutline"
                    value="1"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>I'm a developer but I'm still studying</v-list-item-title>
                        Vannes, France<br>
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
                    subtitle="Education"
                    title="BUT Computer Science"
                    :icon="mdiSchoolOutline"
                    :edit-icon="mdiSchoolOutline"
                    value="2"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2022 - 2025</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          IUT Vannes
                        </v-list-item-subtitle>
                        3 years where I learnt Java, SQL, Bash, economy, gestion, english, communication, ...
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    subtitle="Education"
                    title="BAC"
                    :icon="mdiSchoolOutline"
                    :edit-icon="mdiSchoolOutline"
                    value="3"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2019 - 2022</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          Lycée Saint-Paul, Vannes
                        </v-list-item-subtitle>
                        I learnt here the basics of programmation with Python and SQL
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>

                  <v-stepper-vertical-item
                    subtitle="Professional experience"
                    title="Internship @ Koumoul"
                    :icon="mdiBriefcaseOutline"
                    :edit-icon="mdiBriefcaseOutline"
                    value="4"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>2024</v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                          Koumoul, Vannes
                        </v-list-item-subtitle>
                        A 10 week internship where I learnt how to work in a team, how to use Docker Compose, Vue, Nuxt, ...
                      </v-list-item>
                    </v-list>
                  </v-stepper-vertical-item>
                </template>
              </v-stepper-vertical>
            </p>
            <h3 class="mt-4 mb-2">
              Download my Resume
            </h3>
            <v-btn
              class="mr-2"
              color="secondary"
              :prepend-icon="mdiFileDownload"
              text="PDF"
              href="@/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
            <v-btn
              color="secondary"
              :prepend-icon="mdiWeb"
              text="Online"
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
            />
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Projects</h2>
          </v-card-title>

          <v-card-text>
            <HomeProjects />
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Open Source contributions</h2>
          </v-card-title>

          <v-card-text>
            <HomeOpenSourceContributions />
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>Contact</h2>
          </v-card-title>

          <v-card-text>
            <p>
              A random aah contact form and uh yeah
            </p>
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto my-4"
          data-aos="fade-up"
          max-width="500"
          variant="elevated"
        >
          <v-card-title>
            <h2>EDM115 • Social links</h2>
          </v-card-title>

          <v-card-text>
            <HomeSocialLinks />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiBriefcaseOutline from "~icons/mdi/briefcaseOutline"
import mdiFileDownload from "~icons/mdi/fileDownload"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiInformationOutline from "~icons/mdi/informationOutline"
import mdiSchoolOutline from "~icons/mdi/schoolOutline"
import mdiText from "~icons/mdi/text"
import mdiWeb from "~icons/mdi/web"

import { ofetch } from "ofetch"
import { onMounted, ref } from "vue"

const age = ref(20)
// Different from what you see ? I include private repos here too :)
const projectsNumber = ref(56)
const servicesUsers = ref(34751)
const linesOfCode = ref(100000)

function getAge() {
  const birthday = new Date("2004-06-18")
  const diff = Date.now() - birthday.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

async function fetchProjectsNumber() {
  projectsNumber.value = await ofetch("https://api.github.com/users/EDM115")
    .then((data) => data.public_repos)
    .catch(() => {
      return 56
    })
}

onMounted(async () => {
  age.value = getAge()
  await fetchProjectsNumber()
})
</script>
