import { useStorage } from '@vueuse/core'

const openItemsInNewTab = useStorage<boolean>('open-items-in-new-tab', true)
const bookmarks = useStorage<Record<number, Bookmark>>('bookmarks', [])

export default function () {
  function toggleOpenItemsInNewTab() {
    openItemsInNewTab.value = !openItemsInNewTab.value
  }

  function isBookmarked(id: number) {
    return computed(() => !!bookmarks.value[id])
  }

  function addBookmark(id: number) {
    if (!isBookmarked(id))
      bookmarks.value[id] = { id, timestamp: Date.now() }
  }

  function removeBookmark(id: number) {
    delete bookmarks.value[id]
  }

  return {
    openItemsInNewTab: readonly(openItemsInNewTab),
    bookmarks: readonly(bookmarks),
    isBookmarked,
    toggleOpenItemsInNewTab,
    addBookmark,
    removeBookmark,
  }
}
