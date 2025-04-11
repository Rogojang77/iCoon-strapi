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
        <!-- <div 
            class="
                p-8 lg:p-16 xl:p-32
                py-3 py-16 py-24 py-48 py-[15vh] py-[20vh]
                px-0 px-6 px-8 px-16 px-24 sm:px-8 lg:px-0 lg:px-10 xl:px-0 lg:px-[10vw]
                pl-0 pl-6 pl-8 pl-16 pl-24 lg:pl-24 lg:pl-[15vw] lg:pl-[50vw]
                pr-0 pr-24 pr-[50%] lg:pr-[15vw] lg:pr-[50%]
                pt-16 pt-96 pt-[20vh]
                pb-0 pb-96 pb-[5vh] pb-[20vh] lg:pb-[20vh]
                mb-4 mb-8 sm:mb-6
                gap-8 gap-12 gap-20 gap-32 sm:gap-[80px] sm:gap-18
                mx-0 mx-auto sm:mx-auto lg:mx-auto
                
                w-full w-[50vw] w-[70vw] w-[100vw] lg:w-[50vw] lg:w-[55vw] lg:w-[65vw] lg:w-[70vw] lg:w-[75vw] lg:w-[100vw] lg:w-[100vh]
                h-auto h-full h-96 h-[80vh] h-[85vh] h-[80vw] h-[100vw] lg:h-full lg:h-[50vw] lg:h-[65vw] lg:h-[70vw] lg:h-[80vh] lg:h-[100vh]
                max-w-full lg:max-w-[920px] lg:max-w-[65vw] lg:max-w-[70vw] lg:max-w-[100vw] 
                max-h-[700px] max-h-[800px] lg:max-h-[920px] max-h-[1000px] max-h-[80vh] lg:max-h-[80vh]
                min-h-[900px] 
                lg:min-w-[600px] xl:min-w-[1120px]

                relative absolute lg:absolute
                left-0 left-[0rem] lg:left-[30rem]
                right-0 right-[-50px] sm:right-0

                container container-md sm:container
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-2
                grid-rows-1 sm:grid-rows-1 lg:grid-rows-2 xl:grid-rows-2
                flex flex-col sm:flex-col-reverse flex-row lg:flex-row lg:flex-row-reverse md:flex-row
                justify-center justify-between
                items-center
                flex-wrapf
                basis-1/2 basis-2/3

                bg-transparent lg:bg-white
                shadow-none
                lg:shadow-[30px_0px_25px_-20px_rgba(0,0,0,0.3)]
                lg:shadow-[50px_0px_100px_-120px_rgba(0,0,0,1)]
                lg:shadow-[-50px_0px_100px_-120px_rgba(0,0,0,1)]
                lg:shadow-[-30px_0px_25px_-20px_rgba(0,0,0,0.3)]
                shadow-[0_-30px_30px_-40px_rgba(0,0,0,0.3),0_30px_30px_-40px_rgba(0,0,0,0.3)]
                rounded-full lg:rounded-full lg:rounded-l-full lg:rounded-r-full rounded
                rounded-null

                translate-none
                lg:translate-x-[10vw] lg:translate-x-[-10vw]

                text-justify md:text-left

                object-cover object-center
                float-right

                overflow-hidden
                z-0 z-1
            ">
        </div> -->
    </main>
</template>