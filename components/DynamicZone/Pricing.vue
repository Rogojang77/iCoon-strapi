<script setup>

const { heading, sub_heading, plans, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    default: 'Default Heading',
  },
  sub_heading: {
    type: String,
    default: 'Default Sub-heading',
  },
  plans: {
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

const gridClass = computed(() => `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${plans.length} gap-6 sm:gap-4`);

// Dynamic UI configurations
const headingConfigString = {}
const subHeadingConfigString = {}

const onClick = (plan) => {
  console.log('Clicked plan:', plan)
}

</script>

<template>
  <UContainer
    :ui="{
      base: section_classes ? section_classes : 'py-10',
      padding: 'px-4 sm:px-6 md:px-8 lg:px-10',
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

    <div :class="gridClass">
      <UCard
        v-for="(plan) in plans"
        :key="plan.id"
        :ui="{...plan.nuxt_ui_config?.json_data}"
        :class="['flex', plan.image_left ? 'flex-row' : 'flex-col']"
      >
        <template :class="[ 'p-4 bg-neutral-800 rounded-2xl shadow-[0px_-1px_0px_0px_var(--neutral-700)]', plan.featured && 'bg-white shadow-aceternity']" #header>
          <div class="flex justify-between items-center">
            <p :class="['font-medium', plan.featured && 'text-black']">{{ plan.name }}</p>
            <div v-if="plan.featured" class="font-medium text-xs px-3 py-1 rounded-full relative bg-neutral-900">
              <div class="absolute inset-x-0 bottom-0 w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              Featured
            </div>
          </div>
          <div class="mt-8">
            <span :class="['text-lg font-bold text-neutral-500', plan.featured && 'text-neutral-700']">$</span>
            <span :class="['text-4xl font-bold', plan.featured && 'text-black']">{{ plan.price || plan?.CTA?.text }}</span>
            <span v-if="plan.price" :class="['text-lg font-normal  ml-2', plan.featured && 'text-neutral-700']">/ launch</span>
          </div>
          <UButton
            :class="['w-full mt-10 mb-4 px-4 py-2 border rounded', plan.featured ? 'bg-black text-white hover:bg-black/80' : 'border-neutral-800 text-slate-200 dark:text-slate-800 hover:bg-neutral-700 hover:text-white']"
          >
            {{ plan?.CTA?.text }}
          </UButton>
        </template>

        <div class="mt-1 p-4">
          <div v-for="(feature, idx) in plan.perks" :key="idx" class="flex items-start gap-2 my-4">
            <div :class="['h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5', plan.featured ? 'bg-indigo-600' : 'bg-neutral-700']">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div :class="['font-medium text-slate-800 dark:text-slate-200 text-sm', plan.featured && 'text-black']">
              {{ feature.text }}
            </div>
          </div>
        </div>

        <template v-if="plan.additional_perks && plan.additional_perks.length > 0" #footer>
          <div v-for="(feature, idx) in plan.additional_perks" :key="idx" class="flex items-start gap-2 my-4">
            <div :class="['h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5', plan.featured ? 'bg-indigo-600' : 'bg-neutral-700']">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div :class="['font-medium text-slate-800 dark:text-slate-200 text-sm', plan.featured && 'text-black']">
              {{ feature.text }}
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
