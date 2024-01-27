<script lang='ts' setup>
definePageMeta({
  middleware: 'feed',
})

const route = useRoute()

const feedType = computed(() => route.params.feed as FeedType)

useHead({
  title: feedType.value,
})
</script>

<template>
  <div class="mx-auto max-w-2xl w-full flex flex-col items-center gap-6 container">
    <Suspense>
      <Feed :feed-type="feedType" />

      <template #fallback>
        <ItemListSkeleton v-for="i in 30" :key="i" />
      </template>
    </Suspense>
  </div>
</template>
