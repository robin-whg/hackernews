export const useStorageStore = defineStore('storage', () => {
  const openItemsInNewTab = ref(false)
  // HACK: Keys in local storage are always a string, so to avoid problems, I convert the id
  const bookmarks = ref<Record<string, Bookmark>>({})

  function isBookmarked(id: string) {
    return !!bookmarks.value[id]
  }

  function addBookmark(id: string) {
    if (!isBookmarked(id))
      bookmarks.value[id] = { id: +id, timestamp: Date.now() }
  }

  function removeBookmark(id: string) {
    delete bookmarks.value[id]
  }

  return {
    openItemsInNewTab,
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
  }
}, { persist: { storage: localStorage },
})
