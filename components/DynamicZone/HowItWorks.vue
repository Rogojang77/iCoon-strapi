<script setup>

const { heading, sub_heading, steps, section_classes, nuxt_ui_configs } = defineProps({
  heading: {
    type: String,
    required: true,
  },
  sub_heading: {
    type: String,
    default: '', // Default to empty string if not provided
  },
  steps: {
    type: Array,
    default: () => [], // Default to an empty array
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

// Reactive variables to track mouse position for hover effect
const mouseX = ref(0);
const mouseY = ref(0);

// Handle mouse movement
function handleMouseMove(event) {
  const { currentTarget, clientX, clientY } = event;
  const { left, top } = currentTarget.getBoundingClientRect();

  mouseX.value = clientX - left;
  mouseY.value = clientY - top;
}

// Dynamic UI configurations
const headingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "Heading"));
const subHeadingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "SubHeading"));

</script>

<template>
  <UContainer
    :ui="{
      base: section_classes ? section_classes : 'relative items-center',
      padding: 'py-20 sm:py-12 md:py-16 lg:py-20',
    }"
  >    <div class="max-w-7xl mx-auto relative z-40">
      <!-- Heading Section -->
      <div class="text-center mb-8 mx-auto">
        <Heading v-if="heading" :class="headingConfig?.value?.class">
          {{ heading }}
        </Heading>
        <SubHeading v-if="sub_heading" :class="subHeadingConfig?.value?.class">
          {{ sub_heading }}
        </SubHeading>
      </div>
      <!-- Cards Loop -->
      <div class="grid grid-cols-1 md:grid-cols-4 max-w-4xl mx-auto py-20">
        <div
          v-for="(item, index) in steps"
          :key="'card-' + index"
          class="col-span-4 md:col-span-1"
        >
          <!-- Index Display -->
          <p class="text-9xl font-bold text-neutral-900 mt-8">{{ "0" + (index + 1) }}</p>

          <!-- Horizontal Line (formerly animated) -->
          <div class="h-px w-full hidden md:block bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-full mt-16 relative overflow-hidden">
            <!-- Beam effect removed -->
          </div>
          
          <!-- Card Body -->
          <div
            class="group p-8 rounded-md border border-neutral-800 bg-neutral-950 relative z-40 col-span-2"
            @mousemove="handleMouseMove"
          >
            <div
              class="absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-md pointer-events-none"
              :style="{
                backgroundImage: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`
              }"
            ></div>

            <!-- Title -->
            <p class="text-xl font-bold relative z-20 mt-2">{{ item.title }}</p>

            <!-- Description -->
            <p class="text-neutral-400 mt-4 relative z-20">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
