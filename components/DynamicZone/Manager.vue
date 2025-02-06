
<script setup>

const props = defineProps({
    dynamicZone: {
        type: Array,
        required: true,
        default: () => []
    }
});

// const components = {
//     'hero': 'Hero',
//     'testimonials': 'Testimonials',
//     'how-it-works': 'HowItWorks',
//     'brands': 'Brands',
//     'pricing': 'Pricing',
//     'launches': 'Launches',
//     'cta': 'CTA',
//     'faq': 'FAQ',
//     'waterfall': 'Waterfall',
//     'form-next-to-section': 'FormNextToSection',
//     'related-articles': 'RelatedArticles',
// }

// const componentMapping = Object.entries(components).reduce((acc, [key, componentName]) => {
//     acc[`dynamic-zone.${key}`] = defineAsyncComponent(() => import(/* @vite-ignore */`~/${componentName}.vue`));
//     return acc;
// }, {});
const instance = getCurrentInstance();


const kebabToPascalCase = (str) => {
  return str
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const isComponentDefined = (componentData) => {
    
    const componentName = getComponentName(componentData);

    const isDefined = typeof instance.appContext?.components === 'object' && componentName in instance.appContext.components;

    if(!isDefined){
        console.warn('Dynamic Zone component not defined in application: ', componentName);
    }

    return isDefined;
}

const getComponentName = (componentData) => {
    return kebabToPascalCase(componentData?.__component?.replace('.','-'));
}
</script>

<template>
    <div>
        <template v-for="componentData in dynamicZone">
            <component
                v-if="isComponentDefined(componentData)"
                :is="getComponentName(componentData)"
                :key="componentData.id"
                v-bind="componentData"
            />
        </template>
    </div>
</template>