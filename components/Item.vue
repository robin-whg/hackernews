<script lang="ts" setup>
const props = defineProps<{ item: Item }>()
const { item } = toRefs(props)

const { host, timeAgo } = useUtils()

const type = computed(() => getType(item.value))

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
  <div class="flex flex-col gap-6">
    <div>
      <div class="h-7 flex items-center gap-1.5 text-sm text-zinc-400">
        <div class="flex items-center gap-1">
          <div class="h-1.5 w-1.5 rounded-full" :class="type[1]" />
          {{ type[0] }}
        </div>

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

      <div class="h-7 flex items-center text-sm text-zinc-400">
        <span class="truncate pr-1.5">
          {{ item.score }} {{ item.score === 1 ? 'point' : 'points' }} by <NuxtLink class="hover:underline" :to="`/user/${item.by}`">{{ item.by }}
          </NuxtLink> {{ timeAgo(item.time) }} ago
        </span>
      </div>
    </div>

    <p v-if="item.text" class="break-words hyphens-auto prose prose-zinc prose-invert" lang="en" v-html="item.text" />
  </div>
</template>
