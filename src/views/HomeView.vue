<template>
  <v-container>
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
              >edm115.dev</a><br>
              Email : <a
                href="mailto:dev@edm115.dev"
                target="_blank"
              >dev@edm115.dev</a><br>
              Birthday : 18th June<br>
              Phone : <a
                href="tel:+33667980504"
                target="_blank"
              >+33 6 67 98 05 04</a><br>
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
              Projects made (public) : {{ projectsNumber }}<br>
              Users of my services (has yet to be refreshed through an API) : {{ servicesUsers }}<br>
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
                        <a href="mailto:dev@edm115.dev">dev@edm115.dev</a><br>
                        <a href="tel:+33667980504">+33 6 67 98 05 04</a>
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
            <h3>Download my Resume</h3>
            <v-btn
              class="mr-2"
              color="secondary"
              :prepend-icon="mdiFileDownload"
              text="PDF"
              href="@/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
              target="_blank"
            />
            <v-btn
              color="secondary"
              :prepend-icon="mdiWeb"
              text="Online"
              href="/cv"
              target="_blank"
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
                  style="backdrop-filter: blur(4px) brightness(40%);"
                >
                  <v-card-title>
                    <h3>{{ project.name }}</h3>
                  </v-card-title>

                  <v-card-text>
                    <span v-html="project.description" />
                  </v-card-text>

                  <v-card-actions class="d-flex flex-column">
                    <v-btn
                      color="primary"
                      class="mr-2"
                      text="Source code"
                      target="_blank"
                      :href="project.source"
                    />
                    <v-btn
                      color="primary"
                      class="mr-2"
                      target="_blank"
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
            <h2>Open Source contributions</h2>
          </v-card-title>

          <v-card-text>
            <v-stepper-vertical
              non-linear
              ripple
              flat
              multiple
              focusable
              editable
              eager
              hide-actions
              :mandatory="false"
            >
              <template #default>
                <v-stepper-vertical-item
                  v-for="contrib in contributions"
                  :key="contrib.id"
                  :icon="contrib.icon"
                  :edit-icon="contrib.icon"
                  :color="contrib.state === 'open' ? '#238636' : '#8957E5'"
                  :bg-color="contrib.state === 'open' ? '#238636' : '#8957E5'"
                  :subtitle="contrib.type === 'pr' ? 'Pull Request' : 'Issue'"
                  :title="contrib.name"
                  :value="contrib.id"
                  :class="getContribColor(contrib.state)"
                >
                  {{ contrib.description }}<br>
                  <v-btn
                    color="primary"
                    text="Link"
                    :href="contrib.link"
                    target="_blank"
                  />
                </v-stepper-vertical-item>
              </template>
            </v-stepper-vertical>
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
                text="GitHub"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiGithub"
                    href="https://github.com/EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Telegram"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="icBaselineTelegram"
                    href="https://t.me/EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Discord"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="icBaselineDiscord"
                    href="https://discord.com/users/625240117560475658"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Spotify"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiSpotify"
                    href="https://open.spotify.com/user/6vfix5kti0ri2azoz1map7wg4"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="LinkedIn"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiLinkedin"
                    href="https://www.linkedin.com/in/edm115/"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="PayPal"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiPaypal"
                    href="https://paypal.me/8EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="BuyMeACoffee"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="simpleIconsBuymeacoffee"
                    href="https://www.buymeacoffee.com/edm115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Reddit"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiReddit"
                    href="https://www.reddit.com/user/EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="𝕏"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="pajamasTwitter"
                    href="https://x.com/_EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Instagram"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiInstagram"
                    href="https://instagram.com/_edm1.15"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="StackOverflow"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiStackOverflow"
                    href="https://stackoverflow.com/users/18644204"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="GitLab"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="phGitlab"
                    href="https://gitlab.com/EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="WhatsApp"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiWhatsapp"
                    href="https://api.whatsapp.com/send?phone=33667980504"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Dev.to"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiDevTo"
                    href="https://dev.to/edm115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="Docker Hub"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiDocker"
                    href="https://hub.docker.com/u/edm115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="RootMe"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="simpleIconsRootme"
                    href="https://www.root-me.org/EDM115?inc=info&lang=en"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="HackTheBox"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="simpleIconsHackthebox"
                    href="https://app.hackthebox.com/profile/975408"
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
                    :icon="hugeIconsSpotify"
                    href="https://open.spotify.com/artist/5O33If0zoso9G3RkEKrERI"
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
                    :icon="simpleIconsAppleMusic"
                    href="https://music.apple.com/fr/artist/edm115/1716756983"
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
                    :icon="mdiSoundcloud"
                    href="https://soundcloud.com/EDM115"
                    target="_blank"
                    variant="elevated"
                  />
                </template>
              </v-tooltip>

              <v-tooltip
                location="top"
                text="YouTube"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    :icon="mdiYoutube"
                    href="https://youtube.com/@_EDM115"
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
  </v-container>
