<template>
  <p>
    {{ t("home.resume1") }}<br>
    <UiStepperVertical
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
              >
                dev@edm115.dev
              </NuxtLink><br>
              <NuxtLink
                to="tel:+33667980504"
                target="_blank"
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
      </template>
    </UiStepperVertical>
  </p>
  <h3 class="mt-4 mb-2">
    {{ t("home.downloadResume") }}
  </h3>
  <UiButton
    class="mr-2"
    color="secondary"
    :prepend-icon="mdiFileDownload"
    :text="t('home.downloadPdf')"
    link="https://old.edm115.dev/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
  />
  <UiButton
    color="secondary"
    :prepend-icon="mdiWeb"
    :text="t('home.downloadOnline')"
    link="https://old.edm115.dev/cv"
  />
</template>

<script setup lang="ts">
import mdiAccountTieOutline from "~icons/mdi/accountTieOutline"
import mdiBriefcaseOutline from "~icons/mdi/briefcaseOutline"
import mdiFileDownload from "~icons/mdi/fileDownload"
import mdiSchoolOutline from "~icons/mdi/schoolOutline"
import mdiWeb from "~icons/mdi/web"

const { t } = useI18n()
</script>
