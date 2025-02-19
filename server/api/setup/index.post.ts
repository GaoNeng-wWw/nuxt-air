import status from 'http-status';
import prisma from '~/lib/prisma';
import { CreateSiteInfo, siteInfoKey } from '../site-info/index.post';
import { SITE_LOCK_KEY } from './index.get';

export default defineApi(async (event) => {
  const siteInfo = await useBody(event, CreateSiteInfo);
  const redis = useRedis();
  const lock = await redis.getItem(SITE_LOCK_KEY);
  const t = await useTranslation(event);
  if (lock) {
    throw new HttpException(t('common.badRequest.duplicateInstallation'), status.BAD_REQUEST);
  }
  const { user } = await getUserSession(event);
  if (!user) {
    throw new HttpException(t('common.unauth'), status.UNAUTHORIZED);
  }
  const { id, ...rest } = user;
  const dbUser = await prisma.user.findFirst({
    where: {
      oauth: {
        openid: id,
      },
    },
    select: {
      id: true,
    },
  });
  if (!dbUser) {
    throw new HttpException(t('common.userNotFound'), status.NOT_FOUND);
  }
  await prisma.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      owner: {
        set: true,
      },
    },
  });
  await redis.setItem(SITE_LOCK_KEY, true);
  await setUserSession(event, {
    user: {
      id,
      ...rest,
    },
    loggedInAt: Date.now(),
  });

  const { ownerName, ownerAvatar, ownerBio, social } = siteInfo;
  await redis.setItem(siteInfoKey, JSON.stringify({ ownerName, ownerAvatar, ownerBio, social }));
  await redis.setItem(SITE_OWNER_NAMESPACE, id);
  return true;
});
