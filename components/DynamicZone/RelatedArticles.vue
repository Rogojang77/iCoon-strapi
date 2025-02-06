
<script setup>
  import {format} from 'date-fns';

const { heading, sub_heading, articles, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Default Heading'
  },
  sub_heading: {
    type: String,
    default: 'Default Sub-heading'
  },
  articles: {
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
  },
});

// Dynamic UI configurations
const headingConfigString = {}
const subHeadingConfigString = {}

</script>

<template>
  <!-- Heading Section -->
  <div class="text-center mb-8 mx-auto">
    <Heading v-if="heading" :class="headingConfigString">
      {{ heading }}
    </Heading>
    <SubHeading v-if="sub_heading" :class="subHeadingConfigString">
      {{ sub_heading }}
    </SubHeading>
  </div>
  <!-- Articles Section -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UCard
      v-for="article in articles"
      :key="article.id"
      class="shadow-lg hover:shadow-xl transition duration-200 bg-neutral-900 border border-neutral-800"
    >
      <NuxtLink :to="'/blog/' + article.slug">
        <div class="relative">
          <NuxtPicture
            v-if="article.image"
            :src="useStrapiImage(article.image?.url)"
            alt="article Cover"
            :imgAttrs="{class: 'h-30 md:h-96 w-full aspect-square object-cover rounded-3xl'}"
          />
        </div>
        <div class="p-4">
          <div class="flex gap-2 mb-2">
            <span
              v-for="category in article.categories"
              :key="category.id"
              class="text-xs font-bold bg-neutral-800  px-2 py-1 rounded-full capitalize"
            >
              {{ category.name }}
            </span>
          </div>
          <h2 class="text-lg font-bold text-white">{{ article.title }}</h2>
          <p class="text-sm text-neutral-400 mt-2">
            {{ article.description.slice(0, 100) }}...
          </p>
          <p class="text-xs text-neutral-500 mt-4">
            {{ format(new Date(article.publishedAt), 'MMMM dd, yyyy') }}
          </p>
        </div>
      </NuxtLink>
    </UCard>
  </div>
</template>
