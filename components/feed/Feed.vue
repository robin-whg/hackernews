<script setup lang="ts">
const props = defineProps<{ feedType: FeedType }>()
const { feedType } = toRefs(props)

const page = ref(1)

const store = useContentStore()

const { isReady } = useAsyncState(
  store.fetchFeed(feedType.value, page.value),
  null,
)

const items = computed(() => store.getFeed(feedType.value, page.value))

const isEnd = computed(() => {
  return items.value.length === store.feeds[feedType.value].length
})

const { isLoading: loadingMore, execute: loadMore } = useAsyncState(
  () => {
    page.value += 1
    return store.fetchFeed(feedType.value, page.value)
  },
  null,
  {
    immediate: false,
  },
)
</script>

<template>
  <div class="flex flex-col">
    <FeedHeading />

    <template v-if="isReady">
      <ol v-if="items.length" class="flex flex-col border-b border-zinc-800 divide-y divide-zinc-800">
        <li v-for="item in items" :key="item.id">
          <FeedItem :item="item" />
        </li>
      </ol>

      <p v-else class="my-6 text-center">
        This list is empty :(
      </p>

      <div v-if="!isEnd" class="w-full flex justify-center p-3">
        <div v-if="loadingMore" class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium">
          <div class="i-tabler-loader-2 h-4 w-4 flex-none animate-spin" />
          loading…
        </div>
        <BaseButton v-else :disabled="loadingMore" icon="i-tabler-arrow-down" @click="loadMore()">
          load more
        </BaseButton>
      </div>
    </template>

    <ol v-else class="flex flex-col border-b border-zinc-800 divide-y divide-zinc-800">
      <li v-for="i in 30" :key="i">
        <FeedSkeleton />
      </li>
    </ol>
  </div>
</template>
