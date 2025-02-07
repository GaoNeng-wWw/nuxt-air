import status from 'http-status';
import prisma from '~/lib/prisma';

export default defineApi(async (event) => {
  const { user } = await getUserSession(event);
  const t = await useTranslation(event);
  if (!user) {
    throw new HttpException(t('common.unauth'), status.UNAUTHORIZED);
  }
  const profile = await prisma.user.findFirst({
    where: {
      oauth: {
        openid: user.id,
        provider: user.provider,
      },
    },
    select: {
      name: true,
      id: true,
      avatar: true,
      owner: true,
    },
  });
  if (!profile) {
    await clearUserSession(event);
    throw new HttpException(t('common.auth_expire'), status.UNAUTHORIZED);
  }
  return profile;
});
