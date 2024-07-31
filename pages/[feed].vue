<script lang='ts' setup>
definePageMeta({
  middleware: 'feed',
  layout: 'feed',
})

const feedType = useRouteParams<FeedType>('feed', undefined, { transform: String })
useHead({
  title: feedType.value,
})

const page = ref(1)

const store = useStore()
const items = computed(() => store.getFeed(feedType.value, page.value))
const { isReady, error, execute } = store.fetchFeed(feedType.value)

// FIXME: triggers loading state of initial load
function loadMore() {
  page.value = page.value + 1
  execute(undefined, page.value)
}
</script>

<template>
  <div class="flex flex-col">
    <ol class="flex flex-col border-b border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
      <template v-if="!error">
        <template v-if="isReady">
          <template v-if="items.length">
            <li v-for="item in items" :key="item.id">
              <Item :item="item" />
            </li>
          </template>

          <template v-else>
            <li>
              <p class="my-4 text-center">
                Empty :(
              </p>
            </li>
          </template>
        </template>

        <template v-else>
          <li v-for="i in 30" :key="i">
            <ItemSkeleton />
          </li>
        </template>
      </template>

      <template v-else>
        <li>
          <p class="my-4 text-center">
            Error :(
          </p>
        </li>
      </template>
    </ol>

    <div class="w-full flex justify-center p-3">
      <UButton :loading="!isReady" icon="i-tabler-arrow-down" variant="ghost" color="gray" @click="loadMore()">
        load more
      </UButton>
    </div>
  </div>
</template>
