import type { UseAsyncStateOptions } from '@vueuse/core'
import type { FeedType, Item } from '~/types'

const api = useApi()
const storage = useStorageHandler()

const items = ref<Item[]>([])
const feeds = ref<{ [key in FeedType]: number[] }>(Object.fromEntries(FEED_TYPES.map(feedType => [[feedType], []])))

export default function () {
  function getItem(id: number) {
    return items.value.find(item => item.id === id)
  }

  function isBookmarked(id: number) {
    return storage.isBookmarked(id)
  }

  function addBookmark(item: Item) {
    feeds.value.bookmarks.push(item.id)
    storage.addBookmark(item.id)
  }

  function deleteBookmark(item: Item) {
    feeds.value.bookmarks = feeds.value.bookmarks.filter(id => id !== item.id)
    storage.removeBookmark(item.id)
  }

  // PERF: Optimize
  function getFeed(feedType: FeedType, page = 1) {
    const feed: number[] = feeds.value[feedType as keyof typeof feeds.value]
    return items.value.filter(item => feed.slice(0, page * 30).includes(item.id)).sort((a, b) => feed.indexOf(a.id) - feed.indexOf(b.id))
  }

  function fetchItem(id: number, options?: UseAsyncStateOptions<true, boolean> | undefined) {
    return useAsyncState(async () => {
      const localItem = items.value.find(item => item.id === id)

      if (!localItem) {
        const item = await api.fetchItem(id)
        items.value.push(item)
      }

      return true
    }, false, options)
  }

  function fetchFeed(feedType: FeedType, options?: UseAsyncStateOptions<true, boolean> | undefined) {
    // TODO: Handle bookmarks feed
    return useAsyncState(async (page = 1) => {
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
    }, false, options)
  }

  return {
    getItem,
    isBookmarked,
    addBookmark,
    deleteBookmark,
    getFeed,
    fetchItem,
    fetchFeed,
  }
}
