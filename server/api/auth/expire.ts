import { verify } from "@tsndr/cloudflare-worker-jwt";
import status from "http-status";
import { z } from "zod";

export const ExpireCheckType = z.object({
  type: z.enum(['access', 'refresh']).default('access')
})

enum Reason {
  INVALID_SIGNATURE = 1,
  NOT_YET_VALID = 2,
  EXPIRED = 4,
}

const safeVerify = async (token: string, secret:string) => {
  try {
    await verify(token, secret, {throwError: true})
    return -1;
  } catch (e) {
    const err = e as Error;
    if (err.message === 'INVALID_SIGNATURE'){
      return Reason.INVALID_SIGNATURE
    }
    if (err.message === 'NOT_YET_VALID'){
      return Reason.NOT_YET_VALID
    }
    if (err.message === 'EXPIRED'){
      return Reason.EXPIRED;
    }
  }
  return -2;
}


export default defineApi(async (event)=>{
  const {user} = await getUserSession(event);
  const {type} = await useQuery(event, ExpireCheckType);
  const t = await useTranslation(event);
  if (!user){
    throw new HttpException(t('common.unauth'), status.UNAUTHORIZED);
  }
  const secrect = process.env.NUXT_JWT_PASSWORD
  if (
    type === 'access' && !user.accessToken || 
    type === 'access' && await safeVerify(user.accessToken,secrect) === Reason.EXPIRED
  ) {
    return true;
  }
  if (
    type === 'refresh' && !user.refreshToken ||
    type === 'refresh' && await safeVerify(user.refreshToken,secrect) === Reason.EXPIRED
  ) {
    return true;
  }
})