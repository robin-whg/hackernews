interface State {
  openItemsInNewTab: boolean
}

export const useSettingsStore = defineStore('settings', {
  state: (): State => {
    return {
      openItemsInNewTab: false,
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
