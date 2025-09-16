<template>
  <UiContainer>
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-left">
          <NuxtImg
            :draggable="false"
            preload
            class="hero-image glass"
            height="350"
            width="350"
            alt="EDM115 Logo"
            src="/img/projects/unzip-bot.webp"
            :placeholder="[200, 200, 50, 5]"
          />
        </div>

        <div class="hero-right">
          <h1
            class="gradient-text"
            style="font-size:clamp(2rem,6vw,4rem); line-height:1.05; margin:0 0 0.5rem 0;"
          >
            unzip-bot
          </h1>

          <p
            id="description"
            style="color:var(--text-dark); max-width:60ch; margin-top: 0;"
          >
            {{ t('unzip.description') }}
          </p>

          <div style="gap:.75rem; display: flex; flex-wrap:wrap; margin-top:1rem; justify-content: center;">
            <UiButton
              color="primary"
              :prepend-icon="mdiGithub"
              :text="t('unzip.github')"
              link="https://github.com/EDM115/unzip-bot/tree/v7-rework-part-1"
              variant="elevated"
              aria="unzip-bot GitHub"
            />
            <UiButton
              color="primary"
              :prepend-icon="icBaselineTelegram"
              :text="t('unzip.telegram')"
              link="https://t.me/unzip_edm115bot"
              variant="elevated"
              aria="unzip-bot Telegram"
            />
          </div>

          <UiCard
            id="about"
            class="glass hero-about"
            variant="outlined"
            style="margin-top:1rem;"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#about"
                  class="internal-link"
                  aria-label="About section"
                >
                  {{ t('unzip.about') }}
                </NuxtLink>
              </h2>
            </template>
            <p>
              {{ t('unzip.about1') }}<br><br>
              {{ t('unzip.about2') }}<br>
              {{ t('unzip.about3') }}<br>
            </p>
          </UiCard>

          <UiCard
            id="stats"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#stats"
                  class="internal-link"
                  aria-label="Statistics section"
                >
                  {{ t('unzip.stats.title') }}
                </NuxtLink>
              </h2>
            </template>
            <UiOdometer :stats="stats" />
          </UiCard>

          <UiCard
            id="help"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#help"
                  class="internal-link"
                  aria-label="Help section"
                >
                  {{ t('unzip.help.title') }}
                </NuxtLink>
              </h2>
            </template>
            <h4>{{ t('unzip.help.subtitle') }}</h4>

            <UiRow>
              <UiCol
                v-for="skill in issues"
                :key="skill.name"
                cols="12"
                md="12"
                lg="6"
              >
                <UiCard
                  small
                  variant="flat"
                >
                  <template #title>
                    {{ skill.name }}
                  </template>

                  {{ skill.description }}
                </UiCard>
              </UiCol>
            </UiRow>
          </UiCard>
        </div>
      </div>
    </section>
  </UiContainer>
</template>

<script setup lang="ts">
import biHdd from "~icons/bi/hdd"
import icBaselineTelegram from "~icons/ic/baseline-telegram"
import materialSymbolsScanOutline from "~icons/material-symbols/scanOutline"
import mdiCalendarRangeOutline from "~icons/mdi/calendarRangeOutline"
import mdiCode from "~icons/mdi/code"
import mdiGithub from "~icons/mdi/github"
import mdiLinkVariant from "~icons/mdi/linkVariant"
import mdiUsersOutline from "~icons/mdi/usersOutline"
import octiconRepoForked from "~icons/octicon/repo-forked-16"
import octiconStar from "~icons/octicon/star-16"

const { t } = useI18n()

const stars = ref(112)
const forks = ref(155)
const days = ref(1190)
const loc = ref(7237)

const stats = computed(() => [
  {
    id: 0,
    name: t("unzip.stats.users"),
    value: 48628,
    icon: mdiUsersOutline,
  },
  {
    id: 1,
    name: t("unzip.stats.stars"),
    value: stars,
    icon: octiconStar,
  },
  {
    id: 2,
    name: t("unzip.stats.forks"),
    value: forks,
    icon: octiconRepoForked,
  },
  {
    id: 3,
    name: t("unzip.stats.days"),
    value: days,
    icon: mdiCalendarRangeOutline,
  },
  {
    id: 4,
    name: t("unzip.stats.loc"),
    value: loc,
    icon: mdiCode,
  },
  {
    id: 5,
    name: t("unzip.stats.files"),
    value: 424529,
    icon: materialSymbolsScanOutline,
  },
  {
    id: 6,
    name: t("unzip.stats.links"),
    value: 57475,
    icon: mdiLinkVariant,
  },
  {
    id: 7,
    name: t("unzip.stats.data"),
    value: 1494212,
    icon: biHdd,
  },
])

