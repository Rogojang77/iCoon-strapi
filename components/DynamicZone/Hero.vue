<script setup>
import { computed } from 'vue';

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  sub_heading: {
    type: String,
    required: true,
  },
  CTAs: {
    type: Array,
    default: () => [],
  },
  background_image: {
    type: Object,
    default: () => ({}),
  },
  section_classes: {
    type: String,
    default: "",
  },
  nuxt_ui_configs: {
    type: Array,
    default: () => [],
  },
});

const headingClasses = computed(() => getConfigByComponentName(props.nuxt_ui_configs, "Heading").class);
const subheadingClasses = computed(() => getConfigByComponentName(props.nuxt_ui_configs, "SubHeading").class);

function onClick(button) {
    if (button.URL) {
        navigateTo(button.URL);
    } else {
        const nextSection = document.querySelector('[__component="dynamic-zone.product-section"]') 
    
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

</script>

<template>
  <UContainer
    :ui="{
      strategy: 'override',
      base: [props.section_classes || ''],
      constrained: 'max-w-full',
      padding: 'py-[15vh]',
    }"
    :style="{ background: `url(${useStrapiImage(props.background_image?.url)}) no-repeat center center/cover` }"
  >
    <!-- Heading Section -->
    <div class="mb-8 mx-auto px-8">
      <Heading v-if="props.heading" as="h1" size="2xl" :className="headingClasses">
        {{ props.heading }}
      </Heading>
      <SubHeading v-if="props.sub_heading" :className="subheadingClasses">
        {{ props.sub_heading }}
      </SubHeading>
    </div>
    <!-- CTA Buttons -->
    <div class="flex flex-wrap justify-center absolute right-[-50px] sm:right-0 z-1">
      <UButton
        v-for="button in props.CTAs"
        :key="button.id"
        @click="onClick(button)"
        :to="button.URL"
        :target="button.target"
        :variant="button.variant || 'solid'"
        :size="button.size || 'md'"
        :color="button.color || 'primary'"
        :icon="button.icon"
        :trailing="button.trailing"
        :ui="button.nuxt_ui_config?.json_data || {}"
        class="w-full sm:w-auto"
      >
        {{ button.text }}
      </UButton>
    </div>
  </UContainer>
</template>

