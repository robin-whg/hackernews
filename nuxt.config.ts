// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  ssr: false,
  imports: {
    dirs: ['types'],
  },
  modules: ['@unocss/nuxt', '@pinia/nuxt'],
  unocss: {
    preflight: true,
  },
})
