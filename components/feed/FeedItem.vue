<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'

const props = defineProps<{ item: Item }>()
const { item } = toRefs(props)

const { host, timeAgo } = useUtils()

const title = computed(() => {
  const ask = 'Ask HN:'
  if (item.value.title?.startsWith(ask))
    return item.value.title.slice(ask.length)

  const show = 'Show HN:'
  if (item.value.title?.startsWith(show))
    return item.value.title.slice(show.length)

  return item.value?.title
})

const storage = useStorageStore()

const target = computed(() => (storage.openItemsInNewTab ? '_blank' : '_self'))

const store = useContentStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')

const isBookmarked = computed(() =>
  storage.isBookmarked(item.value.id.toString()),
)

function toggleBookmark() {
  return isBookmarked.value
    ? store.removeBookmark(item.value)
    : store.addBookmark(item.value)
}
</script>

<template>
  <div
    class="flex flex-col p-3 transition duration-100 ease-in-out gap-1.5"
  >
    <div class="h-6 flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-200">
      <BaseItemBadge :item="item" />

      <template v-if="item.url">
        <UIcon name="i-tabler-slash" class="text-gray-700 dark:text-gray-200" />

        <p>
          {{ host(item.url) }}
        </p>
      </template>
    </div>

    <template v-if="item.url">
      <ULink
        :target
        :to="item.url"
        class="line-clamp-2 md:text-lg visited:text-gray-700 visited:dark:text-gray-200 font-semibold hover:underline"
      >
        {{ title }}
      </ULink>
    </template>
    <template v-else>
      <p class="line-clamp-2 md:text-lg font-semibold">
        {{ title }}
      </p>
    </template>

    <div class="h-6 flex items-center text-sm text-gray-700 dark:text-gray-200">
      <span class="truncate pr-1.5">
        {{ item.score }} {{ item.score === 1 ? "point" : "points" }} by
        <ULink
          :target
          class="hover:underline"
          :to="`https://news.ycombinator.com/user?id=${item.by}`"
        >{{ item.by }}
        </ULink>
        {{ timeAgo(item.time) }} ago
      </span>

      <template v-if="mdAndLarger">
        <UIcon name="i-tabler-slash" class="text-gray-700 dark:text-gray-200" />

        <UButton variant="ghost" color="gray" size="xs" :target :to="`/item/${item.id}`" icon="i-tabler-message-circle">
          {{ item.descendants }}
          <span v-if="item.descendants === 1">comment</span>
          <span v-else>comments</span>
        </UButton>

        <!-- HACK: isBookmarked and addBookmark should be from the same source -->
        <UButton
          variant="ghost" :color="isBookmarked ? 'orange' : 'gray'" size="xs"
          :icon="
            isBookmarked ? 'i-tabler-bookmark-filled' : 'i-tabler-bookmark'
          "
          @click="toggleBookmark()"
        >
          {{ isBookmarked ? "remove" : "bookmark" }}
        </UButton>
      </template>
    </div>

    <div v-if="!mdAndLarger" class="flex justify-end gap-1.5">
      <UButton variant="ghost" color="gray" :target :to="`https://news.ycombinator.com/item?id=${item.id}`" icon="i-tabler-message-circle">
        {{ item.descendants }}
      </UButton>

      <UButton
        variant="ghost" :color="isBookmarked ? 'orange' : 'gray'" size="xs"
        :icon="
          isBookmarked ? 'i-tabler-bookmark-filled' : 'i-tabler-bookmark'
        "
        @click="toggleBookmark()"
      />
    </div>
  </div>
</template>
