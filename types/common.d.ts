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
}
declare module 'vue-router'{
  declare interface RouteMeta {
    breadcrumb: boolean | undefined;
  }
}