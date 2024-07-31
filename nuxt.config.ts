// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  typescript: {
    typeCheck: true,
  },

  imports: {
    dirs: ['types'],
  },

  modules: [
    '@nuxtjs/robots',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/fonts',
  ],

  ui: {
    icons: {},
  },

  colorMode: {
    preference: 'system',
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'bunny', weights: [400, 600] },
    ],
  },

  compatibilityDate: '2024-07-18',
})
