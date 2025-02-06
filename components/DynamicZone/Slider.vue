<script setup>
import { defineProps, computed, reactive } from 'vue';

const { slides, sliderConfig, img_attrs } = defineProps({
  slides: {
    type: Array,
    default: () => [] // Each slide can contain { title, description, buttons, url, alt }
  },
  sliderConfig: {
    type: Object,
    default: () => ({})
  },
  img_attrs: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <UCarousel v-slot="{ item }" :items="slides" :ui="sliderConfig">
    <div class="slider-slide flex flex-col items-center justify-center p-8 text-center">
      <h2 v-if="item.title" class="text-2xl font-bold mb-4">
        {{ item.title }}
      </h2>
      <p v-if="item.description" class="text-base mb-6">
        {{ item.description }}
      </p>
      <div v-if="item.buttons && item.buttons.length" class="flex space-x-4 mb-6">
        <UButton
          v-for="button in item.buttons"
          :key="button.text"
          :to="button.URL"
          :variant="button.variant || 'solid'"
          :size="button.size || 'md'"
          :color="button.color || 'primary'"
        >
          {{ button.text }}
        </UButton>
      </div>
      <NuxtPicture
        v-if="item.url"
        :src="item.url"
        :alt="item.alt || 'Slide Image'"
        class="mt-8 w-full h-auto object-cover"
        :img-attrs="img_attrs || { class: 'object-cover w-full h-full' }"
      />
    </div>
  </UCarousel>
</template>

