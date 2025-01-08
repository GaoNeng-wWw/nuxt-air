// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-auth-utils',
    '@prisma/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
  ],
  devtools: { enabled: true },
  css: [
    '~/assets/css/reset.css',
  ],
  colorMode: {
    classSuffix: '',
    storage: 'sessionStorage',
    storageKey: '__COLOR_SCHEMA__',
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    devStorage: {
      redis: {
        driver: 'fs',
        base: './.tmp',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  prisma: {
    installStudio: false,
    generateClient: true,
    autoSetupPrisma: false,
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
})
