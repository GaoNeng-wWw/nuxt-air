export const SITE_LOCK_KEY = `SITE::LOCK`;
export default defineApi(async () => {
  const redis = useRedis();
  const lock = await redis.getItem(SITE_LOCK_KEY);
  return lock !== null;
})