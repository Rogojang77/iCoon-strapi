<script setup>

const props = defineProps({
    otherProps: {
        type: String,
        default: '',
    }
});
</script>

<template>
    <div class="relative inline-block px-2 py-1">
        <slot/>
    </div>
</template>