<script setup>

const { heading, sub_heading, section_classes, nuxt_ui_configs, email } = defineProps({
  heading: {
    type: String,
    default: ''
  },
  sub_heading: {
    type: String,
    default: ''
  },
  section_classes: {
    type: String,
    default: '',
  },
  nuxt_ui_configs : {
    type: Array,
    default: () => [],
  },
  email: { 
    type: Object, 
    default: () => ({})
  },
})

const state = reactive({
  email: undefined
});

// Dynamic UI configurations
const headingConfigString = {}
const subHeadingConfigString = {}

</script>

<template>
  <UContainer
    :ui="{
      strategy: 'override',
      base: [section_classes ? section_classes : 'container sm:container mx-auto flex flex-col justify-center items-center'],
      padding: 'px-8 py-20 sm:py-12 md:py-16 lg:py-20',
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
    <div class="flex relative items-center w-full justify-center">
      <div class="mx-auto w-full">
        <UForm 
          :state="state"
          class='flex justify-center w-full'>
          <UFormField label="Email" name="email" class="w-full md:w-[60%] lg:w-[40%] xl:w-[30%]">
            <UInput
              :type="email.type"
              :name="email.name"
              :placeholder="email.placeholder"
              :value="email.value"
              :ui="{
                base: 'w-full z-0',
                rounded: 'rounded-full',
              }"
            >
              <template #trailing>
                <UButton
                  type="submit"
                  class="flex bg-black text[12px] rounded-full font-light tracking-wider px-4 md:px-10"
                >
                  SUBSCRIBE
                </UButton>
              </template>
            </UInput>
          </UFormField>
        </UForm>
      </div>
    </div>
  </UContainer>
</template>