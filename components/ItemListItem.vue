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

const target = computed(() => storage.openItemsInNewTab ? '_blank' : '_self')

const store = useContentStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')

const isBookmarked = computed(() => storage.isBookmarked(item.value.id.toString()))

function toggleBookmark() {
  isBookmarked.value ? store.removeBookmark(item.value) : store.addBookmark(item.value)
}
</script>

<template>
  <div class="flex flex-col py-3">
    <div class="">
      <div class="h-6 flex items-center gap-1.5 text-sm text-zinc-400">
        <BaseItemBadge :item="item" />

        <template v-if="item.url">
          <div class="i-tabler-slash h-4 w-4 flex-none" />

          <p>
            {{ host(item.url) }}
          </p>
        </template>
      </div>

      <template v-if="item.url">
        <NuxtLink :target :to="item.url" class="line-clamp-2 text-zinc-50 md:text-lg visited:text-zinc-400">
          {{ title }}
        </NuxtLink>
      </template>
      <template v-else>
        <p class="line-clamp-2 md:text-lg">
          {{ title }}
        </p>
      </template>

      <div class="h-6 flex items-center text-sm text-zinc-400">
        <span class="truncate pr-1.5">
          {{ item.score }} {{ item.score === 1 ? 'point' : 'points' }} by
          <NuxtLink :target class="hover:underline" :to="`https://news.ycombinator.com/user?id=${item.by}`">{{ item.by }} </NuxtLink>
          {{ timeAgo(item.time) }} ago
        </span>

        <template v-if="mdAndLarger">
          <div class="i-tabler-slash h-4 w-4 flex-none" />

          <BaseButton
            v-if="item.descendants !== undefined"
            as="NuxtLink"
            :target
            sm
            :to="`https://news.ycombinator.com/item?id=${item.id}`"
            icon="i-tabler-message-circle"
            class="mr-1.5"
          >
            {{ item.descendants }}
            <span class="hidden md:block">
              {{ item.descendants === 1 ? 'comment' : 'comments' }}
            </span>
          </BaseButton>

          <!-- HACK: isBookmarked and addBookmark should be from the same source -->
          <BaseButton sm :icon="isBookmarked ? 'i-tabler-bookmark-filled' : 'i-tabler-bookmark'" :class="{ 'text-orange-600': isBookmarked }" @click="toggleBookmark()">
            {{ isBookmarked ? 'remove' : 'bookmark' }}
          </BaseButton>
        </template>
      </div>
    </div>

    <div v-if="!mdAndLarger" class="flex justify-end gap-1.5">
      <BaseButton
        v-if="item.descendants !== undefined"
        as="NuxtLink"
        :target
        :to="`https://news.ycombinator.com/item?id=${item.id}`"
        icon="i-tabler-message-circle"
        :aria-label="`${item.descendants} comments`"
      >
        {{ item.descendants }}
      </BaseButton>

      <BaseButton :icon="isBookmarked ? 'i-tabler-bookmark-filled' : 'i-tabler-bookmark'" :class="{ 'text-orange-600': isBookmarked }" aria-label="bookmark" @click="toggleBookmark()" />
    </div>
  </div>
</template>
