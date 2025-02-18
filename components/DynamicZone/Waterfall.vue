<script setup>

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const { heading, sub_heading, text, media, mirror, fullWidth, first_column_width, CTAs, form, section_classes, nuxt_ui_configs, img_attrs } = defineProps({
  heading: {
    type: String,
    default: 'Frequently Asked Questions'
  },
  sub_heading: {
    type: String,
    default: 'Get answers to common questions'
  },
  text: {
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
  first_column_width: {
    type: String,
    default: "1/2"
  },
  media: {
    type: Array,
    default: () => []
  },
  form: { 
    type: Object, 
    default: () => ({ inputs: [] }) 
  },
  img_attrs: {
    type: Object,
    default: () => ({})
  },
  CTAs: {
    type: Array,
    default: () => []
  },
  nuxt_ui_configs : {
    type: Array,
    default: () => [],
  },
  section_classes: {
    type: String,
    default: "",
  }
});

// Dynamic UI configurations
const headingConfigString = ""
const subHeadingConfigString = ""
const textConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Text'));
const carouselConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Carousel'));
const formConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Form'));

const state = reactive({
  email: undefined,
  name: undefined,
  message: undefined,
});

const singleColumn = computed(() => {
  return ((!media || media.length === 0) && (!form || form.length === 0));
});

const formWithMedia = computed(() => {
  return (form && media);
});

const columnWidthMap = {
  "1/2": "basis-1/2",
  "1/3": "basis-1/3",
  "2/3": "basis-2/3",
  "1/4": "basis-1/4",
  "3/4": "basis-3/4",
  "full": "basis-full"
};

const inverseWidthMap = {
  "1/2": "basis-1/2",
  "1/3": "basis-2/3",
  "2/3": "basis-1/3",
  "1/4": "basis-3/4",
  "3/4": "basis-1/4",
  "full": "basis-full"
};

const firstColumnWidthClass = computed(() => {
  return columnWidthMap[first_column_width] || "basis-1/2";
});

const secondColumnWidthClass = computed(() => {
  return inverseWidthMap[first_column_width] || "basis-1/2";
});

</script>

<template>
  <UContainer
    :class="[
      section_classes, 'flex items-center justify-between',
      singleColumn ? 'flex-col' : mirror ? 'flex-col sm:flex-row-reverse' : 'flex-col lg:flex-row', 
    ]"
    :ui="{
      strategy: 'override',
      base: fullWidth ? 'w-full' : 'container sm:container mx-auto gap-32 sm:gap-18',
      padding: fullWidth ? 'px-0 py-0 sm:px-0 lg:px-0 ' : 'py-8',
      constrained: fullWidth ? 'max-w-full w-full' : '',
    }"
  >
    <!-- Text Section -->
    <div v-if="!formWithMedia" :class="[firstColumnWidthClass, singleColumn ? 'w-full' : 'w-full text-center sm:text-left', textConfig.value?.class, fullWidth ? 'p-4 sm:p-6 md:p-8 lg:p-10' : 'px-0']">
      <!-- Heading -->
      <Heading v-if="heading" size="md" :className="headingConfigString || 'text-center sm:text-left'">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :className="subHeadingConfigString || 'text-center sm:text-left text-lg font-medium'">
        {{ sub_heading }}
      </SubHeading>
      <p>
        {{ text }}
      </p>
      <!-- CTA Buttons -->
      <div class="flex space-x-2 mt-8 items-center justify-center lg:justify-left xl:justify-left">
        <UButton
          v-for="button in CTAs"
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
    </div>

    <!-- Media Section -->
    <div v-if="media && media.length > 0"
      :class="['max-h-full', formWithMedia && mirror ? secondColumnWidthClass : !mirror ? secondColumnWidthClass : '', singleColumn ? 'w-full' : 'w-full flex justify-end']"
    > 
      <div v-if="media[0].mime.includes('video')" class="w-full h-full">
        <video v-for="(item, index) in media" :key="index"
          type='video/mp4'
          preload="auto"
          controls
          class="w-full h-full"
          :src="useStrapiImage(item.url)"
          :alt="item.alt || 'Media Video'"
        >
        </video>
      </div>

      <swiper
        :direction="'vertical'"
        :spaceBetween="200"
        class="waterfall_swiper sm:w-lg sm:h-lg md:w-2xl md:h-2xl lg:w-xl lg:h-xl xl:h-3xl xl:w-3xl 2xl:h-4xl 2xl:w-4xl  rounded-full flex items-center justify-center"
      >
        <swiper-slide v-for="(item, index) in media" :key="index">
          <NuxtPicture
            :src="useStrapiImage(item.url)"
            :alt="item.alt || 'Media Image'"
            class="overflow-hidden w-full h-full rounded-full"
            :img-attrs="img_attrs || { class: 'object-cover w-full h-full' }"
          />
        </swiper-slide>
      </swiper>
    </div>


    <!-- Form Section -->
    <div v-if="form?.inputs"
      :class="[singleColumn ? 'w-full' : 'w-full sm:w-2/4', 'flex justify-center flex-wrap gap-4', formWithMedia && mirror ? firstColumnWidthClass : secondColumnWidthClass, formConfig.value?.class]"
    >
      <div v-if="formWithMedia" class="pb-4">
        <Heading v-if="heading" size="md" :className="headingConfigString">
          {{ heading }}
        </Heading>
        <SubHeading v-if="sub_heading" :className="subHeadingConfigString">
          {{ sub_heading }}
        </SubHeading>
      </div>
      <UForm :state="state" class="w-full space-y-4">
        <UFormGroup v-for="(input, index) in form?.inputs" :label="input.type !== 'submit' ? input.name : ''" :key="index" :name="input.name">
          <div class="mt-2">
            <UInput
              v-if="['text', 'email', 'password', 'color', 'date', 'datetime-local', 'file', 'image', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week'].includes(input.type)"
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
              :value="input.value"
              v-model="state[input.name]"
            />
            <UTextarea 
              v-if="input.type === 'textarea'"
              :name="input.name"
              :placeholder="input.placeholder"
              v-model="state[input.name]"
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
            >
            </UCheckbox>
            <UButton
              v-if="input.type === 'submit' || input.type === 'button'"
              :type="input.type === 'submit' ? 'submit' : 'button'"
            >
              {{ input.name }}
            </UButton>
          </div>
        </UFormGroup>
      </UForm>
    </div>
  </UContainer>
</template>

<style scoped>

:deep(.swiper.waterfall_swiper) {
  background: #fff;
  box-shadow: -17px 0px 50px -31px rgba(0, 0, 0, 0.2);
  margin-left: none !important;
  margin-right: none !important;
}

:deep(.waterfall_swiper .swiper-slide) {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.waterfall_swiper .swiper-slide) {
  padding: 10%;
  overflow: hidden !important;
}

:deep(.waterfall_swiper .swiper-slide img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}



</style>