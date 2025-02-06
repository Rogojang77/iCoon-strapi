
<script setup>

const { heading, sub_heading, form, section, social_media_icon_links, section_classes, nuxt_ui_configs } = defineProps({
  heading: { 
    type: String, 
    default: 'Default Heading' 
  },
  sub_heading: { 
    type: String, 
    default: 'Default SubHeading' 
  },
  form: { 
    type: Object, 
    default: () => ({ inputs: [] }) 
  },
  section: { 
    type: Object, 
    default: () => ({ heading: '', sub_heading: '', users: [] }) 
  },
  social_media_icon_links: { 
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

const state = reactive({
  email: undefined,
  name: undefined,
  message: undefined,
  company: undefined,
});

// Dynamic UI configurations
const headingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "Heading"));
const subHeadingConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, "SubHeading"));
const formConfig = computed(() => getConfigByComponentName(nuxt_ui_configs, 'Form'));

</script>

<template>
  <UContainer class="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
    <div class="flex relative z-20 items-center w-full justify-center px-4 py-4 lg:py-40 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-md">
        <!-- Heading Section -->
        <div class="text-center mb-8 mx-auto">
          <Heading v-if="heading" :class="headingConfig?.value?.class">
            {{ heading }}
          </Heading>
          <SubHeading v-if="sub_heading" :class="subHeadingConfig?.value?.class">
            {{ sub_heading }}
          </SubHeading>
        </div>

        <div v-if="form?.inputs"
          :class="['w-full flex justify-center flex-wrap gap-4', formConfig.value?.class]"
        >
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

        <div class="flex items-center justify-center space-x-4 py-4">
          <div v-for="social in social_media_icon_links" :key="social.title">
            <NuxtPicture
            v-if="social.image?.url"
            :src="useStrapiImage(social.image.url)"
            :alt="social.image.alternativeText"
            class="h-5 w-5 text-muted hover:text-neutral-100"
            />
            <nuxt-link v-if="social.link.url" :to="social.link.url" target="_blank">{{ social.link.text }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-full z-20 hidden md:flex border-l border-charcoal overflow-hidden bg-neutral-900 items-center justify-center">
      <div class="max-w-sm mx-auto">
        <p class="font-semibold text-xl text-center text-muted text-balance">
          {{ section.heading }}
        </p>
        <p class="font-normal text-base text-center text-neutral-500 mt-8 mb-10 text-balance">
          {{ section.sub_heading }}
        </p>
        <div class="flex flex-row items-center justify-center mb-10 w-full">
          <div class="relative group">
            <div class="flex space-x-2">
              <div
                v-for="(user, index) in section.users"
                :key="index"
                class="w-10 h-10 bg-gray-800 rounded-full overflow-hidden flex items-center justify-center"
              >
                <NuxtPicture
                  v-if="user.image?.url"
                  :src="useStrapiImage(user.image.url)"
                  :alt="`${user.firstname} ${user.lastname}`"
                  class="h-5 w-5 text-muted hover:text-neutral-100"
                />
              </div>
            </div>

            <div
              class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-700 text-white text-xs rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ul>
                <li v-for="(user, index) in section.users" :key="index" class="mb-2 flex items-center space-x-2">
                  <NuxtPicture
                    v-if="user.image?.url"
                    :src="useStrapiImage(user.image.url)"
                    :alt="`${user.firstname} ${user.lastname}`"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                  <div>
                    <p class="font-semibold">{{ user.firstname }} {{ user.lastname }}</p>
                    <p class="text-gray-400 text-xs">{{ user.job }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
