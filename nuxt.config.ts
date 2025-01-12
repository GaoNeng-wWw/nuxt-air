import {bundledLanguages, type BundledLanguage} from 'shiki/langs.mjs';
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
    'shadcn-nuxt',
    '@nuxtjs/mdc',
  ],
  devtools: { enabled: false },
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
  vite: {
    ssr: {
      external: ['@prisma/client'],
    },
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  eslint: {
    checker: true,
  },
  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    experimental: {
      localeDetector: 'localeDetector.ts',
    },
  },
  prisma: {
    installCLI: false,
    installClient: false,
    installStudio: false,
  },
  shadcn: {
    prefix: 'ui',
  },
  mdc:{
    highlight:{
      noApiRoute: true,
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight'
      },
      shikiEngine: 'javascript',
      langs: Object.keys(bundledLanguages) as BundledLanguage[]
    },
    rehypePlugins:{
      [require.resolve('rehype-katex')]: {}
    },
    remarkPlugins:{
      [require.resolve('remark-math')]: {},
      [require.resolve('remark-gfm')]: {}
    }
  }
});