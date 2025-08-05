<template>
  <div>
    <h1>Test Page</h1>
    <UiButton text="Text prop" />
    <UiButton
      text="Outlined"
      variant="outlined"
    />
    <UiButton
      text="Tonal"
      variant="tonal"
    />
    <br>
    <br>
    <UiButton
      text="Elevated primary"
      color="primary"
      variant="elevated"
    />
    <UiButton
      text="Elevated secondary"
      color="secondary"
      variant="elevated"
    />
    <UiButton
      text="Elevated accent"
      color="accent"
      variant="elevated"
    />
    <br>
    <br>
    <UiButton
      text="Outlined primary"
      color="primary"
      variant="outlined"
    />
    <UiButton
      text="Outlined secondary"
      color="secondary"
      variant="outlined"
    />
    <UiButton
      text="Outlined accent"
      color="accent"
      variant="outlined"
    />
    <br>
    <br>
    <UiButton
      text="Tonal primary"
      color="primary"
      variant="tonal"
    />
    <UiButton
      text="Tonal secondary"
      color="secondary"
      variant="tonal"
    />
    <UiButton
      text="Tonal accent"
      color="accent"
      variant="tonal"
    />
    <br>
    <br>
    <UiButton
      text="Elevated error"
      color="error"
      variant="elevated"
    />
    <UiButton
      text="Outlined error"
      color="error"
      variant="outlined"
    />
    <UiButton
      text="Tonal error"
      color="error"
      variant="tonal"
    />
    <br>
    <br>
    <UiButton
      text="Elevated info"
      color="info"
      variant="elevated"
    />
    <UiButton
      text="Outlined info"
      color="info"
      variant="outlined"
    />
    <UiButton
      text="Tonal info"
      color="info"
      variant="tonal"
    />
    <br>
    <br>
    <UiButton
      text="Elevated success"
      color="success"
      variant="elevated"
    />
    <UiButton
      text="Outlined success"
      color="success"
      variant="outlined"
    />
    <UiButton
      text="Tonal success"
      color="success"
      variant="tonal"
    />
    <br>
    <br>
    <UiButton
      text="Elevated warning"
      color="warning"
      variant="elevated"
    />
    <UiButton
      text="Outlined warning"
      color="warning"
      variant="outlined"
    />
    <UiButton
      text="Tonal warning"
      color="warning"
      variant="tonal"
    />

    <br><br>
    <UiButton
      color="info"
    >
      <h3>h3 slot</h3>
    </UiButton>
    <h3>h3 standalone</h3>

    <br><br>

    <UiButton
      :icon="mdiArrowLeft"
      color="success"
      variant="tonal"
    />

    <UiButton
      :prepend-icon="mdiArrowLeft"
      color="error"
      variant="tonal"
    />

    <UiButton
      :append-icon="mdiArrowLeft"
      color="error"
      variant="tonal"
    />

    <br><br>

    <UiButton
      :icon="mdiArrowLeft"
      text="This shouldn't render"
      color="error"
      variant="tonal"
    />

    <UiButton
      :prepend-icon="mdiArrowLeft"
      text="prepend icon"
      color="success"
      variant="tonal"
    />

    <UiButton
      :append-icon="mdiArrowLeft"
      text="append icon"
      color="success"
      variant="tonal"
    />

    <br><br>

    <UiButton
      disabled
      color="warning"
      link="/blog"
      text="disabled"
    />

    <UiButton
      text="FAB"
      color="primary"
      variant="tonal"
      fab
    />
  </div>
</template>

<script setup lang="ts">
import mdiArrowLeft from "~icons/mdi/arrowLeft"
</script>
