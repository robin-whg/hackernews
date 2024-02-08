<script setup lang="ts">
const props = defineProps<{ feedType: FeedType }>()
const { feedType } = toRefs(props)

const page = ref(1)

const store = useContentStore()

await store.fetchFeed(feedType.value, page.value)

const loading = ref(false)

async function loadMore() {
  loading.value = true
  page.value += 1
  await store.fetchFeed(feedType.value, page.value)
  loading.value = false
}

const isEnd = computed(() => {
  return store.getFeed(feedType.value, page.value).length === store.feeds[feedType.value].length
})
</script>

<template>
  <div class="flex flex-col">
    <FeedHeading />
    <ItemList class="border-b border-zinc-800" :items="store.getFeed(feedType, page)" />

    <div v-if="!isEnd" class="w-full flex justify-center p-3">
      <template v-if="loading">
        <div class="flex items-center gap-1.5 px-3 py-1.5 text-sm">
          <div class="i-tabler-loader-2 h-4 w-4 flex-none animate-spin" />
          loading…
        </div>
      </template>
      <template v-else>
        <BaseButton :disabled="loading" icon="i-tabler-arrow-down" @click="loadMore">
          load more
        </BaseButton>
      </template>
    </div>
  </div>
</template>
