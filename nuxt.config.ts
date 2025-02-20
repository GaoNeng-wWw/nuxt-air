import type { BundledLanguage } from 'shiki/langs.mjs';
import { resolve } from 'node:path';
import { env } from 'node:process';
import { fileURLToPath } from 'node:url';
import { bundledLanguages } from 'shiki/langs.mjs';

function getModulePath(moduleName: string) {
  try {
    const moduleUrl = import.meta.resolve(moduleName);
    const modulePath = fileURLToPath(moduleUrl);
    return (
      modulePath
        .substring(0, modulePath.lastIndexOf('node_modules'))
        .replace(/\/+$/, '') || ''
    );
  } catch (error) {
    console.error(
      `Module ${moduleName} resolution failed:`,
      (error as Error).message,
    );
    return '';
  }
}

const prismaNodeModulesPath = `${getModulePath('@prisma/client')}/node_modules`;
console.log(prismaNodeModulesPath);
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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  robots: {
    disallow: ['/admin', '/oauth'],
  },
  sitemap: {
    exclude: ['/admin', '/setup'],
    sources: ['/api/__sitemap__/urls'],
    autoI18n: false,
  },
  ogImage: {
    fonts: [
      'Noto+Sans+SC:400',
    ],
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
    enabled: false,
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
      ENABLE_GITHUB_OAUTH: JSON.parse(JSON.stringify(env.ENABLE_GITHUB_OAUTH ?? false)),
      ENABLE_GOOGLE_OAUTH: JSON.parse(JSON.stringify(env.ENABLE_GOOGLE_OAUTH ?? false)),
    },
    resolve: {
      alias: {
        '.prisma/client/index-browser': `${prismaNodeModulesPath}/.prisma/client/index-browser.js`,
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
    lazy: true,
    defaultLocale: 'zh',
    locales: [
      {
        code: 'zh',
        name: '中文',
      },
      {
        code: 'en',
        name: 'English',
      },
    ],
    skipSettingLocaleOnNavigate: true,
    strategy: 'no_prefix',
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