const issues = [
  {
    name: "[Errno 2] No such file or directory: '/app/Downloaded/{ID}/{archive_name}.temp'",
    description: "There was an error during the renaming of your file",
  },
  {
    name: "[Errno 20] Not a directory: '/app/Downloaded/{ID}/{archive_name}'",
    description: "Your archive hasn't been extracted successfully",
  },
  {
    name: "replace() argument 2 must be str, not None",
    description: "You can't rename a file with nothing",
  },
  {
    name: "That archive is password protected 😡 Don't fool me !",
    description: "Either it's effectively password protected, or it's a splitted archive, or it's corrupted, or that file format isn't supported yet",
  },
  {
    name: "Telegram says: [400 MESSAGE_ID_INVALID] - The message id is invalid (caused by \"messages.ForwardMessages\")",
    description: "Your tried to extract a file from a channel which restricts saving content",
  },
  {
    name: "Telegram says: [400 QUERY_ID_INVALID] - The callback query id is invalid (caused by \"messages.SetBotCallbackAnswer\")",
    description: "Your deleted the bot's message before it could edit it",
  },
  {
    name: "Telegram says: [400 MESSAGE_NOT_MODIFIED] - The message was not modified because you tried to edit it using the same content (caused by \"messages.EditMessage\")",
    description: "The bot failed to edit its message. Don't pay attention to it",
  },
  {
    name: "Cannot connect to host {name}:80 ssl:default [Name or service not known]",
    description: "That URL is unreachable/down",
  },
  {
    name: "Response payload is not completed",
    description: "The connection hanged up before the bot could download the full file",
  },
  {
    name: "Server disconnected",
    description: "The server went down",
  },
  {
    name: "Cannot connect to {name}:8080 ssl:True [SSLCertVerificationError: (1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:997)')]",
    description: "The certificate of that URL isn't valid anymore",
  },
  {
    name: "400, message='Invalid character in chunk size', url=URL('{name}')",
    description: "The URL gave a bad chunk, impossible to download that file",
  },
  {
    name: "URL should be absolute",
    description: "You can't use a relative URL, use the full one",
  },
  {
    name: "Telegram says: [400 USER_IS_BLOCKED] - The user blocked you (caused by \"messages.SendMessage\")",
    description: "That user blocked the bot, you can't send anything to him anymore",
  },
  {
    name: "Value after * must be an iterable, not NoneType",
    description: "That error was due to concurrent transfers, it will be fixed later",
  },
  {
    name: "[Errno 12] Cannot allocate memory",
    description: "The server is full, no more space available",
  },
  {
    name: "",
    description: "If there's no error message, please send me a message on Telegram (@EDM115)",
  },
  {
    name: "Got another error ?",
    description: "Report it in the Telegram chat (@EDM115_chat)",
  },
]

useHead({
  title: t("unzip.head"),
  meta: [
    {
      name: "description", content: t("unzip.description"),
    },
  ],
  link: [
    {
      "rel": "icon", "type": "image/webp", "href": "/img/projects/unzip-bot.webp",
    },
  ],
})

useSeoMeta({
  title: t("unzip.head"),
  ogTitle: t("unzip.head"),
  description: t("unzip.description"),
  ogDescription: t("unzip.description"),
  ogImage: "/img/projects/unzip-bot.webp",
})

function daysSinceLaunch() {
  const launchDate = new Date("2022-05-22")
  const currentDate = new Date()
  const diffTime = Math.abs(currentDate.getTime() - launchDate.getTime())

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

async function getRepoDetails() {
  try {
    const data = await $fetch<{
      stargazers_count: number;
      forks_count: number;
    }>("https://api.github.com/repos/EDM115/unzip-bot", { headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    } })

    if (!data) {
      throw new Error("Repository not found")
    }

    if (!data.stargazers_count || !data.forks_count) {
      throw new Error("Repository not found")
    }

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
    }
  } catch (error) {
    console.error("Failed to fetch repository details :", error)

    return null
  }
}

async function getLoc() {
  try {
    const data = await $fetch<{
      language: string;
      linesOfCode: number;
    }[]>("https://api.codetabs.com/v1/loc?github=EDM115/unzip-bot&branch=v7-rework-part-1")

    if (!data) {
      throw new Error("LoC API down")
    }

    const totalLoc = data.find((item: { language: string }) => item.language === "Total")

    return totalLoc
      ? totalLoc.linesOfCode
      : 0
  } catch (error) {
    console.error("Failed to fetch LOC :", error)

    return 0
  }
}

onMounted(async () => {
  days.value = daysSinceLaunch()

  const repoDetails = await getRepoDetails()

  if (repoDetails) {
    stars.value = repoDetails.stars
    forks.value = repoDetails.forks
  }

  const locValue = await getLoc()

  if (locValue !== 0) {
    loc.value = locValue
  }
})
</script>

<style scoped lang="scss">
.internal-link {
  color: inherit;
}

.hero-image {
  display: block;
  border-radius: 24px;
  box-shadow: 0 30px 60px rgb(0 0 0 / 40%), 0 10px 20px rgb(0 0 0 / 30%);
  outline: 1px solid rgb(255 255 255 / 7%);
  background: color-mix(in srgb, var(--surface) 50%, transparent);
}
</style>
