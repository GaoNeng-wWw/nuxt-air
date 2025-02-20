export const useRedis = () => useStorage('redis');
export const usePostTotalNameSpace = () => 'POST-TOTAL';
export const useDraftTotalNameSpace = () => 'DRAFT-TOTAL';
export const useCategoriesNameSpace = () => `CATEGORIES::COUNT`;
export const SITE_OWNER_NAMESPACE = `SITE::OWNER`;
export const usePostReplyNamespace = (id: number) => `POST::REPLIES::${id}`;
export const useReplyRepliesNamespace = (id: number) => `REPLY::REPLIES::${id}`;
export const useOSSRecord = (fileName: string) => `OSS::RECORD::${fileName}`;
export function useTokenNamespace(id: string) {
  return {
    access: `token::access::${id}`,
    refresh: `token::refresh::${id}`,
  };
}

export function getDraftTotal() {
  const redis = useRedis();
  const ns = useDraftTotalNameSpace();
  return redis.getItem<number>(ns);
}

export function getPostTotal() {
  const redis = useRedis();
  const ns = usePostTotalNameSpace();
  return redis.getItem<number>(ns);
}

export function getCategoriesTotal() {
  const redis = useRedis();
  const ns = useCategoriesNameSpace();
  return redis.getItem<number>(ns);
}

export async function decr(key: string) {
  const redis = useRedis();
  await redis.setItem(
    key,
    (await redis.getItem<number>(key) ?? 1) - 1,
  );
}
export async function incr(key: string) {
  const redis = useRedis();
  await redis.setItem(
    key,
    (await redis.getItem<number>(key) ?? 0) + 1,
  );
}
export function findFile(name: string) {
  const key = useOSSRecord(name);
  const redis = useRedis();
  return redis.getItem<string>(key);
}
export function recordFile(name: string, url: string) {
  const key = useOSSRecord(name);
  const redis = useRedis();
  return redis.setItem<string>(key, url);
}
