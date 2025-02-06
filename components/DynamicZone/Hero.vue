<script setup>

const { heading, sub_heading, CTAs, background_image, section_classes, nuxt_ui_configs} = defineProps({
    heading: {
        type: String,
        required: true
    },
    sub_heading: {
        type: String,
        required: true
    },
    CTAs: {
        type: Array,
        default: () => []
    },
    background_image: {
        type: Object,
        default: () => ({})
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

</script>

<template>
    <UContainer
        :class='[section_classes, "h-screen overflow-hidden relative flex flex-col items-center justify-center"]'
        :ui="{ constrained: 'max-w-full',
            padding: 'px-0 sm:px-0 lg:px-0'
        }"
        :style="{ background: `url(${useStrapiImage(background_image?.url)}) no-repeat center center/cover` }"
    >
        <div class="z-2 text-center">
            <!-- Heading Section -->
            <div class="text-center mb-8 mx-auto">
                <Heading v-if="heading" :class="headingConfig?.value?.class">
                    {{ heading }}
                </Heading>
                <SubHeading v-if="sub_heading" :class="subHeadingConfig?.value?.class">
                    {{ sub_heading }}
                </SubHeading>
            </div>

            <!-- CTA Buttons -->
            <div class="flex space-x-2 justify-center items-center">
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
        </div>
    </UContainer>
</template>