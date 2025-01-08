// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-auth-utils', '@prisma/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxtjs/color-mode', '@nuxtjs/i18n' ],
  devtools: { enabled: true },
  css: [
    '~/assets/css/reset.css',
  ],
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  prisma: {
    installStudio: false,
    generateClient: true,
  },
  tailwindcss: {
    config: {
      content: [
        './pages/**/*.vue',
        './components/**/*.vue',
        './contens/**/*.vue',
      ],
    },
  },
  colorMode: {
    classSuffix: '',
    storage: 'sessionStorage',
    storageKey: '__COLOR_SCHEMA__',
  },
})
