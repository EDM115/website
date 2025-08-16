<template>
  <UiContainer>
    <section class="hero centered-stack">
      <NuxtImg
        :draggable="false"
        preload
        class="mb-4 rounded-xl glass"
        height="200"
        width="200"
        alt="EDM115 Logo"
        src="/img/profile-img.webp"
        :placeholder="[200, 200, 50, 5]"
      />

      <h1
        class="gradient-text"
        style="font-size:clamp(2rem,6vw,4rem); line-height:1.05;"
      >
        EDM115
      </h1>

      <p
        class="mt-2"
        style="color:var(--text-dark); max-width:60ch;"
      >
        {{ t('main.description') }}
      </p>

      <div
        class="d-flex"
        style="gap:.75rem; flex-wrap:wrap; justify-content:center;"
      >
        <UiButton
          color="primary"
          :prepend-icon="mdiHomeOutline"
          :text="t('home.home')"
          link="/"
          variant="elevated"
        />
        <UiButton
          color="secondary"
          :prepend-icon="mdiInformationOutline"
          :text="t('home.projects')"
          link="/projects"
          variant="elevated"
        />
        <UiButton
          color="accent"
          :prepend-icon="mdiText"
          :text="t('home.blog')"
          link="/blog"
          variant="elevated"
        />
      </div>
    </section>

    <section class="section">
      <UiRow
        justify="center"
        align="start"
      >
        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
          <UiCard
            id="about"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#about"
                  class="internal-link"
                >
                  {{ t('home.about') }}
                </NuxtLink>
              </h2>
            </template>
            <p>
              {{ t('home.about1') }}<br>
              {{ t('home.about2') }}<br><br>
              {{ t('home.about3') }}<br>
              {{ t('home.about4') }}<br>
              {{ t('home.about5') }}<br>
              {{ t('home.about6') }}<br>
              {{ t('home.about7', { age }) }}<br>
              {{ t('home.about8') }}<br>
              {{ t('home.about9') }} :
              <NuxtLink
                to="https://edm115.dev"
                target="_blank"
              >
                edm115.dev
              </NuxtLink><br>
              {{ t('home.about10') }} :
              <NuxtLink
                to="mailto:dev@edm115.dev"
                target="_blank"
                external
              >
                dev@edm115.dev
              </NuxtLink><br>
              {{ t('home.about11') }}<br>
              {{ t('home.about12') }} :
              <NuxtLink
                to="tel:+33667980504"
                target="_blank"
                external
              >
                +33 6 67 98 05 04
              </NuxtLink><br>
              {{ t('home.about13') }}<br>
            </p>
          </UiCard>
        </UiCol>

        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
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
                >
                  {{ t('home.stats') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeStats
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </UiCol>

        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
          <UiCard
            id="skills"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#skills"
                  class="internal-link"
                >
                  {{ t('home.skills') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeSkills
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </UiCol>

        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
          <UiCard
            id="resume"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#resume"
                  class="internal-link"
                >
                  {{ t('home.resume') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeResume
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </UiCol>

        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
          <UiCard
            id="opensource"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#opensource"
                  class="internal-link"
                >
                  {{ t('home.oss') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeOpenSourceContributions
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </UiCol>

        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
          <UiCard
            id="contact"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#contact"
                  class="internal-link"
                >
                  {{ t('home.contact') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeContact
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </UiCol>

        <UiCol
          cols="12"
          md="12"
          lg="12"
        >
          <UiCard
            id="social"
            class="glass"
            variant="outlined"
          >
            <template #title>
              <h2>
                <NuxtLink
                  to="#social"
                  class="internal-link"
                >
                  EDM115 • {{ t('home.social') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeSocialLinks
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>
        </UiCol>
      </UiRow>
    </section>
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
