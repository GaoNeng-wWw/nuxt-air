import status from "http-status";
import prisma from "~/lib/prisma";

export const AuthGuard:Guard = async (event) => {
  const {user} = await getUserSession(event);
  const t = await useTranslation(event);
  if (!user){
    await clearUserSession(event);
    return false;
  }
  const auth = await prisma.user.findFirst({
    where:{
      oauth: {
        openid: user.id
      }
    },
    select: {
      owner: true
    }
  })
  if (!auth){
    await clearUserSession(event);
    return false;
  }
  if (!auth.owner){
    throw new HttpException(t('common.permissionDenied'), status.FORBIDDEN);
  }
  return true;
}