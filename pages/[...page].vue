<script setup>

const route = useRoute()
const { findOne } = useStrapi();
const { locale } = useI18n();

const { page } = route.params;
const slug = page ? page.join("~") : 'home';

const { data: content } = await useStrapiAsyncDataFirst(
    `page-${locale.value}-${slug}`,
    () => findOne('pages', {  where: { slug }, locale: locale.value})
);

useHead(generateMetadataObject(content.value?.seo));
</script>

<template>
    <div class="">
        <PageContent :content="content" />
    </div>
</template>