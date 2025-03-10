<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const { media, section_classes } = defineProps({
  media: {
    type: Array,
    default: () => [],
  },
  section_classes: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <UContainer
    :ui="{
      base: section_classes ? section_classes : 'relative flex flex-col justify-between items-center py-20 sm:py-12 md:py-16 lg:py-20',
      padding: '',
    }"
  >
    <swiper
      ref="swiperRef"
      :modules="[Pagination, Navigation, Scrollbar]"
      :breakpoints="{
        480: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4
        }
      }"
      :navigation="{
        nextEl: '.next_button',
        prevEl: '.prev_button',
        enabled: true
      }"
      class="gallery_swiper flex items-center justify-center"
    >
      <swiper-slide v-for="(item, index) in media" :key="index">
        <NuxtPicture
          :src="useStrapiImage(item.image.url)"
          :alt="item.alt || 'Media Image'"
          class="object-cover overflow-hidden" 
        />
        <h3 v-if="item.title" class="text-lg font-bold mt-2">
          {{ item.title }}
        </h3>
        <p v-if="item.description" class="text-sm text-gray-500">
          {{ item.description }}
        </p>
      </swiper-slide>
    </swiper>
    <div class="flex justify-between">
      <UButton
        :ui="{
          base: 'focus:outline-none'
        }"
        variant="ghost"
        size="lg"
        color="black"
        class="prev_button"
        :trailing="false"
      >
        <template #leading>
          <UIcon name="i-material-symbols-play-circle" class="rotate-180 w-8 h-8" />
        </template>
        SCROLL TO LEFT
      </UButton>
      <UButton
        :ui="{
          base: 'focus:outline-none'
        }"
        variant="ghost"
        size="md"
        color="black"
        class="next_button"
      >
        <template #trailing>
          <UIcon name="i-material-symbols-play-circle" class="w-8 h-8" />
        </template>
        SCROLL TO RIGHT
      </UButton>
    </div>
  </UContainer>
</template>

<style scoped>
:deep(.swiper.gallery_swiper) {
  width: 100%;
  padding: 4%;
}

:deep(.gallery_swiper .swiper-slide) {
  opacity: 40%;
  margin-right: 14px;
}

:deep(.gallery_swiper .swiper-slide-next) {
  opacity: 60%;
}

:deep(.gallery_swiper .swiper-slide-prev) {
  opacity: 0;
}

:deep(.gallery_swiper .swiper-slide-active) {
  opacity: 1;
  transform: scale(1.1);
  margin-right: 25px;
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

:deep(.gallery_swiper .swiper-slide img) {
  display: block;
  width: 100%;
  object-fit: cover;
  border: 4px solid white;
  border-radius: 10px;
  box-shadow: 9px 0px 18px -7px rgba(0, 0, 0, 0.2);
}

:deep(.gallery_swiper .swiper-slide-active img) {
  box-shadow: 0px 0px 18px -7px rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 1024px) {
  :deep(.swiper.gallery_swiper) {
    width: 100%;
    padding: 6%;
  }

  :deep(.gallery_swiper .swiper-slide) {
    opacity: 40%;
    margin-right: 8px;
  }

  :deep(.gallery_swiper .swiper-slide-next) {
    opacity: 60%;
  }

  :deep(.gallery_swiper .swiper-slide-prev) {
    opacity: 0;
  }

  :deep(.gallery_swiper .swiper-slide-active) {
    opacity: 1;
    transform: scale(1.1);
    margin-right: 25px;
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  }

  :deep(.gallery_swiper .swiper-slide img) {
    display: block;
    width: 100%;
    object-fit: cover;
    border: 4px solid white;
    border-radius: 10px;
    box-shadow: 9px 0px 18px -7px rgba(0, 0, 0, 0.2);
  }

  :deep(.gallery_swiper .swiper-slide-active img) {
    box-shadow: 0px 0px 18px -7px rgba(0, 0, 0, 0.2);
  }
}

@media only screen and (max-width: 480px) {
  :deep(.swiper.gallery_swiper) {
    width: 100%;
    padding: 0;
  }

  :deep(.gallery_swiper .swiper-slide) {
    opacity: 40%;
    margin-right: 0;
  }

  :deep(.gallery_swiper .swiper-slide-next) {
    opacity: 60%;
  }

  :deep(.gallery_swiper .swiper-slide-prev) {
    opacity: 0;
  }

  :deep(.gallery_swiper .swiper-slide img) {
    display: block;
    width: 100%;
    object-fit: cover;
    border: 4px solid white;
    border-radius: 10px;
    box-shadow: 9px 0px 18px -7px rgba(0, 0, 0, 0.2);
  }

  :deep(.gallery_swiper .swiper-slide-active) {
    opacity: 1;
    transform: scale(1);
    margin-right: 0;
  }

  :deep(.gallery_swiper .swiper-slide-active img) {
    box-shadow: 0px 0px 18px -7px rgba(0, 0, 0, 0.2);
  }
}

</style>
