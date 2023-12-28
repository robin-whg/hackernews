<script lang="ts" setup>
const props = defineProps<{ item: Item }>()
const { item } = toRefs(props)

const { host, timeAgo } = useUtils()

const type = computed(() => getType(item.value))
function getType(item: Item) {
  if (item.type === 'job')
    return ['Job', 'bg-purple-600']
  if (item.type === 'poll')
    return ['Poll', 'bg-red-600']
  if (item.title?.startsWith('Show HN:'))
    return ['Show HN', 'bg-green-600']
  // NOTE: Some ask stories do not start with 'Ask HN:'
  if (item.title?.startsWith('Ask HN:') || (!item.url && item.type === 'story' && !item.title?.startsWith('Show HN:')))
    return ['Ask HN', 'bg-blue-600']

  return ['Story', 'bg-orange-600']
}

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
    <div class="flex items-center gap-1.5 text-sm text-zinc-400">
      <div class="flex items-center gap-1">
        <div class="h-1.5 w-1.5 rounded-full" :class="type[1]" />
        {{ type[0] }}
      </div>

      <div class="py-.5" :class="[item.url !== undefined ? '' : 'invisible']">
        <div class="i-tabler-slash h-4 w-4 flex-none" />
      </div>

      <template v-if="item.url">
        <p class="text-sm text-zinc-400">
          {{ host(item.url) }}
        </p>
      </template>
    </div>

    <template v-if="item.url">
      <NuxtLink :to="item.url" class="line-clamp-2 lg:text-lg">
        {{ title }}
      </NuxtLink>
    </template>
    <template v-else>
      <p class="line-clamp-2 lg:text-lg">
        {{ title }}
      </p>
    </template>

    <div class="flex items-center text-sm text-zinc-400">
      <span class="truncate pr-1.5">
        {{ item.score }} {{ item.score === 1 ? 'point' : 'points' }} by <NuxtLink class="hover:underline" :to="`/user/${item.by}`">{{ item.by }}
        </NuxtLink> {{ timeAgo(item.time) }} ago
      </span>

      <div class="py-.5" :class="[item.descendants !== undefined ? '' : 'invisible']">
        <div class="i-tabler-slash h-4 w-4 flex-none" />
      </div>

      <template v-if="item.descendants !== undefined">
        <div class="flex justify-end">
          <NuxtLink
            :to="`/item/${item.id}`"
            class="group w-max flex items-center gap-1 rounded-md px-1.5 py-.5 transition duration-100 hover:bg-zinc-800 hover:text-white"
          >
            <div class="h-4 w-4 inline-flex flex-none">
              <div class="i-tabler-message h-4 w-4 flex-none" />
            </div>
            {{ item.descendants }}
            <span class="hidden lg:block">
              {{ item.descendants === 1 ? 'comment' : 'comments' }}
            </span>
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>
