<script setup>

const { heading, sub_heading, launches, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Launches'
  },
  sub_heading: {
    type: String,
    default: 'Recent Space Launches'
  },
  launches: {
    type: Array,
    default: []
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
const headingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "Heading"));
const subHeadingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "SubHeading"));

  const launchesWithDecoration = computed(() =>
    launches.map((entry) => ({
      ...entry,
      icon: h(IconRocket, { class: 'h-8 w-8 text-secondary' }),
      content: h('p', { class: 'text-4xl md:text-7xl font-bold text-neutral-800' }, entry.mission_number),
    }))
  );

</script>

<template>
  <UContainer
    :ui="{
      base: section_classes ? section_classes : 'relative items-center',
      padding: 'py-20 sm:py-12 md:py-16 lg:py-20',
    }"
  >
    <!-- Heading Section -->
    <div class="text-center mb-8 mx-auto">
      <Heading v-if="heading" :class="headingConfig?.value?.class">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :class="subHeadingConfig?.value?.class">
        {{ sub_heading }}
      </SubHeading>
    </div>
    <div
      class="w-full relative h-full pt-20 md:pt-40"
    >
      <h3 class="text-xl font-semibold text-white">Launches:</h3>
      <ul class="mt-2 space-y-2">
        <li v-for="(launch) in launches" :key="launch.id" class="text-gray-200">
          <h4 class="font-bold">{{ launch.mission_number }}: {{ launch.title }}</h4>
          <p>{{ launch.description }}</p>
        </li>
      </ul>
    </div>
  </UContainer>
</template>