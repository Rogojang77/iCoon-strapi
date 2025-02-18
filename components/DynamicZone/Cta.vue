<script setup>

const { heading, sub_heading, CTAs, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Default Heading'
  },
  sub_heading: {
    type: String,
    default: 'Default Sub-heading'
  },
  CTAs: {
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
const headingConfigString = computed(() => JSON.parse(JSON.stringify(getConfigByComponentName(nuxt_ui_configs, "Heading").class)));
const subHeadingConfigString = computed(() => JSON.parse(JSON.stringify(getConfigByComponentName(nuxt_ui_configs, "SubHeading").class)));

</script>


<template>
  <UContainer
    :ui="{
      base: section_classes ? section_classes : 'relative flex flex-col justify-between items-center py-20 sm:py-12 md:py-16 lg:py-20',
      padding: '',
    }"
  >
    <!-- Heading Section -->
    <div class="mb-8">
      <Heading v-if="heading" :class="headingConfigString">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :class="subHeadingConfigString">
        {{ sub_heading }}
      </SubHeading>
    </div>
    <div class="flex space-x-2 items-center mt-8">
      <UButton
        v-for="button in CTAs"
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
    </div>
  </UContainer>
</template>