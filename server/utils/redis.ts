export const useRedis = () => useStorage('redis');
export const usePostTotalNameSpace = () => 'POST-TOTAL';
export const useCategoriesNameSpace = () => `CATEGORIES::COUNT`;
export const getPostTotal = () => {
  const redis = useRedis();
  const ns = usePostTotalNameSpace();
  return redis.get<number>(ns);
};

export const getCategoriesTotal = () => {
  const redis = useRedis();
  const ns = useCategoriesNameSpace();
  return redis.get<number>(ns);
};

export const decr = async (key: string) => {
  const redis = useRedis();
  await redis.set(
    key,
    (await redis.getItem<number>(key) ?? 1) - 1,
  );
};
export const incr = async (key: string) => {
  const redis = useRedis();
  await redis.set(
    key,
    (await redis.getItem<number>(key) ?? 0) + 1,
  );
};
