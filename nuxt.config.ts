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
    // '@nuxtjs/sitemap',
    '@nuxt/content',
    '@nuxtjs/i18n',
    'vue-sonner/nuxt',
    '@nuxtjs/color-mode',
    // '@nuxtjs/seo',
    'nuxt-og-image',
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
        remarkPlugins: {
          'remark-math': {},
          'remark-ref': {},
        },
        rehypePlugins: {
          'rehype-katex': {},
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
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
  colorMode: {
    preference: 'system',
    fallback: 'dark ',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode',
  },
  nitro: {
    storage: {
      default: {
        driver: 'redis',
        url: import.meta.env.KV_URL,
      },
    },
    devStorage: {
      default: {
        driver: 'redis',
        url: import.meta.env.KV_URL,
      },
    },
  },
  unocss: {
    envMode: 'build',
  },
  ogImage: {
    debug: true,
    fonts: [
      'Noto+Sans+SC:400',
    ],
  },
  runtimeConfig:{
    public:{
      SITE_NAME:import.meta.env.NUXT_SITE_NAME
    }
  }
});
