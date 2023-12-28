<script setup lang="ts">
useHead({
  htmlAttrs: {
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
