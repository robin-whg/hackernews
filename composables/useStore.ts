const api = useApi()

const items = ref<Item[]>([])
const feeds = ref<{ [key in FeedType]: number[] }>(Object.fromEntries(feedTypes.map(feedType => [[feedType], []])))

export default function () {
  function getItem(id: number) {
    return computed(() => items.value.find(item => item.id === id))
  }

  // PERF: Optimize
  function getFeed(feedType: FeedType, page = 1) {
    return computed(() => {
      const feed: number[] = feeds.value[feedType as keyof typeof feeds.value]
      return items.value.filter(item => feed.slice(0, page * 30).includes(item.id)).sort((a, b) => feed.indexOf(a.id) - feed.indexOf(b.id))
    })
  }

  // fetchItem
  function fetchItem(id: number) {
    return useAsyncState(async () => {
      const localItem = items.value.find(item => item.id === id)

      if (!localItem) {
        const item = await api.fetchItem(id)
        items.value.push(item)
      }

      return true
    }, false)
  }

  function fetchFeed(feedType: FeedType, page = 1) {
    // TODO: Handle bookmarks feed
    return useAsyncState(async () => {
      // fetch ids of feed if needed
      if (!feeds.value[feedType].length) {
        const feed = await api.fetchFeed(feedType)
        feeds.value[feedType] = feed
      }

      // fetch items of feed if needed
      const idsOfCurrentPage = feeds.value[feedType].slice((page - 1) * 30, page * 30)

      const idsToFetch = idsOfCurrentPage.filter(id => !items.value.find(item => item.id === id))

      if (idsToFetch.length) {
        const fetchedItems = await api.fetchItems(idsToFetch)
        items.value.push(...fetchedItems)
      }

      return true
    }, false)
  }

  // TODO: add Bookmarks functionality back in

  return {
    fetchItem,
    fetchFeed,
    getItem,
    getFeed,
  }
}
