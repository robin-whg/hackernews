<script lang='ts' setup>
import type { FeedType, Item } from '~/types'

definePageMeta({
  middleware: 'feed',
})

const route = useRoute()
const feedType = route.params.feed.toString() as FeedType

useHead({
  title: feedType,
})

const page = ref(1)

const store = useStore()
const items = computed(() => store.getFeed(feedType, page.value))
const { error, execute, isLoading } = store.fetchFeed(feedType)

const initialIsLoading = ref(true)
watchOnce(isLoading, (value) => {
  initialIsLoading.value = value
})

// TODO: Add isEnd computed property to hide load more button

function loadMore() {
  page.value = page.value + 1
  execute(undefined, page.value)
}
</script>

<template>
  <div>
    <FeedHeading />

    <ol class="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
      <template v-if="error">
        <li>
          <p class="my-4 text-center">
            Error :(
          </p>
        </li>
      </template>

      <template v-else-if="initialIsLoading">
        <li v-for="i in 30" :key="i">
          <ItemSkeleton />
        </li>
      </template>

      <template v-else-if="!items.length">
        <li>
          <p class="my-4 text-center">
            Empty :(
          </p>
        </li>
      </template>

      <template v-else>
        <li v-for="item in items" :key="item.id">
          <Item :item="item" />
        </li>
        <li>
          <div class="w-full flex justify-center p-3">
            <UButton :loading="isLoading" icon="i-tabler-arrow-down" variant="ghost" color="gray" @click="loadMore()">
              load more
            </UButton>
          </div>
        </li>
      </template>
    </ol>
  </div>
</template>
