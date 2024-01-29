export const useContentStore = defineStore('content', () => {
  const api = useApi()
  const storage = useStorageStore()

  const items = ref<Item[]>([])
  const feeds = ref<{ [key in FeedType]: number[] }>(Object.fromEntries(feedTypes.map(feedType => [[feedType], []])))

  function getItem(id: number) {
    return items.value.find(item => item.id === id)
  }

  function getItems(ids: number[]) {
    return items.value.filter(item => ids.includes(item.id))
  }

  function getFeed(feedType: FeedType, page = 1) {
    return items.value.filter(item => feeds.value[feedType].slice(0, page * 30).includes(item.id))
  }

  async function fetchItem(id: number) {
    const item = await api.fetchItem(id)
    items.value.push(item)
  }

  async function fetchItems(ids: number[]) {
    // filter out ids that don't need to be fetched
    const idsToFetch = ids.filter(id => !items.value.find(item => item.id === id))

    if (idsToFetch.length) {
      const fetchedItems = await api.fetchItems(idsToFetch)
      fetchedItems.forEach(item => items.value.push(item))
    }
  }

  async function fetchFeed(feedType: FeedType, page = 1) {
    // Fetch feed if needed
    if (!feeds.value[feedType].length) {
      // Bookmarks feed doesn't need to be fetched
      // HACK: local Storage key can only be safed as a string, so I need to convert the id or it is false when I get it from localStorage
      const feedIds = feedType === 'bookmarks'
        ? Object.keys(storage.bookmarks).map(id => +id)
        : await api.fetchFeed(feedType)

      feeds.value[feedType] = feedIds
    }

    // Get  ids of current page
    const ids = feeds.value[feedType].slice((page - 1) * 30, page * 30)

    await fetchItems(ids)
  }

  function addBookmark(item: Item) {
    feeds.value.bookmarks.push(item.id)
    storage.addBookmark(item.id.toString())
  }

  function removeBookmark(item: Item) {
    feeds.value.bookmarks = feeds.value.bookmarks.filter(id => id !== item.id)
    storage.removeBookmark(item.id.toString())
  }

  return { items, feeds, getItem, getItems, getFeed, fetchItem, fetchItems, fetchFeed, addBookmark, removeBookmark }
})
