export const useRedis = () => useStorage('redis');
export const usePostTotalNameSpace = () => 'POST-TOTAL';
export const useCategoriesNameSpace = () => `CATEGORIES::COUNT`;
export const usePostReplyNamespace = (id: number) => `POST::REPLIES::${id}`;
export const useReplyRepliesNamespace = (id:number) => `REPLY::REPLIES::${id}`;
export const useTokenNamespace = (id: string) => {
  return {
    access: `token::access::${id}`,
    refresh: `token::refresh::${id}`
  }
}
export const getPostTotal = () => {
  const redis = useRedis();
  const ns = usePostTotalNameSpace();
  return redis.getItem<number>(ns);
};

export const getCategoriesTotal = () => {
  const redis = useRedis();
  const ns = useCategoriesNameSpace();
  return redis.getItem<number>(ns);
};

export const decr = async (key: string) => {
  const redis = useRedis();
  await redis.setItem(
    key,
    (await redis.getItem<number>(key) ?? 1) - 1,
  );
};
export const incr = async (key: string) => {
  const redis = useRedis();
  await redis.setItem(
    key,
    (await redis.getItem<number>(key) ?? 0) + 1,
  );
};
