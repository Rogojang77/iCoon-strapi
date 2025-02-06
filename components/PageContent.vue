<script setup>
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: Object,
        required: false,
        default: () => ({ dynamic_zone: null})
}
});

const dynamicZone = computed(() => props.content?.dynamic_zone);
</script>

<template>
    <div class="relative overflow-hidden w-full text-slate-950 dark:text-white pt-16">
        <DynamicZoneManager
            v-if="dynamicZone"
            :dynamicZone="dynamicZone"
        />
    </div>
</template>