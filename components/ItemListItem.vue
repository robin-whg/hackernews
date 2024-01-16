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
      <NuxtLink :to="item.url" class="line-clamp-2 md:text-lg">
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
        <NuxtLink class="hover:underline" :to="`https://news.ycombinator.com/user?id=${item.by}`">{{ item.by }} </NuxtLink>
        {{ timeAgo(item.time) }} ago
      </span>

      <template v-if="item.descendants !== undefined">
        <div class="i-tabler-slash h-4 w-4 flex-none" />

        <BaseButton
          as="NuxtLink"
          sm
          :to="`https://news.ycombinator.com/item?id=${item.id}`"
          class="group w-max flex items-center gap-1 rounded-md px-1.5 py-.5 transition duration-100 hover:bg-zinc-800 hover:text-white"
          icon="i-tabler-message"
        >
          {{ item.descendants }}
          <span class="hidden md:block">
            {{ item.descendants === 1 ? 'comment' : 'comments' }}
          </span>
        </BaseButton>
      </template>
    </div>
  </div>
</template>
