import 'vue-router';

export {};

declare global {
  const DEPLOY_MODE: 'standalone' | 'vercel';
  interface PaginationMeta {
    totalItem: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
  }
  interface BreadcrumbItem {
    link: string;
    label: string;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NUXT_SESSION_PASSWORD: string;
      NUXT_JWT_PASSWORD: string;
      KV_URL: string;
      KV_REST_API_READ_ONLY_TOKEN: string;
      KV_REST_API_TOKEN: string;
      KV_REST_API_URL: string;

      BLOB_ACCESS: 'public';
      BLOB_TOKEN: string;
      BLOB_BASE: string;
      BLOB_ENV_PREFIX: string;
      BLOB_READ_WRITE_TOKEN: string;

      NUXT_DEPLOY_MODE: 'vercel' | 'standalone';
      BLOB_BASE_URL: string;

      NUXT_SEO_DESCRIPTION: string;
      NUXT_SEO_OG_DESCRIPTION: string;
    }
  }
}
declare module 'vue-router'{
  declare interface RouteMeta {
    auth: boolean | undefined;
    breadcrumb: boolean | undefined;
  }
}
