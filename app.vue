
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
    @font-face {
        font-family: "Montserrat-Black";
        src: url("~/assets/fonts/Montserrat-Black.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-BlackItalic";
        src: url("~/assets/fonts/Montserrat-BlackItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-Bold";
        src: url("~/assets/fonts/Montserrat-Bold.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-BoldItalic";
        src: url("~/assets/fonts/Montserrat-BoldItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-ExtraBold";
        src: url("~/assets/fonts/Montserrat-ExtraBold.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-ExtraBoldItalic";
        src: url("~/assets/fonts/Montserrat-ExtraBoldItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-ExtraLight";
        src: url("~/assets/fonts/Montserrat-ExtraLight.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-ExtraLightItalic";
        src: url("~/assets/fonts/Montserrat-ExtraLightItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-Italic";
        src: url("~/assets/fonts/Montserrat-Italic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-Light";
        src: url("~/assets/fonts/Montserrat-Light.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-LightItalic";
        src: url("~/assets/fonts/Montserrat-LightItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-Medium";
        src: url("~/assets/fonts/Montserrat-Medium.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-MediumItalic";
        src: url("~/assets/fonts/Montserrat-MediumItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-Regular";
        src: url("~/assets/fonts/Montserrat-Regular.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-SemiBold";
        src: url("~/assets/fonts/Montserrat-SemiBold.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-SemiBoldItalic";
        src: url("~/assets/fonts/Montserrat-SemiBoldItalic.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-Thin";
        src: url("~/assets/fonts/Montserrat-Thin.ttf") format("truetype");
    }
    @font-face {
        font-family: "Montserrat-ThinItalic";
        src: url("~/assets/fonts/Montserrat-ThinItalic.ttf") format("truetype");
    }
</style>