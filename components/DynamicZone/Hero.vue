<script setup>
const { heading, sub_heading, CTAs, background_image, section_classes, nuxt_ui_configs } = defineProps({
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
        default: () => ({}),
    },
    section_classes: {
        type: String,
        default: "",
    },
    nuxt_ui_configs: {
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
            strategy: 'override',
            base: [section_classes || ''],
            constrained: 'max-w-full',
            padding: 'py-[15vh]'
        }"
        :style="{ background: `url(${useStrapiImage(background_image?.url)}) no-repeat center center/cover` }"
    >
        <!-- Heading Section -->
        <div class="mb-8 mx-auto px-8">
            <Heading v-if="heading" as="h1" size="2xl" :className="headingConfigString">
                {{ heading }}
            </Heading>
            <SubHeading v-if="sub_heading" :className="subHeadingConfigString">
                {{ sub_heading }}
            </SubHeading>
        </div>
        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center absolute right-[-50px] sm:right-0 z-1]">
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
                class="w-full sm:w-auto"
            >
                {{ button.text }}
            </UButton>
        </div>
    </UContainer>
</template>
