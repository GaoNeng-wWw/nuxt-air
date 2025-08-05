export interface CanLoad {
  page: MaybeRef<number>;
  size: MaybeRef<number>;
  total: MaybeRef<number>;
}
export function canLoad(
  { page, size, total }: CanLoad,
) {
  return (toValue(page) * toValue(size)) <= toValue(total);
}
