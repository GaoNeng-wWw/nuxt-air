import { resolve } from 'node:path';
import {bundledLanguages, type BundledLanguage} from 'shiki/langs.mjs';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-auth-utils',
    '@prisma/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    '@nuxt/test-utils/module',
    'shadcn-nuxt',
    '@nuxtjs/mdc',
    'nuxt-seo-utils',
    '@nuxt/image'
  ],
  runtimeConfig:{
    SESSION_PASSWORD: '',
    JWT_PASSWORD: '',
    IMAGE_LIMIT_BYTE: 10000000,
    OSS_PATH: resolve('./public/image')
  },
  devtools: {
    enabled: false,

    timeline: {
      enabled: true
    }
  },
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
        base: './.tmp'
      }
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
  shadcn: {
    prefix: 'ui',
  },
  mdc:{
    highlight:{
      // noApiRoute: true,
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
    },
    components:{
      map:{
        img: 'ProseImage',
        a: 'ProseA',
        code: 'ProseCode',
        pre: 'ProsePre',
        p: 'ProseP'
      },
    }
  },
  typescript:{
    shim: false,
    tsConfig:{
      include: ['~/types/*.d.ts']
    }
  }
});