import { siteInfoKey } from './index.post';

export default defineApi(async () => {
  const redis = useRedis();
  return JSON.parse(await redis.getItem<string>(siteInfoKey) ?? 'null');
});
