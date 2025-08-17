<template>
  <UiContainer>
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-left">
          <NuxtImg
            :draggable="false"
            preload
            class="glass hero-image"
            height="350"
            width="350"
            alt="EDM115 Logo"
            src="/img/profile-img.webp"
            :placeholder="[200, 200, 50, 5]"
          />
        </div>

        <div class="hero-right">
          <h1
            class="gradient-text"
            style="font-size:clamp(2rem,6vw,4rem); line-height:1.05; margin:0 0 0.5rem 0;"
          >
            EDM115
          </h1>

          <p style="color:var(--text-dark); max-width:60ch; margin-top: 0;">
            {{ t('main.description') }}
          </p>

          <div style="gap:.75rem; display: flex; flex-wrap:wrap; margin-top:1rem; justify-content: center;">
            <UiButton
              color="primary"
              :prepend-icon="mdiHomeOutline"
              :text="t('home.home')"
              link="/"
              variant="elevated"
              aria="Home"
            />
            <UiButton
              color="secondary"
              :prepend-icon="mdiInformationOutline"
              :text="t('home.projects')"
              link="/projects"
              variant="elevated"
              aria="Projects"
            />
            <UiButton
              color="accent"
              :prepend-icon="mdiText"
              :text="t('home.blog')"
              link="/blog"
              variant="elevated"
              aria="Blog"
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
                aria-label="EDM115's website"
              >
                edm115.dev
              </NuxtLink><br>
              {{ t('home.about10') }} :
              <NuxtLink
                to="mailto:dev@edm115.dev"
                target="_blank"
                external
                aria-label="EDM115's email"
              >
                dev@edm115.dev
              </NuxtLink><br>
              {{ t('home.about11') }}<br>
              {{ t('home.about12') }} :
              <NuxtLink
                to="tel:+33667980504"
                target="_blank"
                external
                aria-label="EDM115's phone number"
              >
                +33 6 67 98 05 04
              </NuxtLink><br>
              {{ t('home.about13') }}<br>
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
                  {{ t('home.stats') }}
                </NuxtLink>
              </h2>
            </template>
            <LazyHomeStats
              :key="locale"
              hydrate-on-idle
            />
          </UiCard>

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
                  aria-label="Skills section"
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
                  aria-label="Resume section"
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
                  aria-label="Open Source section"
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
                  aria-label="Contact section"
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
                  aria-label="Social links section"
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
        </div>
      </div>
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
