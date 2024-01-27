interface State {
  items: Item[]
  feeds: { [key in FeedType]: number[] }
}

const api = useApi()

export const useHackerStore = defineStore('hacker', {
  state: (): State => {
    return {
      items: [],
      feeds: Object.fromEntries(feedTypes.map(feedType => [[feedType], []])),
    }
  },
  getters: {
    getItem: (state) => {
      return (id: number) => state.items.find(item => item.id === id)
    },
    getItems: (state) => {
      return (ids: number[]) => state.items.filter(item => ids.includes(item.id))
    },
    getFeed: (state) => {
      return (feedType: FeedType, page: number) => state.items.filter(item => state.feeds[feedType].slice(0, page * 30).includes(item.id))
    },
  },
  actions: {
    async fetchItem(id: number) {
      const item = await api.fetchItem(id)
      this.items.push(item)
    },
    async fetchItems(ids: number[]) {
      const idsToFetch = ids.filter(id => !this.items.find(item => item.id === id))

      if (idsToFetch.length > 0) {
        const items = await api.fetchItems(idsToFetch)
        items.forEach(item => this.items.push(item))
      }
    },
    async fetchFeed(feedType: FeedType, page = 1) {
      // Fetch feed if needed
      if (!this.feeds[feedType].length) {
        const feedIds = await api.fetchFeed(feedType)
        this.feeds[feedType] = feedIds
      }

      // Get ids of current page
      const ids = this.feeds[feedType].slice((page - 1) * 30, page * 30)

      await this.fetchItems(ids)
    },
  },
})
