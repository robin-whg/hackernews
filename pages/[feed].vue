<script lang='ts' setup>
definePageMeta({
  middleware: 'feed',
})

const route = useRoute()

const feedType = computed(() => route.params.feed as FeedType)
const page = ref(1)

const hackerStore = useHackerStore()
const { getFeed } = storeToRefs(hackerStore)

await hackerStore.fetchFeed(feedType.value, page.value)

const loading = ref(false)

async function loadMore() {
  loading.value = true
  page.value += 1
  await hackerStore.fetchFeed(feedType.value, page.value)
  loading.value = false
}

const isEnd = computed(() => {
  return getFeed.value(feedType.value, page.value).length === hackerStore.feeds[feedType.value].length
})
</script>

<template>
  <div class="mx-auto flex flex-col items-center gap-6 container">
    <ItemList class="max-w-2xl" :items="getFeed(feedType, page)" />

    <template v-if="!isEnd">
      <template v-if="loading">
        <div class="flex items-center gap-1 px-3 py-1.5 text-sm">
          <div class="i-tabler-loader-2 h-4 w-4 flex-none animate-spin" />
          loading…
        </div>
      </template>
      <template v-else>
        <BaseButton :disabled="loading" icon="i-tabler-arrow-down" @click="loadMore">
          load more
        </BaseButton>
      </template>
    </template>
  </div>
</template>
