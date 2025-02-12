import type { BundledLanguage } from 'shiki/langs.mjs';
import { resolve } from 'node:path';
import { env } from 'node:process';
import { bundledLanguages } from 'shiki/langs.mjs';
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
    '@nuxt/image',
    'nuxt-og-image',
  ],
  ogImage: {
    fonts: [
      'Noto+Sans+SC:400',
    ],
    compatibility: {
      'css-inline': true,
    },
  },
  runtimeConfig: {
    SESSION_PASSWORD: '',
    JWT_PASSWORD: '',
    IMAGE_LIMIT_BYTE: 10000000,
    OSS_PATH: resolve('./public/image'),
    // 5min
    PR_CARD_CACHE_TTL_MS: 5 * 60 * 1000,
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
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
        base: './.tmp',
      },
    },
    storage: {
      redis: {
        driver: 'vercel-kv',
        url: env.KV_REST_API_URL,
        token: env.KV_REST_API_TOKEN,
      },
      oss: {
        driver: 'vercel-blob',
        token: env.BLOB_READ_WRITE_TOKEN,
        access: 'public',
      },
    },
  },
  vite: {
    define: {
      DEPLOY_MODE: JSON.stringify(env.NUXT_DEPLOY_MODE),
    },
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
    config: {
      standalone: false,
    },
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
  mdc: {
    highlight: {
      noApiRoute: true,
      theme: {
        default: 'material-theme-lighter',
        dark: 'material-theme-palenight',
      },
      shikiEngine: 'javascript',
      langs: Object.keys(bundledLanguages) as BundledLanguage[],
    },
    rehypePlugins: {
      [require.resolve('rehype-katex')]: {},
    },
    remarkPlugins: {
      [require.resolve('remark-math')]: {},
      [require.resolve('remark-gfm')]: {},
    },
    components: {
      map: {
        img: 'ProseImage',
        a: 'ProseA',
        code: 'ProseCode',
        pre: 'ProsePre',
        p: 'ProseP',
      },
    },
  },
  typescript: {
    shim: false,
    tsConfig: {
      include: ['~/types/*.d.ts'],
    },
  },
});
