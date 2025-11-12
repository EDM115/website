<template>
  <UiContainer>
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-left">
          <HomePolychromeEffect
            :id="`hero-polychrome-effect-${alternativeRendering ? 'alt' : 'default'}`"
            v-model="enableAnimation"
            :alt="alternativeRendering"
          >
            <NuxtImg
              :draggable="false"
              preload
              class="hero-image"
              sizes="350px sm:250px lg:350px"
              alt="EDM115 logo"
              src="/img/profile-img.webp"
              :placeholder="[150, 150, 50, 5]"
            />
          </HomePolychromeEffect>
          <UiCheckbox
            name="enable-polychrome-animation"
            color="primary"
            toggle
            style="padding-top: 32px;"
            :model-value="enableAnimation"
            @update:model-value="(val) => enableAnimation = val"
          >
            {{ t('home.disableAnimation') }}
          </UiCheckbox>
          <UiCheckbox
            v-if="enableCounter > 4"
            name="alt-polychrome-animation"
            color="secondary"
            toggle
            style="padding-top: 16px;"
            :model-value="alternativeRendering"
            @update:model-value="(val) => alternativeRendering = val"
          >
            {{ t('home.alternativeAnimation') }}
          </UiCheckbox>
        </div>

        <div class="hero-right">
          <h1
            class="gradient-text"
            style="font-size:clamp(2rem,6vw,4rem); line-height:1.05; margin:0 0 0.5rem 0;"
          >
            EDM115
          </h1>

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
              {{ t('home.about-tagline-1') }}<br>
              {{ t('home.about-tagline-2') }}<br><br>

              {{ t('home.about-recap') }}<br>
              {{ t('home.about-fav') }}<br>
              {{ t('home.about-github') }}
              <NuxtLink
                to="https://github.com/EDM115"
                target="_blank"
                external
                aria-label="EDM115's GitHub"
              >
                GitHub
              </NuxtLink><br><br>

              <UiIcon
                class="about-icons"
                :icon="mdiAccountTieOutline"
              />
              <span style="font-weight: 600;">Lussandre Lederrey</span><br>

              <UiIcon
                class="about-icons"
                :icon="mdiCakeVariantOutline"
              />
              {{ t('home.about-birthday') }}<br>

              <UiIcon
                class="about-icons"
                :icon="mdiHourglass"
              />
              {{ t('home.about-age', { age }) }}<br>

              <UiIcon
                class="about-icons"
                :icon="mdiMapMarkerOutline"
              />
              Rouen, France<br>

              <UiIcon
                class="about-icons"
                :icon="mdiWeb"
              />
              <NuxtLink
                to="/"
                aria-label="EDM115's website"
              >
                edm115.dev
              </NuxtLink><br>

              <UiIcon
                class="about-icons"
                :icon="mdiEmailOutline"
              />
              <NuxtLink
                to="mailto:contact@edm115.dev"
                target="_blank"
                external
                aria-label="EDM115's email"
              >
                contact@edm115.dev
              </NuxtLink><br>

              <UiIcon
                class="about-icons"
                :icon="mdiPhoneOutline"
              />
              <NuxtLink
                to="tel:+33667980504"
                target="_blank"
                external
                aria-label="EDM115's phone number"
              >
                +33 6 67 98 05 04
              </NuxtLink><br>

              <UiIcon
                class="about-icons"
                :icon="diplomaOutline"
              />
              {{ t('home.about-diploma') }}<br>
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
            <LazyHomeStats hydrate-on-idle />
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
            <LazyHomeSkills hydrate-on-idle />
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
            <LazyHomeResume hydrate-on-idle />
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
            <LazyHomeOpenSourceContributions hydrate-on-idle />
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
            <LazyHomeSocialLinks hydrate-on-idle />
          </UiCard>
        </div>
      </div>
    </section>
  </UiContainer>
</template>

<script setup lang="ts">
import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiCakeVariantOutline from "~icons/mdi/cakeVariantOutline"
import diplomaOutline from "~icons/mdi/diplomaOutline"
import mdiEmailOutline from "~icons/mdi/emailOutline"
import mdiHourglass from "~icons/mdi/hourglass"
import mdiMapMarkerOutline from "~icons/mdi/mapMarkerOutline"
import mdiPhoneOutline from "~icons/mdi/phoneOutline"
import mdiWeb from "~icons/mdi/web"

const { t } = useI18n()

const age = ref(21)
const enableAnimation = ref(false)
const alternativeRendering = ref(false)
const enableCounter = ref(0)

function getAge(): number {
  const birthday = new Date("2004-06-18")
  const diff = Date.now() - birthday.getTime()
  const ageDate = new Date(diff)

  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

onMounted(() => {
  age.value = getAge()

  const lsAnim = localStorage.getItem("enable-polychrome-animation")

  if (lsAnim !== null) {
    enableAnimation.value = lsAnim === "true"
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReducedMotion) {
    enableAnimation.value = false
  }
})

watch(enableAnimation, (val) => {
  localStorage.setItem("enable-polychrome-animation", val
    ? "true"
    : "false")
  window.dispatchEvent(new CustomEvent("polychrome-toggle", { detail: val }))

  if (val) {
    enableCounter.value++
  }
})
</script>

<style scoped lang="scss">
.internal-link {
  color: inherit;
}

.hero-image {
  display: block;
  border-radius: inherit;
}

.about-icons {
  width: 1.25rem;
  height: 1.25rem;
  vertical-align: middle;
  margin-right: 0.15rem;
  transform: translateY(-0.12rem);
}
</style>
