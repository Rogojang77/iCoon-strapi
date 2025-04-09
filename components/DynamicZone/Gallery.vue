<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/effect-coverflow';
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

const swiperRef = ref(null);

const isAtStart = ref(true);
const isAtEnd = ref(false);

const onReachEnd = () => {
  isAtEnd.value = true;
  isAtStart.value = false;
};

const onReachBeginning = () => { 
  isAtEnd.value = false;
  isAtStart.value = true;
};

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
      :centeredSlides="false"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 1,

      }"
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
      @reachEnd="onReachEnd"
      @reachBeginning="onReachBeginning"
      class="gallery_swiper flex items-center justify-center"
    >
      <swiper-slide v-for="(item, index) in media" :key="index" :id="index">
        <NuxtPicture
          :src="useStrapiImage(item.image.url)"
          :alt="item.alt || 'Media Image'"
          :img-attrs="{ class: 'min-h-[400px]' }"
          class="object-cover min-h-[400px]" 
        />
        <h3 v-if="item.title" class="text-lg font-bold mt-2">
          {{ item.title }}
        </h3>
        <p v-if="item.description" class="text-sm text-gray-500">
          {{ item.description }}
        </p>
      </swiper-slide>
    </swiper>
    <div :class="['flex', isAtEnd ? 'justify-start' : isAtStart ? 'justify-end' : 'justify-between']">
      <UButton
        variant="ghost"
        size="md"
        color="black"
        class="prev_button"
        :class="{ hidden: isAtStart }"
        :trailing="false" 
      >
        <template #leading>
          <UIcon name="i-material-symbols-play-circle" class="rotate-180 w-8 h-8" />
        </template>
        SCROLL TO LEFT
      </UButton>
      <UButton
        variant="ghost"
        size="md"
        color="black"
        class="next_button"
        :class="{ hidden: isAtEnd }"
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
  padding-top: 10px;
  margin: 0 -15px;
}

:deep(.swiper.gallery_swiper .swiper-slide#4) {
  display: hidden;
}

:deep(.gallery_swiper .swiper-slide) {
  opacity: 40%;
  padding: 15px;
}

:deep(.gallery_swiper .swiper-slide-next) {
  opacity: 60%;
}

:deep(.gallery_swiper .swiper-slide-prev) {
  opacity: 0;
}

:deep(.gallery_swiper .swiper-slide-active) {
  opacity: 1;
  padding: 15px;
  transform: scale(1);
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
}
:deep(.gallery_swiper .swiper-slide img) {
  display: block;
  width: 100%;
  min-height: 500px;
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
    transform: scale(0.9);
  }

  :deep(.gallery_swiper .swiper-slide-next) {
    opacity: 60%;
  }

  :deep(.gallery_swiper .swiper-slide-prev) {
    opacity: 0;
  }

  :deep(.gallery_swiper .swiper-slide-active) {
    opacity: 1;
    transform: scale(1);
    margin-right: 1%;
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  }

  :deep(.gallery_swiper .swiper-slide img) {
    display: block;
    width: 100%;
    min-height: 400px;
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
    min-height: 300px;
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