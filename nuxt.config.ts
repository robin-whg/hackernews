// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  ssr: false,

  typescript: {
    typeCheck: true,
  },

  imports: {
    dirs: ['types'],
  },

  modules: ['@unocss/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-headlessui', '@nuxtjs/robots', '@vueuse/nuxt'],

  unocss: {
    preflight: true,
  },

  compatibilityDate: '2024-07-18',
})
