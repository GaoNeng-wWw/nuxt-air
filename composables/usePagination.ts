export interface UsePaginationOptions {
  totalItems: ComputedRef<number> | Ref<number> | number;
  totalPages: ComputedRef<number> | Ref<number> | number;
  pageSize: ComputedRef<number> | Ref<number> | number;
  currentPage: ComputedRef<number> | Ref<number> | number;
}
export interface BasePagination {
  totalItems: Ref<number>;
  totalPages: Ref<number>;
  pageSize: Ref<number>;
  currentPage: Ref<number>;
}
export interface PaginationMethod {
  next: () => number;
  prev: () => number;
  to: (page: number) => number;
}
export function usePagination(opts: Partial<UsePaginationOptions>) {
  const {
    totalItems: _totalItems = 0,
    totalPages: _totalPages = 0,
    pageSize: _pageSize = 1,
    currentPage: _currentPage = 1,
  } = opts;
  const totalItems = ref(unref(_totalItems));
  const totalPages = ref(unref(_totalPages));
  const pageSize = ref(unref(_pageSize));
  const currentPage = ref(unref(_currentPage));

  const next = () => currentPage.value += 1;
  const prev = () => currentPage.value -= 1;
  const to = (page: number) => currentPage.value = page;

  watch(() => _totalItems, () => {
    totalItems.value = unref(_totalItems);
  }, { immediate: true });
  watch(() => _totalPages, () => {
    totalPages.value = unref(_totalPages);
  }, { immediate: true });
  watch(() => _pageSize, () => {
    pageSize.value = unref(_pageSize);
  }, { immediate: true });
  watch(() => _currentPage, () => {
    currentPage.value = unref(_currentPage);
  }, { immediate: true });

  return { totalItems, totalPages, pageSize, currentPage, next, prev, to };
}
