import 'vue-router';
export {}

declare interface PaginationMeta {
  totalItem:number;
  totalPages: number;
  pageSize: number;
  currentPage: number
}
export type BreadcrumbItem = {
  link: string,
  label: string;
}
declare module 'vue-router'{
  declare interface RouteMeta {
    breadcrumb: boolean | undefined;
  }
}