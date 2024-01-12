// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  imports: {
    dirs: ['types'],
  },
  modules: ['@unocss/nuxt', '@pinia/nuxt', 'nuxt-headlessui'],
  unocss: {
    preflight: true,
  },
})
