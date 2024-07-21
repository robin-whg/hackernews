export default defineAppConfig({
  nuxtIcon: {},
  ui: {
    primary: 'orange',
    gray: 'neutral',
    icons: {
      dynamic: true,
    },
    button: {
      default: {
        loadingIcon: 'i-tabler-reload',
      },
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-tabler-point-filled',
      },
    },
  },
})
