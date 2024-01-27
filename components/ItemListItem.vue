<script lang="ts" setup>
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
</script>

<template>
  <div class="py-3">
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

      <template v-if="item.descendants !== undefined">
        <div class="i-tabler-slash h-4 w-4 flex-none" />

        <BaseButton
          as="NuxtLink"
          :target
          sm
          :to="`https://news.ycombinator.com/item?id=${item.id}`"
          icon="i-tabler-message-circle"
        >
          {{ item.descendants }}
          <span class="hidden md:block">
            {{ item.descendants === 1 ? 'comment' : 'comments' }}
          </span>
        </BaseButton>

        <!-- HACK: isBookmarked and addBookmark should be from the same source -->
        <BaseButton
          v-if="!storage.isBookmarked(item.id)"
          sm
          icon="i-tabler-bookmark"
          @click="store.addBookmark(item)"
        >
          bookmark
        </BaseButton>

        <BaseButton v-else icon="i-tabler-bookmark-minus" sm @click="store.removeBookmark(item)">
          remove
        </BaseButton>
      </template>
    </div>
  </div>
</template>
