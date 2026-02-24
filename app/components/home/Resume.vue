<template>
  <div>
    <p class="mb-4">
      {{ t("home.resume.subtitle") }}<br>
    </p>
    <UiStepperVertical>
      <UiStepperVerticalItem
        :subtitle="t('home.resume.summary.title')"
        title="EDM115"
        :icon="mdiAccountTieOutline"
      >
        <UiList>
          <UiListItem no-hover>
            <template #title>
              {{ t("home.resume.summary.1") }}
            </template>
            {{ t("home.resume.summary.location") }}<br>
            <NuxtLink
              to="mailto:contact@edm115.dev"
              target="_blank"
              external
              aria-label="EDM115's email"
            >
              contact@edm115.dev
            </NuxtLink><br>
            <NuxtLink
              to="tel:+33667980504"
              target="_blank"
              aria-label="EDM115's phone number"
            >
              +33 6 67 98 05 04
            </NuxtLink>
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume.experience.professional')"
        :title="t('home.resume.experience.internships.nexelec.title')"
        :icon="mdiBriefcaseOutline"
      >
        <UiList>
          <UiListItem no-hover>
            <template #title>
              {{ t("home.resume.experience.internships.nexelec.date") }}
            </template>
            <template #subtitle>
              <div class="mb-2">
                {{ t("home.resume.experience.internships.nexelec.location") }}
              </div>
            </template>
            {{ t("home.resume.experience.internships.nexelec.description.summary") }}
            <ul
              class="mt-4 ml-4"
              style="text-align: left; list-style-type: disc;"
            >
              <li
                v-for="(detail, index) in tm('home.resume.experience.internships.nexelec.description.details') as VueMessageType"
                :key="index"
                style="text-wrap: balance;"
              >
                {{ detail }}
              </li>
            </ul>
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume.experience.professional')"
        :title="t('home.resume.experience.internships.koumoul.title')"
        :icon="mdiBriefcaseOutline"
      >
        <UiList>
          <UiListItem no-hover>
            <template #title>
              {{ t("home.resume.experience.internships.koumoul.date") }}
            </template>
            <template #subtitle>
              <div class="mb-2">
                {{ t("home.resume.experience.internships.koumoul.location") }}
              </div>
            </template>
            {{ t("home.resume.experience.internships.koumoul.description.summary") }}
            <ul
              class="mt-4 ml-4"
              style="text-align: left; list-style-type: disc;"
            >
              <li
                v-for="(detail, index) in tm('home.resume.experience.internships.koumoul.description.details') as VueMessageType"
                :key="index"
                style="text-wrap: balance;"
              >
                {{ detail }}
              </li>
            </ul>
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume.education.title')"
        :title="t('home.resume.education.university.title')"
        :icon="mdiSchoolOutline"
      >
        <UiList>
          <UiListItem no-hover>
            <template #title>
              {{ t("home.resume.education.university.date") }}
            </template>
            <template #subtitle>
              <div class="mb-2">
                {{ t("home.resume.education.university.location") }}
              </div>
            </template>
            {{ t("home.resume.education.university.description.1") }}
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume.education.title')"
        :title="t('home.resume.education.high-school.title')"
        :icon="mdiSchoolOutline"
      >
        <UiList>
          <UiListItem no-hover>
            <template #title>
              {{ t("home.resume.education.high-school.date") }}
            </template>
            <template #subtitle>
              <div class="mb-2">
                {{ t("home.resume.education.high-school.location") }}
              </div>
            </template>
            {{ t("home.resume.education.high-school.description.1") }}
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>
    </UiStepperVertical>
    <UiButton
      class="mt-4"
      color="secondary"
      :prepend-icon="mdiFileDownload"
      :text="t('home.downloadResume')"
      :link="resumeLink"
      aria="Download PDF resume"
    />
  </div>
</template>

<script setup lang="ts">
import type { VueMessageType } from "vue-i18n"

import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiBriefcaseOutline from "~icons/mdi/briefcaseOutline"
import mdiFileDownload from "~icons/mdi/fileDownload"
import mdiSchoolOutline from "~icons/mdi/schoolOutline"

const {
  locale,
  t,
  tm,
} = useI18n()

const resumeLink = computed(() => {
  return locale.value === "fr"
    ? "/docs/CV_EDM115.pdf"
    : "/docs/Resume_EDM115.pdf"
})
</script>

<style scoped lang="scss">
.mt-4 {
  margin-top: 16px;
}

.mr-2 {
  margin-right: 8px;
}

.ml-4 {
  margin-left: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