</template>

<script setup>
import hugeIconsSpotify from "~icons/hugeicons/spotify"
import icBaselineDiscord from "~icons/ic/baseline-discord"
import icBaselineTelegram from "~icons/ic/baseline-telegram"
import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiBriefcaseOutline from "~icons/mdi/briefcaseOutline"
import mdiDevTo from "~icons/mdi/devTo"
import mdiDocker from "~icons/mdi/docker"
import mdiFileDownload from "~icons/mdi/fileDownload"
import mdiGithub from "~icons/mdi/github"
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiInformationOutline from "~icons/mdi/informationOutline"
import mdiInstagram from "~icons/mdi/instagram"
import mdiLinkedin from "~icons/mdi/linkedin"
import mdiPaypal from "~icons/mdi/paypal"
import mdiReddit from "~icons/mdi/reddit"
import mdiSchoolOutline from "~icons/mdi/schoolOutline"
import mdiSoundcloud from "~icons/mdi/soundcloud"
import mdiSpotify from "~icons/mdi/spotify"
import mdiStackOverflow from "~icons/mdi/stackOverflow"
import mdiText from "~icons/mdi/text"
import mdiWeb from "~icons/mdi/web"
import mdiWhatsapp from "~icons/mdi/whatsapp"
import mdiYoutube from "~icons/mdi/youtube"
import octiconIssueClosed from "~icons/octicon/issue-closed-16"
import octiconIssueOpened from "~icons/octicon/issue-opened-16"
import octiconPullRequest from "~icons/octicon/git-pull-request-16"
import pajamasTwitter from "~icons/pajamas/twitter"
import phGitlab from "~icons/ph/gitlab-logo"
import simpleIconsAppleMusic from "~icons/simple-icons/applemusic"
import simpleIconsBuymeacoffee from "~icons/simple-icons/buymeacoffee"
import simpleIconsHackthebox from "~icons/simple-icons/hackthebox"
import simpleIconsRootme from "~icons/simple-icons/rootme"

import betteruptimePng from "@/assets/img/projects/betteruptime.png"
import nantesPng from "@/assets/img/projects/nantes.png"
import sportTrackJpg from "@/assets/img/projects/sport-track.jpg"
import underratedJpg from "@/assets/img/projects/underrated.jpg"
import unzipBotJpg from "@/assets/img/projects/unzip-bot.jpg"

import { ofetch } from "ofetch"
import { onMounted, ref } from "vue"

