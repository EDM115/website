<script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"

const pullDownThreshold = 64
let items = ref([
  {
    title: "1",
    value: 1
  },
  {
    title: "2",
    value: 2
  },
  {
    title: "3",
    value: 3
  }
])

async function load({ done }) {
  // Perform API call
  console.log("loading")
  await new Promise((resolve) => setTimeout(() => resolve(), 2000))
  items.value = Array.from({ length: 3 }, (k, v) => ({
    title: `${v + 1}`,
    value: v + 1
  }))
  console.log("load finish")
  done("ok")
}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    >

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
      </nav>

      <v-btn
        prepend-icon="mdi-heart"
      >
        Hey
      </v-btn>

      <div class="scrollable-container bg-surface-light">
        <v-pull-to-refresh
          :pull-down-threshold="pullDownThreshold"
          @load="load"
        >
          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.value"
              :title="item.title"
            />
          </v-list>
        </v-pull-to-refresh>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }

  .scrollable-container {
    max-height: 300px;
    overflow-y: scroll;
  }
</style>
