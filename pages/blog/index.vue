<script setup>
import { format } from 'date-fns';

const { findOne, find } = useStrapi();
const { locale } = useI18n();
const searchQuery = ref('');
const currentPage = ref(1);

const { data: pageData } = await useStrapiAsyncData(
  `blog-${locale.value}`,
  () => findOne('blog-page', { locale: locale.value })
);

const { data: articles, refresh } = await useStrapiAsyncDataFullResponse(
  `articles-${locale.value}-s${searchQuery.value}`,
  () =>
    find('articles', {
      where: searchQuery.value
        ? { title: { $containsi: searchQuery.value } }
        : {},
      locale: locale.value,
    })
);

const { data: categories } = await useStrapiAsyncData(
  `categories-${locale.value}`,
  () => find('categories', { locale: locale.value })
);

const relatedCategories = computed(() => {
  if (!articles.value?.data?.length < 0) return [];
  const articleCategoryIds = new Set(
    articles.value.data.flatMap(article => article.categories.map(category => category.id))
  );
  return categories.value.filter(category => articleCategoryIds.has(category.id));
});

const debouncedRefresh = debounce(refresh, 600);
watch(searchQuery, async () => {
  debouncedRefresh();
});

const metadata = generateMetadataObject(pageData.value?.seo);
useHead(metadata);

const totalPages = computed(() =>
  articles.value?.meta
    ? Math.ceil(articles.value.meta.pagination.total / articles.value.meta.pagination.pageSize)
    : 1
);

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * articles.value.meta.pagination.pageSize;
  const end = start + articles.value.meta.pagination.pageSize;
  return articles?.value?.data?.slice(start, end);
});
</script>

<template class="">
  <UContainer
    :ui="{
      padding: 'py-10 pt-32 px-4 sm:px-6 md:px-8 lg:px-10',
    }"
  >
    <!-- Header -->
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
        <!-- Blog Cards -->
        <div class="flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UCard
              v-for="article in paginatedArticles"
              :key="article.id"
              class="shadow-lg hover:shadow-xl transition duration-200 bg-neutral-900 border border-neutral-800"
            >
              <NuxtLink :to="'/blog/' + article.slug">
                <div class="relative">
                  <NuxtPicture
                    v-if="article.image"
                    :src="useStrapiImage(article.image?.url)"
                    alt="article Cover"
                    class="w-full h-48 object-cover"
                  />
                </div>
                <div class="p-4">
                  <div class="flex gap-2 mb-2">
                    <span
                      v-for="category in article.categories"
                      :key="category.id"
                      class="text-xs font-bold bg-neutral-800  px-2 py-1 rounded-full capitalize"
                    >
                      {{ category.name }}
                    </span>
                  </div>
                  <h2 class="text-lg font-bold text-white">{{ article.title }}</h2>
                  <p class="text-sm text-neutral-400 mt-2">
                    {{ article.description.slice(0, 100) }}...
                  </p>
                  <p class="text-xs text-neutral-500 mt-4">
                    {{ format(new Date(article.publishedAt), 'MMMM dd, yyyy') }}
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
                  placeholder="Search articles"
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
                  <NuxtLink :to="'/blog/category/' + category.slug" class="">{{ category.name }}</NuxtLink>
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