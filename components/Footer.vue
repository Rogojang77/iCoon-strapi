<script setup>
  const { built_with, logo, description, copyright, columns, designed_developed_by } = defineProps({
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
    logo: {
      type: Object,
      default: () => {},
    },
    columns: {
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
      base: 'gap-32 sm:gap-18 border-t',
      padding: 'px-24 py-16 sm:px-10 lg:px-24',
      constrained: 'max-w-full w-full',
    }"
    >
    <div class="container sm:container mx-auto text-sm text-black justify-between items-start">
      <div class="flex gap-[5%] justify-center items-start flex-wrap mt-10 md:mt-0 w-full sm">
        <div v-for="column in columns" :class="[column.links.length > 0 ? 'flex justify-center space-y-4 mb-14 flex-col md:w-[45%] w-[100%] lg:max-w-[20%] min-w-[170px]' : 'md:w-[45%] w-[100%] lg:max-w-[20%] min-w-[170px]']">
          <Heading v-if="column.heading"size="sm" className="mx-0 font-[Montserrat-Regular]">{{ column.heading }}</Heading>
          <NuxtLink
            v-for="link in column.links"
            :key="link.text"
            :to="localePath(link.URL)"
            class="transition-colors hover:text-neutral-40 text-xs sm:text-sm"
          >
            {{ link.text }}
          </NuxtLink>
          <NuxtPicture
            v-for="icon in column.social_media_icon_links"
            :src="useStrapiImage(icon.image.url)"
            :href="icon.link.URL"
            :alt="icon.image.alternativeText"
            :width="40"
            :height="40"
            class="inline-block mt-5 mr-4"
          />
        </div>
      </div>
    </div>
  </UContainer>
</template>