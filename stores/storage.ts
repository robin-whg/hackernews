interface State {
  openItemsInNewTab: boolean
}

export const useStorageStore = defineStore('storage', {
  state: (): State => {
    return {
      openItemsInNewTab: false,
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
