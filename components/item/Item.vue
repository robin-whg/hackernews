<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import type { Item } from '~/types'

const props = withDefaults(defineProps<{ item: Item, expanded?: boolean }>(), { expanded: false })
const { item, expanded } = toRefs(props)

const openItemsInNewTab = useStorage('open-items-in-new-tab', false)
const openCommentsInNewTab = useStorage('open-comments-in-new-tab', false)

const title = computed(() => {
  const ask = 'Ask HN:'
  if (item.value.title?.startsWith(ask))
    return item.value.title.slice(ask.length)

  const show = 'Show HN:'
  if (item.value.title?.startsWith(show))
    return item.value.title.slice(show.length)

  return item.value?.title
})

const store = useStore()
const isBookmarked = computed(() => store.isBookmarked(item.value.id))
</script>

<template>
  <div v-if="item" class="p-4 flex flex-col gap-4">
    <div
      class="flex flex-col gap-2"
    >
      <div class="h-6 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
        <BaseItemBadge :item="item" />

        <p v-if="item.url">
          {{ host(item.url) }}
        </p>
      </div>

      <template v-if="item.url">
        <ULink
          :target="openItemsInNewTab ? '_blank' : '_self'"
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

      <div class="h-6 flex items-center text-sm text-gray-700 dark:text-gray-200 gap-1.5 justify-between">
        <span class="truncate pr-1.5">
          {{ item.score }} {{ item.score === 1 ? "point" : "points" }} by
          <ULink
            :target="openItemsInNewTab ? '_blank' : '_self'"
            class="hover:underline"
            :to="`https://news.ycombinator.com/user?id=${item.by}`"
          >{{ item.by }}
          </ULink>
          {{ timeAgo(item.time) }} ago
        </span>

        <div class="flex gap-1 5">
          <UButton v-if="!expanded" variant="ghost" color="gray" :target="openCommentsInNewTab ? '_blank' : '_self'" :to="`/item/${item.id}`" icon="i-tabler-message-circle">
            {{ item.descendants }}
          </UButton>

          <UButton variant="ghost" :color="isBookmarked ? 'yellow' : 'gray'" :icon="isBookmarked ? 'i-tabler-bookmark-filled' : 'i-tabler-bookmark'" :title="isBookmarked ? 'unsave' : 'save'" @click="isBookmarked ? store.deleteBookmark(item.id) : store.addBookmark(item.id)" />
        </div>
      </div>
    </div>

    <template v-if="expanded">
      <div v-if="item.text" v-html="item.text" />
    </template>
  </div>
</template>
