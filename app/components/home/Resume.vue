<template>
  <div>
    <p class="mb-4">
      {{ t("home.resume1") }}<br>
    </p>
    <UiStepperVertical>
      <UiStepperVerticalItem
        :subtitle="t('home.resume2')"
        title="EDM115"
        :icon="mdiAccountTieOutline"
        value="1"
      >
        <UiList>
          <UiListItem>
            <template #title>
              {{ t("home.resume3") }}
            </template>
            {{ t("home.resume4") }}<br>
            <NuxtLink
              to="mailto:dev@edm115.dev"
              target="_blank"
              external
              aria-label="EDM115's email"
            >
              dev@edm115.dev
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
        :subtitle="t('home.resume5')"
        :title="t('home.resume6')"
        :icon="mdiBriefcaseOutline"
        value="2"
      >
        <UiList>
          <UiListItem>
            <template #title>
              2025
            </template>
            <template #subtitle>
              <div class="mb-2">
                Nexelec, Saint-Avé
              </div>
            </template><br>
            {{ t("home.resume7") }}
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume5')"
        :title="t('home.resume8')"
        :icon="mdiBriefcaseOutline"
        value="3"
      >
        <UiList>
          <UiListItem>
            <template #title>
              2024
            </template>
            <template #subtitle>
              <div class="mb-2">
                Koumoul, Vannes
              </div>
            </template><br>
            {{ t("home.resume9") }}
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume10')"
        :title="t('home.resume11')"
        :icon="mdiSchoolOutline"
        value="4"
      >
        <UiList>
          <UiListItem>
            <template #title>
              2022 - 2025
            </template>
            <template #subtitle>
              <div class="mb-2">
                IUT Vannes
              </div>
            </template><br>
            {{ t("home.resume12") }}
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>

      <UiStepperVerticalItem
        :subtitle="t('home.resume10')"
        :title="t('home.resume13')"
        :icon="mdiSchoolOutline"
        value="5"
      >
        <UiList>
          <UiListItem>
            <template #title>
              2019 - 2022
            </template>
            <template #subtitle>
              <div class="mb-2">
                Lycée Saint-Paul, Vannes
              </div>
            </template><br>
            {{ t("home.resume14") }}
          </UiListItem>
        </UiList>
      </UiStepperVerticalItem>
    </UiStepperVertical>
    <h3 class="mt-4 mb-2">
      {{ t("home.downloadResume") }}
    </h3>
    <UiButton
      color="secondary"
      :prepend-icon="mdiFileDownload"
      :text="t('home.downloadPdf')"
      :link="resumeLink"
      aria="Download PDF resume"
    />
  </div>
</template>

<script setup lang="ts">
import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiBriefcaseOutline from "~icons/mdi/briefcaseOutline"
import mdiFileDownload from "~icons/mdi/fileDownload"
import mdiSchoolOutline from "~icons/mdi/schoolOutline"

const {
  locale,
  t,
} = useI18n()

const resumeLink = computed(() => {
  return locale.value === "fr"
    ? "/docs/CV_EDM115.pdf"
    : "/docs/Resume_EDM115.pdf"
})
</script>

<style lang="scss" scoped>
.mt-4 {
  margin-top: 16px;
}

.mr-2 {
  margin-right: 8px;
}

.mb-2 {
  margin-bottom: 8px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
