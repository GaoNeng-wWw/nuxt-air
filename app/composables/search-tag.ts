export interface SearchQuery {
  page?: MaybeRef<number>;
  size?: MaybeRef<number>;
  name?: MaybeRef<string>;
}
export function searchTag() {
  return (query: SearchQuery) => {
    return $fetch('/api/tag/search', {
      query,
    });
  };
}
