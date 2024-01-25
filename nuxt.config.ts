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
  modules: ['@unocss/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-headlessui', '@nuxtjs/robots'],
  unocss: {
    preflight: true,
  },
})
