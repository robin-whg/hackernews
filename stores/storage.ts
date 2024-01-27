interface State {
  openItemsInNewTab: boolean
  bookmarks: Bookmark[]
}

export const useStorageStore = defineStore('storage', {
  state: (): State => {
    return {
      openItemsInNewTab: false,
      bookmarks: [],
    }
  },
  getters: {
    isBookmarked: (state) => {
      return (id: number) => state.bookmarks.find(item => item.id === id)
    },
  },
  actions: {
    addBookmark(id: number) {
      if (!this.isBookmarked(id))
        this.bookmarks.push({ id, timestamp: Date.now() })
    },
    removeBookmark(id: number) {
      this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
