export type UsePaginationMetaOpts = {
  total: number
  currentPage: number
  pageSize: number
}
export const usePaginationMeta = (opts: UsePaginationMetaOpts) => {
  return {
    totalItems: opts.total,
    totalPages: Math.ceil(opts.total / opts.pageSize),
    pageSize: opts.pageSize,
    currentPage: opts.currentPage,
  }
}
