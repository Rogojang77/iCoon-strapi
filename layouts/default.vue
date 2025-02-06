<script setup lang="ts">

const { findOne } = useStrapi();

const { data: globalData } = await useStrapiAsyncData(
    'global',
    () => findOne('global')
);
</script>

<template>
    <main class="bg-white dark:bg-slate-950">
        <Header v-bind="globalData?.navbar"></Header>
        <slot></slot>
        <Footer v-bind="globalData?.footer"></Footer>
    </main>
</template>