<template>
  <UiContainer>
    <UiRow
      align="center"
      align-content="center"
      justify="center"
    >
      <UiCol align="center">
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

        <UiDivider class="my-4" />
        <UiRow>
          <UiCol>
            <UiButton
              color="primary"
              :prepend-icon="mdiHomeOutline"
              :text="t('home.home')"
              link="/"
              variant="elevated"
            />
          </UiCol>
          <UiCol>
            <UiButton
              color="primary"
              :prepend-icon="mdiInformationOutline"
              :text="t('home.projects')"
              link="/projects"
              variant="elevated"
            />
          </UiCol>
          <UiCol>
            <UiButton
              color="primary"
              :prepend-icon="mdiText"
              :text="t('home.blog')"
              link="/blog"
              variant="elevated"
            />
          </UiCol>
        </UiRow>
      </UiCol>
    </UiRow>
    <UiRow
      align="center"
      align-content="center"
      justify="center"
    >
      <UiCol align="center">
        <UiCard
          id="about"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#about"
                class="internal-link"
              >
                {{ t("home.about") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
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
          </UiCardText>
        </UiCard>

        <UiCard
          id="stats"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#stats"
                class="internal-link"
              >
                {{ t("home.stats") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
            <LazyHomeStats
              :key="locale"
              hydrate-on-idle
            />
          </UiCardText>
        </UiCard>

        <UiCard
          id="skills"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#skills"
                class="internal-link"
              >
                {{ t("home.skills") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
            <LazyHomeSkills
              :key="locale"
              hydrate-on-idle
            />
          </UiCardText>
        </UiCard>

        <UiCard
          id="resume"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#resume"
                class="internal-link"
              >
                {{ t("home.resume") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
            <LazyHomeResume
              :key="locale"
              hydrate-on-idle
            />
          </UiCardText>
        </UiCard>

        <UiCard
          id="opensource"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#opensource"
                class="internal-link"
              >
                {{ t("home.oss") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
            <LazyHomeOpenSourceContributions
              :key="locale"
              hydrate-on-idle
            />
          </UiCardText>
        </UiCard>

        <UiCard
          id="contact"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#contact"
                class="internal-link"
              >
                {{ t("home.contact") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
            <LazyHomeContact
              :key="locale"
              hydrate-on-idle
            />
          </UiCardText>
        </UiCard>

        <UiCard
          id="social"
          class="mx-auto my-4"
          max-width="500"
          variant="flat"
        >
          <UiCardTitle>
            <h2>
              <NuxtLink
                to="#social"
                class="internal-link"
              >
                EDM115 • {{ t("home.social") }}
              </NuxtLink>
            </h2>
          </UiCardTitle>

          <UiCardText>
            <LazyHomeSocialLinks
              :key="locale"
              hydrate-on-idle
            />
          </UiCardText>
        </UiCard>
      </UiCol>
    </UiRow>
  </UiContainer>
</template>

<script setup lang="ts">
import mdiHomeOutline from "~icons/mdi/homeOutline"
import mdiInformationOutline from "~icons/mdi/informationOutline"
import mdiText from "~icons/mdi/text"

const { locale, t } = useI18n()

const age = ref(21)

function getAge(): number {
  const birthday = new Date("2004-06-18")
  const diff = Date.now() - birthday.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

onMounted(() => {
  age.value = getAge()
})
</script>

<style scoped>
.internal-link {
  color: inherit;
}
</style>
