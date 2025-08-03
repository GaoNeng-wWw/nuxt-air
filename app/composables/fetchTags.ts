import { DEFAULT_PAGE_SIZE } from '~/lib/constants';

export interface FetcherQuery {
  page?: MaybeRef<number>;
  size?: MaybeRef<number>;
}
export function fetchTags(
  query?: FetcherQuery,
) {
  return useFetch('/api/tag', {
    method: 'get',
    query: {
      page: toValue(query?.page) ?? 1,
      size: toValue(query?.size) ?? DEFAULT_PAGE_SIZE,
    },
  });
}
