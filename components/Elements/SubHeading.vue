<script setup>
import { computed } from 'vue';

const props = defineProps({
    as: {
        type: String,
        default: 'h3'
    },
    className: {
        type: String,
        default: 'text-slate-950 dark:text-white mx-auto text-md md:text-base max-w-4xl my-4 text-center font-normal'
    },
    otherProps: {
        type: String,
        default: ''
    }
});

const otherProps = computed(() => {
    const { as, children, className, ...restProps } = props;
    return restProps;
});

</script>

<template>
    <component
        :is="as"
        :class="[
            className
        ]"
        v-bind="otherProps"
        >
        <slot/>
    </component>
</template>
