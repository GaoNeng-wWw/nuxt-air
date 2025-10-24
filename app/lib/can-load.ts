export interface CanLoad {
  page: MaybeRef<number> | ComputedRef<number>;
  size: MaybeRef<number> | ComputedRef<number>;
  total: MaybeRefOrGetter<number> | ComputedRef<number>;
}
export function canLoad(
  { page, size, total }: CanLoad,
) {
  return (toValue(page) * toValue(size)) <= toValue(total);
}
