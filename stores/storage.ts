export const useStorageStore = defineStore('storage', () => {
  const openItemsInNewTab = ref(false)
  const bookmarks = ref<Bookmark[]>([])

  function isBookmarked(id: number) {
    return bookmarks.value.find(bookmark => bookmark.id === id)
  }

  function addBookmark(id: number) {
    if (!isBookmarked(id))
      bookmarks.value.push({ id, timestamp: Date.now() })
  }

  function removeBookmark(id: number) {
    bookmarks.value = bookmarks.value.filter(bookmark => bookmark.id !== id)
  }

  return {
    openItemsInNewTab,
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
  }
}, { persist: { storage: localStorage } })
