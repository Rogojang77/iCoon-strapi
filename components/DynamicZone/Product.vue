<script setup>

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const { heading, description, media, mirror, fullWidth, first_column_width, CTAs, section_classes, nuxt_ui_configs, img_attrs } = defineProps({
  heading: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  mirror: {
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
const textConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Text'));

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

import { ref } from "vue";

const swiperInstance = ref(null); // Store Swiper instance

const onSwiper = (swiper) => {
  swiperInstance.value = swiper; // Assign the Swiper instance properly
  console.log("Swiper initialized:", swiper);
};

const slideToColor = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index);
  } else {
    console.warn("Swiper instance is not available yet.");
  }
};



</script>

<template>
  <UContainer
    :class="[
      section_classes, 'flex items-center justify-between',
      mirror ? 'flex-col sm:flex-row-reverse' : 'flex-col lg:flex-row', 
    ]"
    :ui="{
      strategy: 'override',
      base: 'container sm:container mx-auto gap-32 sm:gap-18',
      padding: 'py-8',
    }"
  >
    <!-- Text Section -->
    <div :class="[firstColumnWidthClass, textConfig.value?.class, 'px-0']">
      <!-- Heading -->
      <Heading v-if="heading" size="md" :className="headingConfigString || 'text-center sm:text-left'">
        {{ heading }}
      </Heading>
      <p>
        {{ description }}
      </p>
      <!-- Color Selctor -->
      <div class="flex">
        <a 
          href="#" 
          v-for="(item, index) in media" 
          :key="index" 
          style="writing-mode: vertical-rl"
          @click.prevent="slideToColor(index)" 
          class="my-10 mx-4 flex gap-2 items-center justify-end"
        >
          {{ item.product_color }}
          <div 
            class="rounded-full w-6 h-6"
            :style="{ backgroundColor: item.product_color.toLowerCase() }"
          ></div>
        </a>

      </div>
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
      :class="['max-h-full w-full flex justify-end', secondColumnWidthClass]"
    > 
      <swiper
        :direction="'vertical'"
        :spaceBetween="200"
        @swiper="onSwiper"
        class="product_swiper sm:w-lg sm:h-lg md:w-2xl md:h-2xl lg:w-xl lg:h-xl xl:h-3xl xl:w-3xl 2xl:h-4xl 2xl:w-4xl rounded-full flex items-center justify-center"
      >
        <swiper-slide v-for="(item, index) in media" :key="index">
          <NuxtPicture
            :src="useStrapiImage(item.image.url)"
            :alt="item.image.alt || 'Media Image'"
            class="overflow-hidden w-full h-full rounded-full"
            :img-attrs="img_attrs || { class: 'object-cover w-full h-full' }"
          />
        </swiper-slide>
      </swiper>

    </div>
  </UContainer>
</template>

<style scoped>
:deep(.swiper.product_swiper) {
  background: #fff;
  box-shadow: -17px 0px 50px -31px rgba(0, 0, 0, 0.2);
  margin-left: none !important;
  margin-right: none !important;
}

:deep(.product_swiper .swiper-slide) {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.product_swiper .swiper-slide) {
  padding: 10%;
  overflow: hidden !important;
}

:deep(.product_swiper .swiper-slide img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>