<script setup>

const { heading, sub_heading, faqs, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Frequently Asked Questions'
  },
  sub_heading: {
    type: String,
    default: 'Get answers to common questions'
  },
  faqs: {
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
})

// Dynamic UI configurations
const headingConfigString = {}
const subHeadingConfigString = {}
const accordionConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "UAccordion"));

</script>

<template>
  <UContainer class="py-10">
    <!-- Heading Section -->
    <div class="text-center mb-8 mx-auto">
      <Heading v-if="heading" :class="headingConfigString">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :class="subHeadingConfigString">
        {{ sub_heading }}
      </SubHeading>
    </div>
    <UAccordion
      :items="faqs.map(faq => ({ label: faq.question, content: faq.answer }))"
    />
  </UContainer>
</template>
