
<script setup>

const { heading, sub_heading, products, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Default Heading'
  },
  sub_heading: {
    type: String,
    default: 'Default Sub-heading'
  },
  products: {
    type: Array,
    default: () => []
  },
  section_classes: {
    type: String,
    default: "",
  },
  nuxt_ui_configs : {
    type: Array,
    default: () => [],
  }
});

// Dynamic UI configurations
const headingConfigString = {}
const subHeadingConfigString = {}

</script>

<template>
  <!-- Heading Section -->
  <div class="text-center my-8 mx-auto">
    <Heading v-if="heading" :class="headingConfigString">
      {{ heading }}
    </Heading>
    <SubHeading v-if="sub_heading" :class="subHeadingConfigString">
      {{ sub_heading }}
    </SubHeading>
  </div>
  <!-- Products Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UCard
      v-for="product in products"
      :key="product.id"
      class="shadow-lg hover:shadow-xl transition duration-200 bg-neutral-900 border border-neutral-800"
    >
      <NuxtLink :to="'/products/' + product.slug">
        <div class="relative">
          <NuxtPicture
            v-if="product.images?.[0]?.url"
            :src="useStrapiImage(product.images?.[0]?.url)"
            alt="Product Cover"
            :imgAttrs="{class: 'h-40 md:h-96 w-full aspect-square object-cover rounded-3xl'}"
          />
        </div>
        <div class="px-4 py-4">
          <h2 class="text-lg font-bold text-white">{{ product?.name }}</h2>
          <p class="font-normal uppercase">
            {{ product?.price+"$" }}
          </p>
          <p class="text-sm text-neutral-400 mt-2">
            {{ product?.description }}
          </p>
        </div>
      </NuxtLink>
    </UCard>
  </div>
</template>
