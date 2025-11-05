<template>
  <div class="ui-showcase">
    <div class="ui-showcase--main">
      <NuxtLink
        v-if="link && image"
        class="ui-showcase--image-link"
        :to="link"
        :aria-label="aria || undefined"
      >
        <NuxtImg
          preload
          class="ui-showcase--image"
          height="200"
          :alt="alt || ''"
          :src="image"
          :placeholder="[150, 150, 50, 5]"
          loading="lazy"
        />
      </NuxtLink>
      <NuxtImg
        v-else-if="image"
        preload
        class="ui-showcase--image"
        height="200"
        :alt="alt || ''"
        :src="image"
        :placeholder="[150, 150, 50, 5]"
        loading="lazy"
      />

      <div class="ui-showcase--content">
        <div class="ui-showcase--title">
          <NuxtLink
            v-if="link"
            :to="link"
            class="ui-showcase--title-link"
            :aria-label="aria || undefined"
          >
            <slot name="title" />
          </NuxtLink>
          <slot
            v-else
            name="title"
          />
        </div>

        <div class="ui-showcase--description">
          <slot name="description" />
        </div>
      </div>
    </div>

    <div
      v-if="actions"
      class="ui-showcase--actions"
    >
      <slot name="actions" />
    </div>

    <UiDivider style="margin-top: 16px; margin-bottom: 16px;" />
  </div>
</template>

<script setup lang="ts">
defineProps<{

  /**
   * Controls whether the image slot is rendered
   */
  image?: string;

  /**
   * Alternative text for the image
   */
  alt?: string;

  /**
   * Optional link; when provided, the title is wrapped in a NuxtLink
   */
  link?: string;

  /**
   * Controls whether the actions slot is rendered
   */
  actions?: boolean;

  /**
   * Aria label for the title link (when link is provided)
   */
  aria?: string;
}>()
</script>

<style scoped lang="scss">
.ui-showcase {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: .25rem 0;
  color: var(--text);

  &--main {
    display: flex;
    align-items: center;
    gap: .75rem;

    @media (max-width: 640px) {
      flex-direction: column;
    }
  }

  &--image {
    width: 100%;
    height: 200px;
    object-fit: contain;
    border-radius: .375rem;
    margin-right: .5rem;

    &-link {
      color: transparent;
      border-color: transparent;
      text-decoration: none;
    }
  }

  &--content {
    display: flex;
    flex-direction: column;
    min-width: 0;

    @media (max-width: 640px) {
      align-items: center;
    }
  }

  &--title {
    font-weight: 600;
    font-size: 1.05rem;
    line-height: 1.2;

    &-link {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 2px;
      }
    }
  }

  &--description {
    opacity: .9;
    font-size: .95rem;
  }

  &--actions {
    margin-left: auto;
    display: flex;
    gap: .5rem;
  }
}
</style>
