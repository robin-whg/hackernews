<script setup lang="ts">
const colorMode = useColorMode()
const themeColor = computed(() => colorMode.preference === 'dark' ? '#171717' : '#ffffff')

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: (title) => {
    return title ? `hackernews - ${title}` : 'hackernews'
  },
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', type: '/safari-pinned-tab.svg', color: themeColor },
  ],
  meta: [
    { name: 'description', content: 'A simple hackernews client' },
    { name: 'msapplication-TileColor', content: themeColor },
    { name: 'theme-color', content: themeColor },
  ],
  bodyAttrs: {
    class: 'bg-white dark:bg-gray-900 text-black dark:text-white font-sans',
  },
})
</script>

<template>
  <NuxtLoadingIndicator color="false" class="bg-primary" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
