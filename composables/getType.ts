export default function (item: Item) {
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
