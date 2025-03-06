<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const props = defineProps({
  heading: String,
  description: String,
  products: { type: Array, default: () => [] },
  mirror: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  firstColumnWidth: { type: String, default: "1/2" },
  CTAs: { type: Array, default: () => [] },
  section_classes: { type: String, default: "" },
  nuxt_ui_configs: { type: Array, default: () => [] },
  img_attrs: { type: Object, default: () => ({}) },
});

const columnWidthMap = {
  "1/2": "basis-1/2",
  "1/3": "basis-1/3",
  "2/3": "basis-2/3",
  "1/4": "basis-1/4",
  "3/4": "basis-3/4",
  "full": "basis-full",
};

const inverseWidthMap = {
  "1/2": "basis-1/2",
  "1/3": "basis-2/3",
  "2/3": "basis-1/3",
  "1/4": "basis-3/4",
  "3/4": "basis-1/4",
  "full": "basis-full",
};

const firstColumnWidthClass = computed(() => columnWidthMap[props.firstColumnWidth] || "basis-1/2");
const secondColumnWidthClass = computed(() => inverseWidthMap[props.firstColumnWidth] || "basis-1/2");

const headingConfigString = '';
const activeIndex = ref(0);
const attributes = [];
const descriptions = [];
const titles = [];
const images = [];

props.products.forEach(product => {
  attributes.push(product.attribute);
  descriptions.push(product.description);
  titles.push(product.name);
  images.push(product.images[0]);
});


const updatePaginationCurve = () => {
  const bullets = document.querySelectorAll(".swiper-pagination-bullet");
  const total = bullets.length;
  const radius = -350;

  bullets.forEach((bullet, index) => {
    const angle = ((index - (total - 1) / 2) * (total + 2));
    const y = radius * Math.sin(-angle * (Math.PI / 180));
    const x = radius * Math.cos(angle * (Math.PI / 180)) - radius;
    bullet.style.transform = `translate(${x}px, ${y}px)`;
  });
};

const swiperInstance = ref(null);

const handleSwiper = (swiper) => {
  swiperInstance.value = swiper;
  swiper.on("slideChange", updatePaginationCurve);
  swiper.on("update", updatePaginationCurve);
  setTimeout(updatePaginationCurve, 100);
  swiper.on("slideChange", () => {
    activeIndex.value = swiper.activeIndex;
  });
};

watchEffect(() => {
  if (swiperInstance.value) {
    setTimeout(updatePaginationCurve, 100);
  }
});
</script>

<template>
  <UContainer
    :ui="{
      strategy: 'override',
      base: [props.section_classes, props.mirror ? 'flex-col sm:flex-row-reverse' : 'flex-col lg:flex-row', 'container'],
    }"
  >
    <!-- Text Section -->
    <div :class="[firstColumnWidthClass]">
      <!-- Heading -->
      <Heading v-if="titles" size="md" :className="headingConfigString || 'text-center sm:text-left mb-6 sm:mb-4'">
        {{ titles[activeIndex] }}
      </Heading>
      <p>{{ descriptions[activeIndex] }}</p>

      <!-- Attributes -->
      <div class="flex">
        <div class="my-10 mx-4 flex gap-2 items-center justify-end" style="writing-mode: vertical-rl">
          {{ attributes[activeIndex] }}
          <div class="rounded-full w-6 h-6" :style="{ backgroundColor: attributes[activeIndex] }"></div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex space-x-2 mt-8 items-center justify-center lg:justify-left xl:justify-left">
        <UButton
          v-for="button in props.CTAs"
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
    <div :class="['max-h-full w-full flex justify-end pt-24 lg:p-0', secondColumnWidthClass]">
      <swiper
        :modules="[Pagination]"
        :pagination="{ clickable: true }"
        :direction="'vertical'"
        :spaceBetween="200"
        @swiper="handleSwiper"
        class="product_swiper w-[90vw] h-[90vw] lg:w-[50vh] lg:h-[50vh] xl:w-[80vh] xl:h-[80vh] rounded-full flex items-center justify-center"
      >
        <swiper-slide v-for="(item, index) in images" :key="index">
          <NuxtPicture
            :src="useStrapiImage(item.url)"
            :alt="item.alt || 'Media Image'"
            class="overflow-hidden w-full h-full rounded-full"
            :img-attrs="props.img_attrs || { class: 'object-cover w-full h-full' }"
          />
        </swiper-slide>
      </swiper>
    </div>
  </UContainer>
</template>

<style scoped>
:deep(.swiper.product_swiper) {
  background: #fff;
  box-shadow: -30px 0px 50px -31px rgba(0, 0, 0, 0.2);
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
  padding: 10%;
  overflow: hidden !important;
}

:deep(.product_swiper .swiper-slide img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.swiper-pagination.swiper-pagination-vertical) {
  left: 5%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
}

:deep(.swiper-pagination-bullet) {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #000;
  border-radius: 50%;
  transition: all 0.3s ease;
}
</style>
