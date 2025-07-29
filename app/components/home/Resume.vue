<template>
  <p>
    {{ t("home.resume1") }}<br>
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
          :subtitle="t('home.resume2')"
          title="EDM115"
          :icon="mdiAccountTieOutline"
          :edit-icon="mdiAccountTieOutline"
          value="1"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>{{ t("home.resume3") }}</v-list-item-title>
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
            </v-list-item>
          </v-list>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          :subtitle="t('home.resume5')"
          :title="t('home.resume6')"
          :icon="mdiBriefcaseOutline"
          :edit-icon="mdiBriefcaseOutline"
          value="2"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>2025</v-list-item-title>
              <v-list-item-subtitle class="mb-2">
                Nexelec, Saint-Avé
              </v-list-item-subtitle><br>
              {{ t("home.resume7") }}
            </v-list-item>
          </v-list>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          :subtitle="t('home.resume5')"
          :title="t('home.resume8')"
          :icon="mdiBriefcaseOutline"
          :edit-icon="mdiBriefcaseOutline"
          value="3"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>2024</v-list-item-title>
              <v-list-item-subtitle class="mb-2">
                Koumoul, Vannes
              </v-list-item-subtitle><br>
              {{ t("home.resume9") }}
            </v-list-item>
          </v-list>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          :subtitle="t('home.resume10')"
          :title="t('home.resume11')"
          :icon="mdiSchoolOutline"
          :edit-icon="mdiSchoolOutline"
          value="4"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>2022 - 2025</v-list-item-title>
              <v-list-item-subtitle class="mb-2">
                IUT Vannes
              </v-list-item-subtitle><br>
              {{ t("home.resume12") }}
            </v-list-item>
          </v-list>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          :subtitle="t('home.resume10')"
          :title="t('home.resume13')"
          :icon="mdiSchoolOutline"
          :edit-icon="mdiSchoolOutline"
          value="5"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>2019 - 2022</v-list-item-title>
              <v-list-item-subtitle class="mb-2">
                Lycée Saint-Paul, Vannes
              </v-list-item-subtitle><br>
              {{ t("home.resume14") }}
            </v-list-item>
          </v-list>
        </v-stepper-vertical-item>
      </template>
    </v-stepper-vertical>
  </p>
  <h3 class="mt-4 mb-2">
    {{ t("home.downloadResume") }}
  </h3>
  <UiButton
    class="mr-2"
    color="secondary"
    :prepend-icon="mdiFileDownload"
    :text="t('home.downloadPdf')"
    href="https://old.edm115.dev/assets/docs/Resume_Lussandre_Lederrey_EDM115.pdf"
    target="_blank"
    rel="noopener noreferrer"
  />
  <UiButton
    color="secondary"
    :prepend-icon="mdiWeb"
    :text="t('home.downloadOnline')"
    href="https://old.edm115.dev/cv"
    target="_blank"
    rel="noopener noreferrer"
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
