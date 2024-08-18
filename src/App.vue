<template>
  <v-app>
    <v-main>
      <img
        alt="Logo"
        class="logo"
        src="@/assets/img/profile-img.jpg"
        width="125"
        height="125"
      >

      <div class="wrapper">
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
      </div>

      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
