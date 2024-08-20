<template>
  <v-row
    align="center"
    align-content="center"
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
            to="/"
          >
            <v-btn
              color="secondary"
              prepend-icon="mdi-home-outline"
              text="Home"
              variant="elevated"
            />
          </RouterLink>
        </v-col>
        <v-col>
          <RouterLink
            to="/about"
          >
            <v-btn
              color="secondary"
              prepend-icon="mdi-information-outline"
              text="About"
              variant="elevated"
            />
          </RouterLink>
        </v-col>
        <v-col>
          <RouterLink
            to="/blog"
          >
            <v-btn
              color="secondary"
              prepend-icon="mdi-text"
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
            Website : <a href="https://edm115.dev">edm115.dev</a><br>
            Email : <a href="mailto:dev@edm115.dev">dev@edm115.dev</a><br>
            Birthday : 18th June<br>
            Phone : <a href="tel:+33667980504">+33 6 67 98 05 04</a><br>
            Degree : Not applicable yet (I have the baccalaureate, and I'm currently in 3rd year of Computer Science)<br>
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto my-4"
        max-width="500"
        variant="elevated"
      >
        <v-card-title>
          <h2>Stats</h2>
        </v-card-title>

        <v-card-text>
          <p>
            Here are some numbers about me<br>
            Projects made : {{ projectsNumber }}<br>
            Users of my services : {{ servicesUsers }}<br>
            Lines of code written : {{ linesOfCode }}+<br>
            ...
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto my-4"
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
              focusable
              editable
              eager
              hide-actions
            >
              <template #default>
                <v-stepper-vertical-item
                  subtitle="Summary"
                  title="EDM115"
                  icon="mdi-account-tie-outline"
                  edit-icon="mdi-account-tie-outline"
                  value="1"
                >
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>I'm a developer but I'm still studying</v-list-item-title>
                      Vannes, France<br>
                      <a href="mailto:dev@edm115.dev">dev@edm115.dev</a><br>
                      <a href="tel:+33667980504">+33 6 67 98 05 04</a>
                    </v-list-item>
                  </v-list>
                </v-stepper-vertical-item>

                <v-stepper-vertical-item
                  subtitle="Education"
                  title="BUT Computer Science"
                  icon="mdi-school-outline"
                  edit-icon="mdi-school-outline"
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
                  icon="mdi-school-outline"
                  edit-icon="mdi-school-outline"
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
                  icon="mdi-briefcase-outline"
                  edit-icon="mdi-briefcase-outline"
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
          <h3>Download my Resume</h3>
          <v-btn
            class="mr-2"
            color="secondary"
            prepend-icon="mdi-file-download"
            text="PDF"
            href="@/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
          />
          <v-btn
            color="secondary"
            prepend-icon="mdi-web"
            text="Online"
            href="/cv"
          />
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto my-4"
        max-width="500"
        variant="elevated"
      >
        <v-card-title>
          <h2>Projects</h2>
        </v-card-title>

        <v-card-text>
          <v-carousel
            hide-delimiter-background
            cycle
            interval="8000"
            show-arrows="hover"
          >
            <v-carousel-item
              v-for="project in projects"
              :key="project.id"
              :src="project.image"
            >
              <v-card
                variant="outlined"
                style="backdrop-filter: blur(4px);"
              >
                <v-card-title>
                  <h3>{{ project.name }}</h3>
                </v-card-title>

                <v-card-text>
                  <p>{{ project.description }}</p>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="secondary"
                    class="mr-2"
                    text="Source code"
                    :href="project.source"
                  />
                  <v-btn
                    color="secondary"
                    class="mr-2"
                    :text="project.linkText"
                    :href="project.link"
                  />
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>

      <v-card
        class="mx-auto my-4"
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
        max-width="500"
        variant="elevated"
      >
        <v-card-title>
          <h2>EDM115 • Social links</h2>
        </v-card-title>

        <v-card-text>
          <p>
            <v-tooltip
              location="top"
              text="GitHub: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-github"
                  href="https://github.com/EDM115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Telegram: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-telegram"
                  href="https://t.me/EDM115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Discord: @edm115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-discord"
                  href="https://discord.com/users/625240117560475658"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Spotify user profile"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-spotify"
                  href="https://open.spotify.com/user/6vfix5kti0ri2azoz1map7wg4"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="LinkedIn: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-linkedin"
                  href="https://www.linkedin.com/in/edm115/"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="PayPal: @8EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-paypal"
                  href="https://paypal.me/8EDM115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="BuyMeACoffee: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-buymeacoffee"
                  href="https://www.buymeacoffee.com/edm115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Reddit: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-reddit"
                  href="https://www.reddit.com/user/EDM115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Twitter: @_EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-twitter"
                  href="https://twitter.com/_EDM115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Instagram: @_EDM1.15"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-instagram"
                  href="https://instagram.com/_edm1.15"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="StackOverflow: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-stack-overflow"
                  href="https://stackoverflow.com/users/18644204"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="GitLab: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-gitlab"
                  href="https://gitlab.com/EDM115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="WhatsApp: +33 6 67 98 05 04"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-whatsapp"
                  href="https://api.whatsapp.com/send?phone=33667980504"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Dev.to: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-dev-to"
                  href="https://dev.to/edm115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Docker: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-docker"
                  href="https://hub.docker.com/u/edm115"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="RootMe: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-root-me"
                  href="https://www.root-me.org/EDM115?inc=info&lang=en"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="HackTheBox: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-hackthebox"
                  href="https://app.hackthebox.com/profile/975408"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Play Store: @EDM115"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-android"
                  href="https://play.google.com/store/apps/dev?id=7941250820238177809"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Spotify artist"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-spotify"
                  href="https://open.spotify.com/artist/3JUkM91cWeiEKiC7mXxClz"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="Apple Music"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-apple"
                  href="https://music.apple.com/fr/artist/404-dj/1537587343"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="SoundCloud"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-soundcloud"
                  href="https://soundcloud.com/404dj"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>

            <v-tooltip
              location="top"
              text="YouTube Music"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-youtube"
                  href="https://www.youtube.com/channel/UC-Qq_oK4KjY-Csae86aLhqA"
                  target="_blank"
                  variant="elevated"
                />
              </template>
            </v-tooltip>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ofetch } from "ofetch"
