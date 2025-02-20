<script setup>

const { heading, sub_heading, blurbs, columns_per_row, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: "Our Features",
  },
  sub_heading: {
    type: String,
    default: "Explore the key benefits we offer",
  },
  blurbs: {
    type: Array,
    default: () => [],
  },
  columns_per_row: {
    type: Number,
    default: 3,
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

// Calculate the Tailwind grid class
const gridClass = computed(() => `grid justify-center justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns_per_row} gap-6 sm:gap-4`);


</script>

<template>
  <UContainer
    :ui="{
      strategy: 'override',
      base: section_classes ? section_classes : 'py-10',
      padding: '',
    }"
  >
    <!-- Heading Section -->
    <div class="text-center mb-8 mx-auto">
      <Heading v-if="heading" :class="headingConfigString">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :class="subHeadingConfigString">
        {{ sub_heading }}
      </SubHeading>
    </div>

    <!-- Blurbs Section -->
    <div :class="gridClass">
      <UCard
        v-for="(blurb) in blurbs"
        :key="blurb.id"
        :ui="{...blurb.nuxt_ui_config?.json_data}"
        :class="['flex', blurb.image_left ? 'flex-row' : 'flex-col']"
      >
        <!-- Media Section -->
        <template v-if="blurb.image?.url" #header>
          <NuxtPicture
            :src="useStrapiImage(blurb.image.url)"
            :alt="blurb.image.alt || 'Blurb Media'"
            :img-attrs=" blurb.img_attrs || { class: 'object-contain', width: '100', height: '100' }"
          />
        </template>

        <!-- Content Section -->
        <div v-if="blurb.heading !== '' || blurb.text !== ''">
          <Heading
            v-if="blurb.heading" as="h3"
            class= 'text-left font-semibold mb-2 text-md sm:text-lmd md:text-md lg:text-xl xl:text-2xl dark:text-slate-200'
          >
            {{ blurb.heading }}
          </Heading>
          <p
            v-if="blurb.text"
            class="text-left text-slate-800 dark:text-slate-200 mb-4"
          >
            {{ blurb.text }}
          </p>
        </div>

        <template v-if="blurb.buttons?.length > 0 && !blurb.image_left" #footer>
          <UButton
            v-for="button in blurb.buttons"
            :target="button.target"
            :key="button.id"
            :to="button.URL"
            :variant="button.variant || 'solid'"
            :size="button.size || 'md'"
            :color="button.color || 'primary'"
            :icon="button.icon"
            :trailing="button.trailing"
            :ui="button.nuxt_ui_config?.json_data || {}"
            >
            {{ button.text }}
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>