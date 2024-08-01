<script lang='ts' setup>
import type { Item } from '~/types'

const props = defineProps<{ item: Item }>()
const { item } = toRefs(props)

const type = computed(() => {
  if (item.value.type === 'job')
    return ['Job', 'purple']
  if (item.value.type === 'poll')
    return ['Poll', 'red']
  if (item.value.title?.startsWith('Show HN:'))
    return ['Show', 'green']
  // NOTE: Some ask stories do not start with 'Ask HN:'
  if (item.value.title?.startsWith('Ask HN:') || (!item.value.url && item.value.type === 'story' && !item.value.title?.startsWith('Show HN:')))
    return ['Ask', 'blue']

  return ['Story', 'orange']
})
</script>

<template>
  <UBadge variant="soft" size="xs" class="flex gap-1.5" :color="type[1]">
    <div class="h-1.5 w-1.5 rounded-full" :class="`bg-${type[1]}-500 dark:bg-${type[1]}-400`" />
    {{ type[0] }}
  </UBadge>
</template>