const age = ref(20)
const projectsNumber = ref(56)
const servicesUsers = ref(34751)
const linesOfCode = ref(100000)
const contributions = ref([
  {
    id: 1,
    icon: octiconPullRequest,
    name: "SpotX-Official/SpotX",
    description: "Updated the French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/SpotX-Official/SpotX/pull/614"
  },
  {
    id: 2,
    icon: octiconPullRequest,
    name: "data-fair/processings",
    description: "Complete overhaul (separated Dockerfiles, Nuxt3, ...)",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/processings/pull/29"
  },
  {
    id: 3,
    icon: octiconPullRequest,
    name: "Rectify11/Website",
    description: "Better download button",
    type: "pr",
    state: "closed",
    link: "https://github.com/Rectify11/Website/pull/3"
  },
  {
    id: 4,
    icon: octiconPullRequest,
    name: "data-fair/lib",
    description: "Colors rework",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/lib/pull/3"
  },
  {
    id: 5,
    icon: octiconPullRequest,
    name: "data-fair/app-charts",
    description: "v1.0 : Vue3 rewrite, new features, small bugfixes, ...",
    type: "pr",
    state: "closed",
    link: "https://github.com/data-fair/app-charts/pull/42"
  },
  {
    id: 6,
    icon: octiconPullRequest,
    name: "ForzaMods/Forza-Mods-AIO",
    description: "added full French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/ForzaMods/Forza-Mods-AIO/pull/7"
  },
  {
    id: 7,
    icon: octiconPullRequest,
    name: "Rectify11/Installer",
    description: "updated and completed French translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/pull/433"
  },
  {
    id: 8,
    icon: octiconPullRequest,
    name: "dracula/fl-studio-21",
    description: "update for 21.2",
    type: "pr",
    state: "closed",
    link: "https://github.com/dracula/fl-studio-21/pull/2"
  },
  {
    id: 9,
    icon: octiconPullRequest,
    name: "devblackops/Terminal-Icons",
    description: "Added dracula color theme",
    type: "pr",
    state: "closed",
    link: "https://github.com/devblackops/Terminal-Icons/pull/119"
  },
  {
    id: 10,
    icon: octiconPullRequest,
    name: "mon5termatt/medicat_installer",
    description: "added french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/mon5termatt/medicat_installer/pull/51"
  },
  {
    id: 11,
    icon: octiconPullRequest,
    name: "Keksuccino/JustZoom",
    description: "Smoother zoom",
    type: "pr",
    state: "closed",
    link: "https://github.com/Keksuccino/JustZoom/pull/9"
  },
  {
    id: 13,
    icon: octiconPullRequest,
    name: "peazip/PeaZip",
    description: "[Translation] : French translation updated/reworked",
    type: "pr",
    state: "closed",
    link: "https://github.com/peazip/PeaZip/pull/90"
  },
  {
    id: 14,
    icon: octiconPullRequest,
    name: "SpotX-Official/SpotX",
    description: "better french translation",
    type: "pr",
    state: "closed",
    link: "https://github.com/SpotX-Official/SpotX/pull/253"
  },
  {
    id: 15,
    icon: octiconPullRequest,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "Linux Method in the Readme",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/39"
  },
  {
    id: 16,
    icon: octiconPullRequest,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "complete reformat - better changes",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/31"
  },
  {
    id: 17,
    icon: octiconPullRequest,
    name: "TheCaduceus/WARP-UNLIMITED-ADVANCED",
    description: "Better script (async)",
    type: "pr",
    state: "closed",
    link: "https://github.com/TheCaduceus/WARP-UNLIMITED-ADVANCED/pull/30"
  },
  {
    id: 18,
    icon: octiconIssueOpened,
    name: "Rectify11/Installer",
    description: "[BUG] Can't install updates from commits semver",
    type: "issue",
    state: "open",
    link: "https://github.com/Rectify11/Installer/issues/603"
  },
  {
    id: 19,
    icon: octiconIssueOpened,
    name: "AlDanial/cloc",
    description: "[BUG] cloc won't work if ran through a symlink on Windows (ex Winget) : Can't locate PAR.pm in @INC",
    type: "issue",
    state: "open",
    link: "https://github.com/AlDanial/cloc/issues/849"
  },
  {
    id: 20,
    icon: octiconIssueOpened,
    name: "marticliment/UniGetUI",
    description: "[ENHANCEMENT] Sorting a column should keep a second-level sorting",
    type: "issue",
    state: "open",
    link: "https://github.com/marticliment/UniGetUI/issues/2633"
  },
  {
    id: 21,
    icon: octiconIssueOpened,
    name: "nodejs/node",
    description: "[BUG] Installing an update of Node removes any custom permissions of the folder (Windows) and locks the ability to update npm/corepack",
    type: "issue",
    state: "open",
    link: "https://github.com/nodejs/node/issues/54284"
  },
  {
    id: 22,
    icon: octiconIssueOpened,
    name: "vuetifyjs/vuetify",
    description: "[Bug Report][3.6.9] v-date-input's width doesn't size correctly when specifying percentage",
    type: "issue",
    state: "open",
    link: "https://github.com/vuetifyjs/vuetify/issues/19995"
  },
  {
    id: 23,
    icon: octiconIssueClosed,
    name: "Rectify11/Installer",
    description: "[FEATURE REQUEST] Allow in the Rectify 11 Control center to disable MFE on startup",
    type: "issue",
    state: "closed",
    link: "https://github.com/Rectify11/Installer/issues/563"
  },
  {
    id: 24,
    icon: octiconIssueClosed,
    name: "marticliment/UniGetUI",
    description: "[BUG] version 3.1.0-alpha1 cannot use winget out-of the box and breaks it",
    type: "issue",
    state: "closed",
    link: "https://github.com/marticliment/UniGetUI/issues/2286"
  },
  {
    id: 25,
    icon: octiconIssueOpened,
    name: "pyrogram/pyrogram",
    description: "[PROPOSAL] Pass the project to someone else",
    type: "issue",
    state: "open",
    link: "https://github.com/pyrogram/pyrogram/issues/1425"
  },
  {
    id: 26,
    icon: octiconIssueClosed,
    name: "SUPERCILEX/gnome-clipboard-history",
    description: "[BUG] Upgrading to GNOME 46 breaks the extension (version mismatch ?)",
    type: "issue",
    state: "closed",
    link: "https://github.com/SUPERCILEX/gnome-clipboard-history/issues/166"
  },
  {
    id: 27,
    icon: octiconIssueClosed,
    name: "eslint/config-inspector",
    description: "[BUG] Doesn't work when the config is outside of C: drive on Windows",
    type: "issue",
    state: "closed",
    link: "https://github.com/eslint/config-inspector/issues/47"
  },
  {
    id: 28,
    icon: octiconIssueClosed,
    name: "marticliment/UniGetUI",
    description: "[FEATURE REQUEST] Stop auto installing chocolatey",
    type: "issue",
    state: "closed",
    link: "https://github.com/marticliment/UniGetUI/issues/2131"
  },
  {
    id: 29,
    icon: octiconIssueOpened,
    name: "Rectify11/Installer",
    description: "[BUG] Can't natively open services",
    type: "issue",
    state: "open",
    link: "https://github.com/Rectify11/Installer/issues/513"
  },
  {
    id: 30,
    icon: octiconIssueOpened,
    name: "python/cpython",
    description: "[BUG] Newest 3.12 install on windows misses pip",
    type: "issue",
    state: "open",
    link: "https://github.com/python/cpython/issues/117505"
  },
  {
    id: 31,
    icon: octiconIssueOpened,
    name: "Rectify11/Installer",
    description: "[BUG] Pin to Quick access is gone from the context menu",
    type: "issue",
    state: "open",
    link: "https://github.com/Rectify11/Installer/issues/372"
  },
  {
    id: 32,
    icon: octiconIssueOpened,
    name: "MicaForEveryone/MicaForEveryone",
    description: "Apps using MaterialDesignInXamlToolkit may not be rendered correctly everywhere",
    type: "issue",
    state: "open",
    link: "https://github.com/MicaForEveryone/MicaForEveryone/issues/380"
  },
  {
    id: 33,
    icon: octiconIssueClosed,
    name: "matafokka/ExcelDarkThemeFix",
    description: "Performance issues with ODS",
    type: "issue",
    state: "closed",
    link: "https://github.com/matafokka/ExcelDarkThemeFix/issues/10"
  }
])
const projects = ref([
  {
    id: 1,
    name: "Unzip bot",
    description: "A Telegram bot to extract various types of archives.<br>Supports everything, downloads from URL and file, handle password protected ones.<br>My most advanced project so far",
    image: unzipBotJpg,
    source: "https://github.com/EDM115/unzip-bot",
    link: "/unzip",
    linkText: "edm115.dev/unzip"
  },
  {
    id: 2,
    name: "CycloNantais",
    description: "The final project of CS year 1.<br>Includes databases, graphs, stats and a JavaFX app that packs everything",
    image: nantesPng,
    source: "https://github.com/EDM115/SAE-Velos-Nantes",
    link: "https://github.com/EDM115/SAE-Velos-Nantes#how-to-start-",
    linkText: "How to start the app ?"
  },
  {
    id: 3,
    name: "Underrated producers list",
    description: "A list of underrated producers, updated every time I can.<br>Made in collaboration with <a href=\"https://t.me/edmsamplepack\">EDM SAMPLE PACKs</a>",
    image: underratedJpg,
    source: "https://github.com/EDM115/underrated-producers-list",
    link: "https://edm115.github.io/underrated-producers-list",
    linkText: "edm115.github.io/underrated-producers-list"
  },
  {
    id: 4,
    name: "Sport Track",
    description: "A web project made for an assignment.<br>A good occasion to learn more JS and LocalStorage",
    image: sportTrackJpg,
    source: "https://github.com/EDM115/sport-track",
    link: "/sporttrack",
    linkText: "edm115.dev/sporttrack"
  },
  {
    id: 5,
    name: "Uptime",
    description: "Check at any time if our services are up.<br>Useful if this website is down",
    image: betteruptimePng,
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
    .catch(() => {
      return 56
    })
}

function getContribColor(state) {
  return state === "open" ? "open-contrib-color" : "closed-contrib-color"
}

onMounted(async () => {
  age.value = getAge()
  await fetchProjectsNumber()
})
</script>

<style scoped>
.open-contrib-color {
  background-color: #238636E6 !important;
  color: rgb(var(--v-theme-text)) !important;
}

.closed-contrib-color {
  background-color: #8957E5E6 !important;
  color: rgb(var(--v-theme-background)) !important;
}
</style>
