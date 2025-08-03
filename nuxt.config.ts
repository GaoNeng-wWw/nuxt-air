// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/theme.css'],
  modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/image', '@unocss/nuxt', '@prisma/nuxt'],
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
});
