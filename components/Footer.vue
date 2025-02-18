<script setup>
  // Define props with default values using defineProps in script setup
  const { logo, description, copyright, internal_links, policy_links, social_media_links } = defineProps({
    built_with: {
      type: String,
      default: '',
    },
    copyright: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    designed_developed_by: {
      type: String,
      default: '',
    },
    internal_links: {
      type: Array,
      default: () => [],
    },
    logo: {
      type: Object,
      default: () => {},
    },
    policy_links: {
      type: Array,
      default: () => [],
    },
    social_media_links: {
      type: Array,
      default: () => [],
    }
  });

  const localePath = useLocalePath();
</script>

<template>
  <UContainer class="relative overflow-hidden w-full bg-white dark:bg-slate-950 text-slate-950 dark:text-white"
    :ui="{
      strategy: 'override',
      base: 'container sm:container mx-auto gap-32 sm:gap-18',
      padding: 'px-24 py-0 sm:px-10 lg:px-24',
      constrained: 'max-w-full w-full',
    }"
    >
    <div class="border-t pt-20 pb-32 relative">
      <div class="mx-auto text-sm text-black flex sm:flex-row flex-col justify-between items-start">
        <div>
          <div class="mr-4 md:flex mb-4">
            <!-- Check if logo image exists before rendering -->
            <NuxtLink v-if="logo?.image" :to="localePath('/')">
                <NuxtPicture :src="useStrapiImage(logo.image.url)" :imgAttrs="{class: 'h-auto max-w-10'}" />
            </NuxtLink>
          </div>
          <div class="max-w-xs text-slate-950 dark:text-white">{{ description }}</div>
          <div class="mt-4 text-slate-950 dark:text-white">{{ copyright }}</div>
        </div>
        <div class="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
          <!-- Internal Links Section -->
          <div v-if="internal_links" class="flex justify-center space-y-4 flex-col mt-4">
            <NuxtLink
              v-for="link in internal_links"
              :key="link.text"
              :to="localePath(link.URL)"
              class="transition-colors text-slate-950 dark:text-white hover:text-neutral-40 text-xs sm:text-sm"
            >
              {{ link.text }}
            </NuxtLink>
          </div>

          <!-- Policy Links Section -->
          <div v-if="policy_links" class="flex justify-center space-y-4 flex-col mt-4">
            <NuxtLink
              v-for="link in policy_links"
              :key="link.text"
              :to="localePath(link.URL)"
              class="transition-colors text-slate-950 dark:text-white hover:text-neutral-400 text-xs sm:text-sm"
            >
              {{ link.text }}
            </NuxtLink>
          </div>

          <!-- Social Media Links Section -->
          <div v-if="social_media_links" class="flex justify-center space-y-4 flex-col mt-4">
            <NuxtLink
              v-for="link in social_media_links"
              :key="link.text"
              :to="localePath(link.URL)"
              class="transition-colors text-slate-950 dark:text-white hover:text-neutral-400 text-xs sm:text-sm"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>