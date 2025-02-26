<script setup>
  const switchLocalePath = useSwitchLocalePath();
  const localePath = useLocalePath();
  const { logo, left_navbar_items, right_navbar_items } = defineProps({
      logo: {
          type: Object,
          default: () => ({})
      },
      left_navbar_items: {
          type: Array,
          default: () => []
      },
      right_navbar_items: {
          type: Array,
          default: () => []
      }
  })

  const isMobileMenuOpen = ref(false);
  const isLanguageDropdownOpen = ref(false);
  const selectedLanguage = ref('EN');

  const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };

  const toggleLanguageDropdown = () => {
      isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
  };

  const selectLanguage = (lang) => {
      selectedLanguage.value = lang;
      isLanguageDropdownOpen.value = false;
  };

  const closeLanguageDropdown = () => {
      isLanguageDropdownOpen.value = false;
  };

  if (process.client) {
      window.addEventListener('click', (event) => {
          if (!event.target.closest('.language-dropdown')) {
              closeLanguageDropdown();
          }
      });
  }

  const colorMode = useColorMode()
  const isDark = computed({
    get () {
      return colorMode.value === 'dark'
    },
    set () {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })

</script>

<template>
  <UContainer 
    class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 shadow-md text-gray-800 dark:text-white"
    :ui="{ 
      constrained: 'max-w-full',
      padding: 'px-0 sm:px-0 lg:px-0'
    }"
  >
    <div class="max-w-full mx-auto flex items-center justify-between px-4 lg:px-8 py-3">
      
      <div class="flex items-center space-x-6">
        <NuxtLink v-if="logo?.image" :to="localePath('/')">
          <NuxtPicture :src="useStrapiImage(logo.image.url)" :imgAttrs="{class: 'h-10 w-auto'}" />
        </NuxtLink>

        <nav class="hidden md:flex space-x-4">
          <NuxtLink
            v-for="item in left_navbar_items"
            :key="item.text"
            :href="localePath(item.URL)"
            :target="item.target"
            class="text-sm font-medium hover:text-slate-400 transition-colors"
          >
            {{ item.text }}
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center space-x-4">
        
        <!-- <div class="relative language-dropdown">
          <UButton 
            :ui="{ rounded: 'rounded-full', base: 'bg-gray-200 hover:bg-gray-300' }" 
            @click="toggleLanguageDropdown" 
          >
            {{ selectedLanguage }}
          </UButton>
          
          <ul v-if="isLanguageDropdownOpen" class="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-gray-200 rounded-md shadow-lg z-50">
            <li>
              <NuxtLink 
                :to="switchLocalePath('en')" 
                class="block rounded-t-lg px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-900"
                @click="selectLanguage('EN')"
              >
                EN
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                :to="switchLocalePath('de')" 
                class="block px-4 rounded-b-lg py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-900"
                @click="selectLanguage('DE')"
              >
                DE
              </NuxtLink>
            </li>
          </ul>
        </div> -->

        <div v-if="!isMobileMenuOpen" class="hidden md:flex space-x-2">
          <UButton
            v-for="(item, index) in right_navbar_items"
            :key="item.id"
            :to="item.URL"
            :variant="item.variant || 'solid'"
            :size="item.size || 'md'"
            :color="item.color || 'primary'"
            :icon="item.icon"
            :trailing="item.trailing"
            :ui="item.nuxt_ui_config?.json_data || {}"
          >
            {{ item.text }}
          </UButton>
          <ClientOnly>
            <UButton
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="w-8 h-8" />
            </template>
          </ClientOnly>
        </div>
      </div>
      <UButton  @click="toggleMobileMenu" class="md:hidden" variant="ghost" >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </UButton>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-100 shadow-lg">
      <nav class="flex flex-col space-y-2 py-4 px-4">
        <NuxtLink
          v-for="item in right_navbar_items"
          :key="item.text"
          :href="localePath(item.URL)"
          :target="item.target"
          @click="isMobileMenuOpen = false"
          class="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          {{ item.text }}
        </NuxtLink>
      </nav>
    </div>
  </UContainer>
</template>