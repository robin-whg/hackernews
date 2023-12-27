<script lang='ts' setup>
import type { FeedType } from '#imports'

const route = useRoute()
const router = useRouter()

const feed = computed(() => route.params.feed as FeedType)
const page = computed(() => +(route.query.page ?? 1))

const hackerStore = useHackerStore()
const { getFeed } = storeToRefs(hackerStore)

await hackerStore.fetchFeed(feed.value, page.value)

const loading = ref(false)

function loadMore() {
  loading.value = true
  router.push(`/${feed.value}/${page.value + 1}`)
}
</script>

<template>
  <div class="mx-auto flex flex-col items-center gap-6 container">
    <ItemList class="max-w-2xl" :items="getFeed(feed, page)" />

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
