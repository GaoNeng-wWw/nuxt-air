export interface UsePaginationMetaOpts {
  total: number;
  currentPage: number;
  pageSize: number;
}
export function usePaginationMeta(opts: UsePaginationMetaOpts) {
  return {
    totalItems: opts.total,
    totalPages: Math.ceil(opts.total / opts.pageSize),
    pageSize: opts.pageSize,
    currentPage: opts.currentPage,
  };
}
