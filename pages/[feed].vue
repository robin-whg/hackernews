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
  <div class="flex flex-col gap-6">
    <Suspense>
      <Feed :feed-type="feedType" />

      <template #fallback>
        <div class="w-full px-3">
          <ItemListSkeleton v-for="i in 30" :key="i" />
        </div>
      </template>
    </Suspense>
  </div>
</template>
