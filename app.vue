
<!-- <script setup>
    const nuxt = useNuxtApp();
    nuxt._cookies.strapi_jwt.value='3c317095be040180c27b907149c50e42c469b69a001f67f8e16c3b1c0e25b51499f9efbe5cc97180ea6a571b8feb830449c251bc9f628a1a44a95dda43e33f6ac3c4acf71daaa5cd09a9455b6cc378ee15e2cf9f13583ca94605b460b470b0d5d6cbf46ed932e974c9b6772c99c5ef8ca8b6c2866c7dbbea48b083554527095f';
</script> -->

<template :class="{ dark: isDarkMode }">
    <NuxtLoadingIndicator />
    <NuxtLayout>
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>

<style>
    @import "~/assets/css/main.css";
</style>