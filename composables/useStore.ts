import { useStorage } from '@vueuse/core'
import type { UseAsyncStateOptions } from '@vueuse/core'
import type { Bookmark, FeedType, Item } from '~/types'

const api = useApi()

const items = ref<Item[]>([])
const feeds = ref<{ [key in FeedType]: number[] }>(Object.fromEntries(FEED_TYPES.map(feedType => [[feedType], []])))
const bookmarks = useStorage<Bookmark[]>('bookmarks', [])

export default function () {
  function getItem(id: number) {
    return items.value.find(item => item.id === id)
  }

  function isBookmarked(id: number) {
    return !!bookmarks.value.find(bookmark => bookmark.id === id)
  }

  function addBookmark(id: number) {
    if (!isBookmarked(id))
      bookmarks.value.push({ id, timestamp: Date.now() })

    feeds.value.saved.push(id)
  }

  function deleteBookmark(id: number) {
    bookmarks.value = bookmarks.value.filter(bookmark => bookmark.id !== id)
    feeds.value.saved = feeds.value.saved.filter(bookmark => bookmark !== id)
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
        // NOTE: API still returns ok if item is not found
        if (!item)
          throw new Error('Item not found')

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
        if (feedType !== 'saved') {
          const feed = await api.fetchFeed(feedType)
          feeds.value[feedType] = feed
        }
        else {
          const feed = bookmarks.value.map(bookmark => bookmark.id)
          feeds.value[feedType] = feed
        }
      }

      // fetch items of feed if needed
      const idsOfCurrentPage = feeds.value[feedType].slice((page - 1) * 30, page * 30)

      const idsToFetch = idsOfCurrentPage.filter(id => !items.value.find(item => item.id === id))

      if (idsToFetch.length) {
        const fetchedItems = await api.fetchItems(idsToFetch)
        fetchedItems.forEach((item) => {
          // NOTE: API still returns ok if item is not found
          if (item)
            items.value.push(item)
        })
      }

      return true
    }, false, options)
  }

  return {
    feeds: readonly(feeds),
    getItem,
    isBookmarked,
    addBookmark,
    deleteBookmark,
    getFeed,
    fetchItem,
    fetchFeed,
  }
}
