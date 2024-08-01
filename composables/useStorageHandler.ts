import { useStorage } from '@vueuse/core'

const bookmarks = useStorage<Record<number, Bookmark>>('bookmarks', [])

export default function () {
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
    bookmarks: readonly(bookmarks),
    isBookmarked,
    addBookmark,
    removeBookmark,
  }
}
