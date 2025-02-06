<script setup>
import { computed } from 'vue';

const props = defineProps({
    as: {
        type: String,
        default: 'h2',
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'xl', '2xl'].includes(value),
    },
    className: {
        type: String,
        default: 'text-slate-950 dark:text-white mx-auto max-w-5xl text-center tracking-tight font-medium bg-clip-text',
    },
});


const sizeVariants = {
    sm: 'text-xl md:text-2xl md:leading-snug',
    md: 'text-3xl md:text-4xl md:leading-tight',
    xl: 'text-4xl md:text-6xl md:leading-none',
    '2xl': 'text-5xl md:text-7xl md:leading-none',
};

const otherProps = computed(() => {
    const { as, children, size, className, ...restProps } = props;
    return restProps;
});
</script>

<template>
    <component
        :is="as"
        v-bind="otherProps"
        :class="[
            sizeVariants[size],
            className
        ]"
        >
        <slot/>
    </component>
</template>