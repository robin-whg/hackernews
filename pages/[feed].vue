<script lang='ts' setup>
import type { FeedType } from '#imports'

const route = useRoute()
const router = useRouter()

const feedType = computed(() => route.params.feed as FeedType)
const page = ref(1)

const hackerStore = useHackerStore()
const { getFeed } = storeToRefs(hackerStore)

await hackerStore.fetchFeed(feed.value, page.value)

const loading = ref(false)

async function loadMore() {
  loading.value = true
  page.value += 1
  await hackerStore.fetchFeed(feedType.value, page.value)
  loading.value = false
}
</script>

<template>
  <div class="mx-auto flex flex-col items-center gap-6 container">
    <ItemList class="max-w-2xl" :items="getFeed(feedType, page)" />

    <button class="w-32 rounded-lg px-3 py-1.5 hover:bg-zinc-800" :disabled="loading" @click="loadMore">
      <template v-if="loading">
        <div class="i-tabler-loader-2 h-4 w-4 flex-none animate-spin" />
        loading
      </template>
      <template v-else>
        <div class="i-tabler-arrow-down h-4 w-4 flex-none" />
        more
      </template>
    </button>
  </div>
</template>
