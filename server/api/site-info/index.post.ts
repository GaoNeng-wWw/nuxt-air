import { z } from 'zod';

export const CreateSiteInfo = z.object({
  ownerName: z.string().min(1),
  ownerBio: z.string().min(1),
  ownerAvatar: z.string().min(1),
  social: z.array(
    z.object({
      icon: z.string(),
      url: z.string(),
    }),
  ),
});
export const siteInfoKey = 'site::info';
export default defineApi(async (event) => {
  const { ownerName, ownerAvatar, ownerBio, social } = await useBody(event, CreateSiteInfo);
  const redis = useRedis();
  await redis.setItem(siteInfoKey, JSON.stringify({ ownerName, ownerAvatar, ownerBio, social }));
  return { ownerName, ownerAvatar, ownerBio, social };
}, { guards: [AuthGuard] });
