<template>
  <div class="about">
    <h1>This is an about page</h1><br>

    <v-btn
      prepend-icon="mdi-heart"
    >
      Hey
    </v-btn><br>

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
</template>

<script setup>
import { ref } from "vue"

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
  await new Promise((resolve) => setTimeout(() => resolve(), 2000))
  const length = items.value.length

  for (let i = length - 1; i < length + 2; i++) {
    items.value.push({
      title: `${i + 2}`,
      value: i + 2
    })
  }
  done("ok")
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}

.scrollable-container {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
