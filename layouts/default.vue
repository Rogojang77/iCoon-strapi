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
        <!-- <div class="py-16 px-8 lg:p-16 xl:p-32 rounded-null lg:rounded-l-full z-1 bg-transparent lg:bg-white shadow-none lg:shadow relative lg:absolute  right-0 w-full lg:w-[50vw] min-h-auto lg:min-h-[900px] flex flex-col justify-center container sm:container mx-auto gap-32 sm:gap-18 h-96 overflow-hidden relative flex flex-row items-center pr-0 lg:pr-[50%] pl-24 max-w-full overflow-hidden flex items-center h-[85vh] max-h-1000px] relative lg:absolute w-[70vw] lg:w-[55vw] right-0 z-1 rounded-full max-h-1000px] w-full lg:w-[55vw] px-8 lg:px-0 left-0 z-1 rounded-full container sm:container mx-auto gap-32 sm:gap-18 h-96 overflow-hidden relative flex flex-row items-center pr-[50%] pl-24 py-[15vh] max-w-full mb-8 h-4/6 py-3 overflow-hidden py-16 px-8 lg:p-16 xl:p-32 rounded-null lg:rounded-l-full z-1 bg-transparent lg:bg-white shadow-none lg:shadow relative lg:absolute  right-0 w-[50vw] min-h-auto lg:min-h-[900px] flex flex-col justify-center basis-1/2 flex items-center h-[80vh] max-h-[800px] relative lg:absolute w-full lg:w-[55vw] right-0 z-0 basis-1/2 px-16 lg:p-32 xl:p-64  rounded-null lg:rounded-r-full z-1 bg-transparent lg:bg-white shadow-none lg:shadow basis-2/3 w-full flex items-center flex-col lg:flex-row px-0 py-24 container sm:container mx-0 sm:mx-auto relative flex flex-col md:flex-row justify-between pt-16 pb-0 px-8 mb-4 p-8 sm:container mx-0 sm:mx-auto gap-8 sm:gap-18 flex items-center justify-between text-justify md:text-left flex-col lg:flex-row container px-6 sm:px-8 lg:px-10 mx-auto px-8 flex flex-wrap justify-center absolute right-[-50px] sm:right-0 z-1] container sm:container mx-auto gap-32 sm:gap-18 overflow-hidden relative flex flex-row float-right items-center pr-24 pl-0 lg:pl-[50vw] py-[15vh] max-w-full min-h-auto lg:min-h-[900px] flex flex-col lg:flex-row justify-center items-center py-16 px-8 lg:p-16 xl:p-32 lg:rounded-r-full bg-transparent lg:bg-white shadow-none lg:shadow relative lg:absolute right-0 w-full lg:w-[55vw] max-h-[800px] container sm:container mx-auto gap-8 sm:gap-18 text-justify md:text-left">
        </div> -->
    </main>
</template>