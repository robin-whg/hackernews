<script lang='ts' setup>
const props = defineProps<{ item: Item }>()
const { item } = toRefs(props)

const type = computed(() => {
  if (item.value.type === 'job')
    return ['Job', 'bg-purple-600']
  if (item.value.type === 'poll')
    return ['Poll', 'bg-red-600']
  if (item.value.title?.startsWith('Show HN:'))
    return ['Show HN', 'bg-green-600']
  // NOTE: Some ask stories do not start with 'Ask HN:'
  if (item.value.title?.startsWith('Ask HN:') || (!item.value.url && item.value.type === 'story' && !item.value.title?.startsWith('Show HN:')))
    return ['Ask HN', 'bg-blue-600']

  return ['Story', 'bg-orange-600']
})
</script>

<template>
  <div class="flex items-center gap-1">
    <div class="h-1.5 w-1.5 rounded-full" :class="type[1]" />
    {{ type[0] }}
  </div>
</template>
