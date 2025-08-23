// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/theme.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@unocss/nuxt',
    '@prisma/nuxt',
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  imports: {
    autoImport: true,
  },
  prisma: {
    autoSetupPrisma: true,
  },
  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'material-theme-lighter',
            dark: 'material-theme-palenight',
          },
        },
      },
    },
  },
  i18n: {
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'zh',
        name: '中',
      },
      {
        code: 'en',
        name: 'En',
      },
    ],
  },
});
