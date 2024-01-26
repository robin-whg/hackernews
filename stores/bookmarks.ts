interface State {
  bookmarks: Bookmark[]
}

export const useBookmarksStore = defineStore('bookmarks', {
  state: (): State => {
    return {
      bookmarks: [],
    }
  },
  getters: {
    isBookmarked: () => {},
  },
  actions: {
    setBookmark() {},
  },
})