import { onMounted, ref } from "vue"

const age = ref(20)
const projectsNumber = ref(56)
const servicesUsers = ref(34751)
const linesOfCode = ref(100000)
const projects = ref([
  {
    id: 1,
    name: "Unzip bot",
    description: "A Telegram bot to extract various types of archives. Supports everything, downloads from URL and file, handle password protected ones. My most advanced project so far",
    image: "@/assets/img/projects/unzip-bot.jpg",
    source: "https://github.com/EDM115/unzip-bot",
    link: "/unzip",
    linkText: "edm115.dev/unzip"
  },
  {
    id: 2,
    name: "CycloNantais",
    description: "The final project of CS year 1. Includes databases, graphs, stats and a JavaFX app that packs everything",
    image: "@/assets/img/projects/nantes.png",
    source: "https://github.com/EDM115/SAE-Velos-Nantes",
    link: "https://github.com/EDM115/SAE-Velos-Nantes#how-to-start-",
    linkText: "How to start the app ?"
  },
  {
    id: 3,
    name: "Underrated producers list",
    description: "A list of underrated producers, updated every time I can. Made in collaboration with <a href=\"https://t.me/edmsamplepack\">EDM SAMPLE PACKs</a>",
    image: "@/assets/img/projects/underrated.jpg",
    source: "https://github.com/EDM115/underrated-producers-list",
    link: "https://edm115.github.io/underrated-producers-list",
    linkText: "edm115.github.io/underrated-producers-list"
  },
  {
    id: 4,
    name: "Sport Track",
    description: "A web project made for an assignment. A good occasion to learn more JS and LocalStorage",
    image: "@/assets/img/projects/sport-track.jpg",
    source: "https://github.com/EDM115/sport-track",
    link: "/sporttrack",
    linkText: "edm115.dev/sporttrack"
  },
  {
    id: 5,
    name: "Uptime",
    description: "Check at any time if our services are up. Useful if this website is down",
    image: "@/assets/img/projects/betteruptime.png",
    source: "https://betterstack.com/better-uptime",
    link: "https://up.edm115.dev",
    linkText: "up.edm115.dev"
  }
])

function getAge() {
  const birthday = new Date("2004-06-18")
  const diff = Date.now() - birthday.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

async function fetchProjectsNumber() {
  projectsNumber.value = await ofetch("https://api.github.com/users/EDM115")
    .then((data) => data.public_repos)
    .catch((err) => {
      return 56
    })
}

onMounted(async () => {
  age.value = getAge()
  await fetchProjectsNumber()
})
</script>

<style scoped>
h1, h2, h3, h4 {
  margin-top: 1rem;
}
</style>
