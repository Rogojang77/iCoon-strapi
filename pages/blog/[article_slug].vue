<script setup>

const route = useRoute();
const { article_slug } = route.params;
const { locale } = useI18n();

// Fetching article data from Strapi based on the slug and locale
const { data: article } = await useStrapiAsyncDataFirst(
  `article-${locale.value}-${article_slug}`,
  () => useStrapi().findOne('articles', { where: { slug: article_slug }, locale: locale.value })
);

const formattedDate = computed(() => {
  if (!article.value?.publishedAt) return '';
  // Formatează data într-un format specific, consistent pe server și client
  return new Date(article.value.publishedAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
});


// Computed property to format the content
const formattedContent = computed(() => {
  return article.value?.content?.map(item => {
    if (!item) return ``;

    if (item.type === "paragraph") {
      return `<p class="pt-4">${item.children.map(child => child.text).join("")}</p>`;
    } else if (item.type === "heading") {
      const level = item.level;
      const headingText = item.children.map(child => child.text).join("");
      return `<h${level} class="pt-4">${headingText}</h${level}>`;
    } else if (item.type === "list" && item.format === "unordered") {
      const listItems = item.children.map(
        listItem => `<li class="pt-1"><strong>${listItem.children.map(child => child.text).join("")}</strong></li>`
      ).join("");
      return `<ul class="pt-4">${listItems}</ul>`;
    } else if (item.type === "list" && item.format === "ordered") {
      const listItems = item.children.map(
        listItem => `<li class="pt-1"><strong>${listItem.children.map(child => child.text).join("")}</strong></li>`
      ).join("");
      return `<ol class="pt-4">${listItems}</ol>`;
    }
    return "";
  }).join("");
});

// Set metadata for the article's SEO
useHead(generateMetadataObject(article.value?.seo));
</script>

<template>
  <UContainer
    :ui="{
      padding: 'py-10 pt-32 px-4 sm:px-6 md:px-8 lg:px-10',
    }"
  >
    <!-- Article Section -->
    <div class="container mx-auto w-full flex flex-col items-center">
      <!-- Article Image -->
      <div  class="w-full mx-auto">
        <div class="flex justify-between items-center px-2 py-2 w-full">
          <NuxtLink to="/blog" class="flex space-x-2 items-center">
            <UIcon name="i-iconoir-arrow-left" class="w-3 h-3" />
            <span class="text-sm text-muted">Back</span>
          </NuxtLink>
        </div>
        <NuxtPicture 
          v-if="article?.image?.url"
          :src="useStrapiImage(article?.image?.url)" 
          alt="Article Cover" 
          :imgAttrs="{class: 'h-40 md:h-96 w-full aspect-square object-cover rounded-3xl'}"
        />
      </div>
      
      <div class="xl:relative">
        <div class="mx-auto max-w-2xl">
          <article class="pb-8 pt-8">
            <div class="flex gap-4 flex-wrap">
              <p v-for="category in article?.categories" :key="category.id" class="text-xs font-bold text-muted px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-800 capitalize">
                {{ category.name }}
              </p>
            </div>
            <h1 class="mt-8 text-4xl font-bold tracking-tight sm:text-5xl ">
              {{ article?.title }}
            </h1>
            <div class="mt-8 prose prose-slate dark:prose-invert text-justify">
              <div v-html="formattedContent"></div>
            </div>
            <!-- Article Metadata (Author, Date) -->
            <div class="flex space-x-2 items-center pt-12 border-t border-neutral-800 mt-12">
              <time :datetime="article?.publishedAt">
                {{ formattedDate }}
              </time>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Dynamic Zone Manager -->
    <div v-if="article?.dynamic_zone">
      <DynamicZoneManager :dynamicZone="article?.dynamic_zone" :locale="locale" />
    </div>
  </UContainer>
</template>
