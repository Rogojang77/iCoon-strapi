import type { Strapi5Error } from '@nuxtjs/strapi'

export default defineNuxtPlugin((nuxt) => {
    nuxt.hook('strapi:error' as any, (e: Strapi5Error) => {
        const toast = useToast()

        toast.add({
            id: 'error',
            title: e.error?.name,
            color: 'red',
            description: e.error?.message,
            icon: 'i-heroicons-exclamation-circle',
            timeout: 0
        })

        return e;
    })
})