import { join } from 'node:path';
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
    '@nuxt/content',
    '@nuxtjs/i18n',
    'vue-sonner/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  imports: {
    autoImport: true,
  },
  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'nord',
            light: 'min-light',
            dark: 'nord',
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
        file: 'zh.json',
      },
      {
        code: 'en',
        name: 'En',
        file: 'en.json',
      },
    ],
  },
  nitro: {
    externals: {
      trace: false,
      // inline: ['@prisma/client'],
    },
    preset: 'vercel-edge',
  },
});
