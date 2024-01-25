<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: (title) => {
    return title ? `hackernews - ${title}` : 'hackernews'
  },
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple/touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', type: '/safari-pinned-tab.svg', color: '#18181b' },
  ],
  meta: [
    { name: 'description', content: 'A simple hackernews client' },
    { name: 'msapplication-TileColor', content: '#18181b' },
    { name: 'theme-color', content: '#18181b' },
  ],
  bodyAttrs: {
    class: 'bg-zinc-900 text-zinc-50 font-sans',
  },
})
</script>

<template>
  <NuxtLoadingIndicator color="false" class="bg-orange-600" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
