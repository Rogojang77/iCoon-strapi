<script setup>
  const { findOne } = useStrapi();
  const route = useRoute()
  const { product_slug } = route.params;
  const { locale } = useI18n();

  const { data: product } = await useStrapiAsyncDataFirst(
    `product-${locale.value}-${product_slug}`,
    () => findOne('products', {where: {slug: product_slug}, locale: locale.value})
  );

  useHead(generateMetadataObject(product.value?.seo));

  console.log(product);
</script>

<template>
  <UContainer
    :ui="{
      padding: 'py-10 pt-32 px-4 sm:px-6 md:px-8 lg:px-10',
    }"
  >    
   
    <div class="flex gap-6">
      <UCarousel v-slot="{ item }" :items="product?.images"
        :ui="{ item: 'basis-full' }"
        class="w-1/2"
      >
        <NuxtPicture
          :src="useStrapiImage(item.url)"
          :alt="item.alt || 'Media Image'"
          class="overflow-hidden w-full h-full items-center"
          :img-attrs="{ class: 'object-cover w-full h-full' }"
        />
      </UCarousel>
      <div class="xl:relative">
        <div class="mx-auto max-w-2xl">
          <Heading class="text-4xl mb-4 font-bold tracking-tight sm:text-5xl text-left">
            {{ product?.name }}
          </Heading>
          <UBadge :ui="{ 
            base: 'bg-neutral-800 text-neutral-100 mb-4',
            rounded: 'rounded-full' }">
            {{ product?.price+"$" }}
          </UBadge>
          <p class="text-sm text-neutral-400 mb-4">
            {{ product?.description }}
          </p>
          <UDivider />

          <div v-for="(perk, idx) in product.perks" :key="idx" class="flex items-start gap-2 my-4">
            <div :class="['h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5']">
              <UIcon name="i-lets-icons-done-duotone" class="w-5 h-5" />
            </div>
            <div :class="['font-medium text-slate-800 dark:text-slate-200 text-sm']">
              {{ perk.text }}
            </div>
          </div>
          <p class="text-bold mb-2">Available for</p>
          <UBadge v-for="plan in product?.plans" :key="plan.id"
            :ui="{ 
              base: 'bg-slate-200 dark:bg-slate-800 text-neutral-100 mb-4 mr-2',
              rounded: 'rounded-full' 
            }"
          >
            {{ plan.name }}
          </UBadge>
          <p class="text-bold mb-2">Categories</p>
          <UBadge v-for="category in product?.categories" :key="category.id" 
            :ui="{ 
              base: 'bg-slate-200 dark:bg-slate-800 text-neutral-100 mb-4 mr-2',
              rounded: 'rounded-full' 
            }"
          >
            {{ category.name }}
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Dynamic Zone Manager -->
    <div v-if="product?.dynamic_zone">
      <DynamicZoneManager :dynamicZone="product?.dynamic_zone" :locale="locale" />
    </div>
  </UContainer>
</template>