import { siteInfoKey } from './index.post';

export default defineApi(async () => {
  const redis = useRedis();
  return await redis.getItem<PublicSiteInfo>(siteInfoKey) ?? null;
});
