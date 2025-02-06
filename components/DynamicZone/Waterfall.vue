<script setup>

const { heading, sub_heading, text, media, mirror, fullWidth, CTAs, form, section_classes, nuxt_ui_configs, img_attrs } = defineProps({
  heading: {
    type: String,
    default: 'Frequently Asked Questions'
  },
  sub_heading: {
    type: String,
    default: 'Get answers to common questions'
  },
  text: {
    type: String,
    default: ''
  },
  media: {
    type: Array,
    default: () => []
  },
  mirror: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  CTAs: {
    type: Array,
    default: () => []
  },
  form: { 
    type: Object, 
    default: () => ({ inputs: [] }) 
  },
  section_classes: {
    type: String,
    default: "",
  },
  nuxt_ui_configs : {
    type: Array,
    default: () => [],
  },
  img_attrs: {
    type: Object,
    default: () => ({})
  }
});

// Dynamic UI configurations
const headingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Heading'));
const subHeadingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'SubHeading'));
const textConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Text'));
const carouselConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Carousel'));
const formConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Form'));

const state = reactive({
  email: undefined,
  name: undefined,
  message: undefined,
});

const singleColumn = computed(() => {
  return ((!media || media.length === 0) && (!form || form.length === 0));
});

const formWithMedia = computed(() => {
  return (form && media);
});

</script>

<template>
  <UContainer
    :class="[
      section_classes, 'flex items-center justify-between',
      singleColumn ? 'flex-col' : mirror ? 'flex-col sm:flex-row-reverse' : 'flex-col sm:flex-row', 
    ]"
    :ui="{
      strategy: 'replace',
      base: fullWidth ? 'w-full' : 'container sm:container mx-auto gap-32 sm:gap-18',
      padding: fullWidth ? 'px-0 py-0 sm:px-0 lg:px-0 ' : 'px-4 sm:px-6 md:px-8 lg:px-10 py-8',
      constrained: fullWidth ? 'max-w-full w-full' : '',
    }"
  >
    <!-- Text Section -->
    <div v-if="!formWithMedia" :class="[singleColumn ? 'w-full' : 'w-full sm:w-2/4 text-center sm:text-left', textConfig.value?.class, fullWidth ? 'p-4 sm:p-6 md:p-8 lg:p-10' : 'px-0']">
      <!-- Heading -->
      <Heading v-if="heading" size="md" :className="headingConfig?.value?.class || 'text-center sm:text-left'">
        {{ heading }}
      </Heading>
      <SubHeading v-if="sub_heading" :className="subHeadingConfig?.value?.class || 'text-center sm:text-left text-lg font-medium'">
        {{ sub_heading }}
      </SubHeading>
      <p>
        {{ text }}
      </p>
      <!-- CTA Buttons -->
      <div class="flex space-x-2 mt-8 items-center justify-center lg:justify-left xl:justify-left">
        <UButton
          v-for="button in CTAs"
          :target="button.target"
          :key="button.id"
          :to="button.URL"
          :variant="button.variant || 'solid'"
          :size="button.size || 'lg'"
          :color="button.color || 'primary'"
          :icon="button.icon"
          :trailing="button.trailing"
          :ui="button.nuxt_ui_config?.json_data || {}"
        >
          {{ button.text }}
        </UButton>
      </div>
    </div>

    <!-- Media Section -->
    <div v-if="media && media.length > 0"
      :class="[singleColumn ? 'w-full' : 'w-full sm:w-2/4']"
    > 
      <div v-if="media[0].mime.includes('video')" class="w-full h-full">
        <video v-for="(item, index) in media" :key="index"
          type='video/mp4'
          preload="auto"
          controls
          class="w-full h-full"
          :src="useStrapiImage(item.url)"
          :alt="item.alt || 'Media Video'"
          :data-setup="videoOptions"
        >
        </video>
      </div>
      <UCarousel v-else v-slot="{ item }" :items="media"
        :ui="carouselConfig.value?.ui"
      >
        <NuxtPicture
          :src="useStrapiImage(item.url)"
          :alt="item.alt || 'Media Image'"
          class="overflow-hidden w-full h-full"
          :img-attrs="img_attrs || { class: 'object-cover w-full h-full' }"
        />
      </UCarousel>
    </div>

    <!-- Form Section -->
    <div v-if="form?.inputs"
      :class="[singleColumn ? 'w-full' : 'w-full sm:w-2/4', 'flex justify-center flex-wrap gap-4', formConfig.value?.class]"
    >
      <div v-if="formWithMedia" class="pb-4">
        <Heading v-if="heading" size="md" :className="headingConfig?.value?.class">
          {{ heading }}
        </Heading>
        <SubHeading v-if="sub_heading" :className="subHeadingConfig?.value?.class">
          {{ sub_heading }}
        </SubHeading>
      </div>
      <UForm :state="state" class="w-full space-y-4">
        <UFormGroup v-for="(input, index) in form?.inputs" :label="input.type !== 'submit' ? input.name : ''" :key="index" :name="input.name">
          <div class="mt-2">
            <UInput
              v-if="['text', 'email', 'password', 'color', 'date', 'datetime-local', 'file', 'image', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week'].includes(input.type)"
              :type="input.type"
              :name="input.name"
              :placeholder="input.placeholder"
              :value="input.value"
              v-model="state[input.name]"
            />
            <UTextarea 
              v-if="input.type === 'textarea'"
              :name="input.name"
              :placeholder="input.placeholder"
              v-model="state[input.name]"
            ></UTextarea>
            <URadioGroup
              v-if="input.type === 'radio'"
              :name="input.name"
              v-model="state[input.name]"
            >
              <URadio
                v-for="option in input.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </URadio>
            </URadioGroup>
            <UCheckbox
              v-if="input.type === 'checkbox'"
              :name="input.name"
              :label="input.name"
              v-model="state[input.name]"
            >
            </UCheckbox>
            <UButton
              v-if="input.type === 'submit' || input.type === 'button'"
              :type="input.type === 'submit' ? 'submit' : 'button'"
            >
              {{ input.name }}
            </UButton>
          </div>
        </UFormGroup>
      </UForm>
    </div>
  </UContainer>
</template>