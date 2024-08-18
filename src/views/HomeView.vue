<template>
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
            to="/"
          >
            <v-btn
              color="secondary"
              prepend-icon="mdi-home-outline"
              text="Home"
              variant="elevated"
            />
          </RouterLink>
        </v-col>
        <v-col>
          <RouterLink
            to="/about"
          >
            <v-btn
              color="secondary"
              prepend-icon="mdi-information-outline"
              text="About"
              variant="elevated"
            />
          </RouterLink>
        </v-col>
        <v-col>
          <RouterLink
            to="/blog"
          >
            <v-btn
              color="secondary"
              prepend-icon="mdi-text"
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
        class="mx-auto"
        max-width="400"
        variant="elevated"
      >
        <v-card-title>
          <h2>About</h2>
        </v-card-title>

        <v-card-text>
          <p>
            I'm a French developer, who like to play with different programming languages<br>Managing both studies, dev & relationship, I'm passionnated and involved into everything I try out<br><br>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
h1, h2, h3, h4 {
  margin-top: 1rem;
}
</style>
