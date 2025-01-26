import 'vue-router';
export {}
declare global {
  interface PaginationMeta {
    totalItem:number;
    totalPages: number;
    pageSize: number;
    currentPage: number
  }
  type BreadcrumbItem = {
    link: string,
    label: string;
  }
  namespace NodeJS {
    interface ProcessEnv {
      NUXT_SESSION_PASSWORD:string;
      NUXT_JWT_PASSWORD:string;
    }
  }
}
declare module 'vue-router'{
  declare interface RouteMeta {
    auth: boolean | undefined;
    breadcrumb: boolean | undefined;
  }
}