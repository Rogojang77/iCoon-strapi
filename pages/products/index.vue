<script setup>
const { findOne, find } = useStrapi();
const { locale } = useI18n();
const searchQuery = ref('');

const { data: pageData } = await useStrapiAsyncData(
  `product-page-${locale.value}`,
  () => findOne('product-page', { locale: locale.value})
);

const { data: products, refresh } = await useStrapiAsyncDataFullResponse(
  `products-${locale.value}-s${searchQuery.value}`,
  () => find('products', { 
    where:  searchQuery.value 
      ? {name: {"$containsi":searchQuery.value}} 
      : {}, 
    locale: locale.value
  })
);

const { data: categories } = await useStrapiAsyncData(
  `categories-${locale.value}`,
  () => find('categories', { locale: locale.value })
);

const relatedCategories = computed(() => {
  if (!products.value?.data?.length < 0) return [];
  const productCategoryIds = new Set(
    products.value.data.flatMap(product => product.categories.map(category => category.id))
  );
  return categories.value.filter(category => productCategoryIds.has(category.id));
});

const debouncedRefresh = debounce(refresh, 600);
watch(searchQuery, async () => {
  debouncedRefresh();
});

const metadata = generateMetadataObject(pageData?.value?.seo);
useHead(metadata);

const totalPages = computed(() =>
  products.value?.meta
    ? Math.ceil(products.value.meta.pagination.total / products.value.meta.pagination.pageSize)
    : 1
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * products.value.meta.pagination.pageSize;
  const end = start + products.value.meta.pagination.pageSize;
  return products?.value?.data?.slice(start, end);
});
</script>

<template>
  <UContainer
    :ui="{
      padding: 'py-10 pt-32 px-4 sm:px-6 md:px-8 lg:px-10',
    }"
  >
    <div class="text-center mx-auto">
      <Heading v-if="pageData.heading">
        {{ pageData.heading }}
      </Heading>
      <SubHeading v-if="pageData.sub_heading">
        {{ pageData.sub_heading }}
      </SubHeading>
    </div>
    <div class="mx-auto py-20 flex flex-col pb-20">

      <!-- Content -->
      <div class="flex flex-col md:flex-row gap-8 mt-12 w-full">
        <!-- Products Cards -->
        <div class="flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard
              v-for="product in products?.data"
              :key="product.id"
              class="shadow-lg hover:shadow-xl transition duration-200 bg-neutral-900 border border-neutral-800"
            >
              <NuxtLink :to="'/products/' + product.slug">
                <div class="relative">
                  <NuxtPicture
                    v-if="product.images?.[0]?.url"
                    :src="useStrapiImage(product.images?.[0]?.url)"
                    alt="Product Cover"
                    :imgAttrs="{class: 'h-40 md:h-96 w-full aspect-square object-cover rounded-3xl'}"
                  />
                </div>
                <div class="px-4 py-4">
                  <h2 class="text-lg font-bold text-white">{{ product?.name }}</h2>
                  <p class="font-normal uppercase">
                    {{ product?.price+"$" }}
                  </p>
                  <p class="text-sm text-neutral-400 mt-2">
                    {{ product?.description }}
                  </p>
                </div>
              </NuxtLink>
            </UCard>
          </div>
          <!-- Pagination -->
          <div class="flex justify-center mt-10 space-x-2">
            <UPagination v-model="currentPage" :page-count="5" :total="totalPages" />
          </div>
        </div>

         <!-- Sidebar -->
         <aside class="w-full md:w-64 flex-shrink-0">
          <div class="space-y-6">
            <!-- Search -->
            <div>
              <h3 class="text-lg font-bold mb-2">Search</h3>
                <UInput
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products"
                />
            </div>

            <!-- Categories -->
            <div v-if="relatedCategories">
              <h3 class="text-lg font-bold mb-2">Categories</h3>
              <ul class="list-disc pl-8 space-y-2">
                <li
                  v-for="category in relatedCategories"
                  :key="category.id"
                  class="text-sm hover:text-slate-400"
                >
                  <NuxtLink :to="'/category/' + category.name" class="">{{ category.name }}</NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Tags -->
            <!-- <div v-if="pageData.tags">
              <h3 class="text-lg font-bold mb-2">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in pageData.tags"
                  :key="tag.id"
                  class="text-xs bg-neutral-800  px-2 py-1 rounded hover:bg-neutral-700 hover:text-white"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div> -->
          </div>
        </aside>

      </div> 
    </div>
  </UContainer>
</template>
