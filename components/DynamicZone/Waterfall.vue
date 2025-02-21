<script setup>

import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const { heading, sub_heading, mirror, fullWidth, section, nuxt_ui_configs, row_classes } = defineProps({
  heading: {
    type: String,
    default: ''
  },
  sub_heading: {
    type: String,
    default: ''
  },
  mirror: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  section: {
    type: Array,
    default: () => []
  },
  nuxt_ui_configs : {
    type: Array,
    default: () => []
  },
  row_classes: {
    type: String,
    default: ""
  }
});

// Dynamic UI configurations
const headingConfigString = ""
const subHeadingConfigString = ""

const state = reactive({
  email: undefined,
  name: undefined,
  message: undefined,
});

const singleColumn = computed(() => {
  return !section.length === 0;
});

console.log(section[1])

const columnWidthMap = {
  "1/2": "basis-1/2",
  "1/3": "basis-1/3",
  "2/3": "basis-2/3",
  "3/3": "basis-3/3",
  "1/4": "basis-1/4",
  "3/4": "basis-3/4",
  "full": "basis-full"
};

function getColumnWidthClasses(columnWidth) {
  return columnWidthMap[columnWidth] || "basis-1/2"
}

</script>

<template>
  <UContainer
    :class="[
      row_classes, 'flex items-center justify-between',
      singleColumn ? 'flex-col' : mirror ? 'flex-col sm:flex-row-reverse' : 'flex-col lg:flex-row', 
    ]"
    :ui="{
      strategy: 'override',
      base: fullWidth ? 'w-full' : 'container sm:container mx-auto gap-32 sm:gap-18',
      padding: fullWidth ? 'px-0 py-0 sm:px-0 lg:px-0 ' : 'py-8',
      constrained: fullWidth ? 'max-w-full w-full' : '',
    }"
  >
    <!-- Heading Section -->
    <div v-if="heading || sub_heading" :class="[singleColumn ? 'w-full' : 'w-full text-center sm:text-left', fullWidth ? 'p-4 sm:p-6 md:p-8 lg:p-10' : 'px-0']">
      <Heading v-if="heading" size="md" :className="headingConfigString || 'text-center sm:text-left'">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :className="subHeadingConfigString || 'text-center sm:text-left text-lg font-medium'">
        {{ sub_heading }}
      </SubHeading>
    </div>
    <!-- Row -->
    <div class="flex items-center w-full">
      <!-- Col -->
      <div v-for="column in section" :class="[column.section_classes, getColumnWidthClasses(column.section_width)]">
          <!-- Title -->
          <Heading v-if="column.heading" :className="headingConfigString || 'text-center sm:text-left mb-10'">
            {{ column.heading }}
          </Heading>
          <!-- SubTitle -->
          <SubHeading v-if="column.sub_heading" :className="subHeadingConfigString || 'text-center sm:text-left text-lg font-medium'">
            {{ column.sub_heading }}
          </SubHeading>
          <!-- Text -->
          <p v-if="column.text" v-html="column.text"></p>

          <!-- Button -->
          <div v-if="column.CTAs.length !== 0" class="flex space-x-2 mt-8 items-center justify-center lg:justify-left xl:justify-left">
            <UButton
              v-for="button in column.CTAs"
              :target="button.target"
              :key="button.id"
              :to="button.URL"
              :variant="button.variant || 'solid'"
              :size="button.size || 'lg'"
              :color="button.color || 'primary'"
              :icon="button.icon"
              :trailing="button.trailing"
              :ui="button.nuxt_ui_config?.json_data || {}"
            >
              {{ button.text }}
            </UButton>
          </div>
          <!-- Media -->
          <div v-if="column.media" class="w-full"> 
            <!-- <div v-if="column.media[0].image.mime.includes('video')" class="w-full h-full">
              <video v-for="(item, index) in column.media" :key="index"
                type='video/mp4'
                preload="auto"
                controls
                class="w-full h-full"
                :src="useStrapiImage(item.image.url)"
                :alt="item.image.alt || 'Media Video'"
              >
              </video>
            </div> -->
            <UCarousel v-slot="{ item }" :items="column.media.image"
            >
              <NuxtPicture
                :src="useStrapiImage(item.url)"
                :alt="item.alt || 'Media Image'"
                class="overflow-hidden w-full h-full"
                :img-attrs="item.img-attrs || { class: 'object-cover w-full h-full' }"
              />
            </UCarousel>
          </div>
          <!-- Form Section -->
          <div v-if="column.form?.inputs"
            :class="['flex justify-center flex-wrap gap-4 z-1 pb-64']"
          >
            <UForm :state="state" class="w-full space-y-4 flex flex-wrap items-center justify-between">
              <UFormGroup 
                v-for="(input, index) in column.form?.inputs" 
                :key="index" 
                :name="input.name" 
                :class="[
                  input.type !== 'textarea' ? 'w-48/100 mt-4' : 'w-full mt-4', 
                  input.type === 'submit' ? 'flex justify-end' : ''
                ]"
                :ui="{
                  placeholder: 'placeholder-black dark:placeholder-gray-500',
                }"
              >
                  <UInput
                    v-if="['text', 'email', 'password', 'color', 'date', 'datetime-local', 'file', 'image', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week'].includes(input.type)"
                    :type="input.type"
                    :name="input.name"
                    :placeholder="input.placeholder"
                    :value="input.value"
                    v-model="state[input.name]"
                    :ui="{
                      base: 'focus:outline-none w-full',
                      rounded: 'rounded-full',
                    }"
                  />
                  <UTextarea 
                    v-if="input.type === 'textarea'"
                    :name="input.name"
                    :placeholder="input.placeholder"
                    v-model="state[input.name]"
                    class="w-full"
                    :ui="{
                      base: 'focus:outline-none w-full',
                      rounded: 'rounded-2xl',
                    }"
                  ></UTextarea>
                  <URadioGroup
                    v-if="input.type === 'radio'"
                    :name="input.name"
                    v-model="state[input.name]"
                  >
                    <URadio
                      v-for="option in input.options"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </URadio>
                  </URadioGroup>
                  <UCheckbox
                    v-if="input.type === 'checkbox'"
                    :name="input.name"
                    :label="input.name"
                    v-model="state[input.name]"
                    :ui="{
                      rounded: 'rounded-full'
                    }"
                  >
                  </UCheckbox>
                  <UButton
                    v-if="input.type === 'submit' || input.type === 'button'"
                    :type="input.type === 'submit' ? 'submit' : 'button'"
                    class="flex bg-black rounded-full font-light tracking-wider px-8"
                  >
                    {{ input.name }}
                  </UButton>
                </UFormGroup>
            </UForm>
            <p v-if="column.form.form_description" class="text-sm">
              {{ column.form.form_description }}
            </p>
          </div>
      </div>
    </div>
  </UContainer>
</template>