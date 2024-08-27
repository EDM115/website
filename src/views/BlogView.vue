<template>
  <v-container>
    <h1>This is a blog page</h1><br>

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
  </v-container>
</template>

<script setup>
import { ref } from "vue"

const pullDownThreshold = 64
const items = ref([
  {
    title: "1 (Pull down to load more)",
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
