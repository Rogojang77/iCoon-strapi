<script setup>
// Props definition
const { heading, sub_heading, testimonials, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Our Testimonials',
  },
  sub_heading: {
    type: String,
    default: 'What our clients say',
  },
  testimonials: {
    type: Array,
    default: () => [],
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
const cardConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'UCard'));

</script>

<template>
  <UContainer>
    <!-- Heading Section -->
    <div class="text-center mb-8 mx-auto">
      <Heading v-if="heading" :class="headingConfigString">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :class="subHeadingConfigString">
        {{ sub_heading }}
      </SubHeading>
    </div>
    <UCarousel :items="testimonials"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4' }" arrows class="rounded-lg overflow-hidden"
    >
      <template #default="{ item }">
        <UCard
          :ui="cardConfig"
        >
          <template #header>
            <UAvatar
              class="mx-auto"
              :src="useStrapiImage(item.user?.image?.url)"
              :alt="item.name"
            />
          </template>

          <div>
            <p class="text-gray-600">{{ item.text }}</p>
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold">{{ item.user.firstname }} {{ item.user.lastname }}</h3>
                <p class="text-gray-400">{{ item.user.job }}</p>
              </div>
            </div>
          </template>
        </UCard>
      </template>
      <template #prev="{ onClick, disabled }">
        <button :disabled="disabled" @click="onClick">
          <UIcon name="i-iconoir-arrow-left" class="w-5 h-5" />
        </button>
      </template>

      <template #next="{ onClick, disabled }">
        <button :disabled="disabled" @click="onClick">
          <UIcon name="i-iconoir-arrow-right" class="w-5 h-5" />
        </button>
      </template>
    </UCarousel>
  </UContainer>
</template>
