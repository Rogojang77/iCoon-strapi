<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['simple', 'outline', 'primary', 'muted'].includes(value),
    },
    as: {
        type: String,
        default: 'button',
    },
    className: {
        type: String,
        default: '',
    },
    href: {
        type: String,
        default: null,
    },
    onClick: {
        type: Function,
        default: null,
    },
});

const variantClass = computed(() => {
    switch (props.variant) {
        case 'simple':
        return 'bg-secondary bg-transparent hover:border-secondary/50 hover:bg-secondary/10 border border-transparent text-white text-sm md:text-sm';
        case 'outline':
        return 'bg-white hover:bg-secondary/90 text-black border border-black hover:text-black text-sm md:text-sm';
        case 'primary':
        return 'bg-secondary hover:bg-secondary/90 border border-secondary text-black text-sm md:text-sm shadow-[0px_-1px_0px_0px_#FFFFFF60_inset,_0px_1px_0px_0px_#FFFFFF60_inset] hover:-translate-y-1 active:-translate-y-0';
        case 'muted':
        return 'bg-neutral-800 hover:bg-neutral-900 border border-transparent text-white text-sm md:text-sm shadow-[0px_1px_0px_0px_#FFFFFF20_inset]';
        default:
        return '';
    }
});

const defaultText = 'Get Started';

const otherProps = computed(() => {
    const { variant, as, className, href, onClick, ...restProps } = props;
    return restProps;
});
</script>

<template>
    <component
        :is="as"
        :href="href"
        @click="onClick"
        :class="[
            'relative z-10 transition font-medium duration-200 rounded-md px-4 py-2 flex items-center justify-center',
            variantClass,
            className
        ]"
        v-bind="otherProps"
        >
        <slot>{{ defaultText }}</slot>
    </component>
</template>