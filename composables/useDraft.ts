export interface UseDraft {
  page: MaybeRef<number>;
  size: MaybeRef<number>;
}
export function useDraft(opts: Partial<UseDraft>) {
  const { page: _page, size: _size } = opts;
  const page = ref(_page);
  const size = ref(_size);
  const { data, status } = useFetch(
    '/api/post',
    {
      query: {
        page,
        size,
        publish: false,
      },
    },
  );
  const totalItems = computed(() => data.value?.meta.totalItems ?? 0);
  return { data, status, totalItems, page, size };
}
