export const useRedis = () => useStorage('redis');
export async function incrBy(key: string, val: number) {
  const redis = useRedis();
  const rawValue = await redis.getItem(key);
  if (!rawValue) {
    return redis.setItem(key, val);
  }
  const item = Number.parseInt(rawValue?.toString());
  if (Number.isNaN(item)) {
    throw new TypeError(`${key} should be number but found ${typeof rawValue}`);
  }
  return redis.setItem(key, item + val);
}
