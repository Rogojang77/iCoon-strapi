// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    colorMode: {
        preference: 'light'
    },
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/strapi-edge',
        '@unocss/nuxt',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxtjs/i18n'
    ],
    components: [
        { path: '~/components/Elements' },
        { path: '~/components/DynamicZone', global: true,  prefix: 'DynamicZone' },
        '~/components'
    ],
    i18n: {
        locales: [
            { code: 'en', iso: 'en-US' },
            { code: 'de', iso: 'de-CH' },
        ],
        defaultLocale: 'en',
    },
    strapi: {
        // Options
        url: process.env.STRAPI_URL || 'https://icoonapi.inft.ro',
        prefix: '/api',
        admin: '/admin',
        version: 'v5',
        cookie: {},
        cookieName: 'strapi_jwt',
        devtools: true
    },
    image: {
        format: ['webp'],
        domains: ['icoonapi.inft.ro'],
        strapi: {
            baseURL: 'https://icoonapi.inft.ro/'
        }
    },
    routeRules: {
        '/': { prerender: true },
    }
})