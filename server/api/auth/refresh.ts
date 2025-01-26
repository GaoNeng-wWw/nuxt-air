import { decode } from "@tsndr/cloudflare-worker-jwt";
import status from "http-status";
import ms from "ms";

export default defineApi(async (event) => {
  const {user} = await getUserSession(event);
  const t = await useTranslation(event);
  if (!user){
    throw new HttpException(t('common.unauth'), status.UNAUTHORIZED);
  }
  const {accessToken, refreshToken, id} = user;
  const redis = useRedis();
  const {access, refresh} = useTokenNamespace(id);
  if (!await redis.hasItem(refresh)){
    throw new HttpException(t('common.auth_expire'), status.UNAUTHORIZED)
  }
  if (await redis.getItem(refresh) !== refreshToken || await redis.getItem(access) !== accessToken){
    throw new HttpException(t('common.auth_expire'), status.UNAUTHORIZED)
  }

  const payload = decode<Payload>(accessToken).payload!;
  const tokenPair = {
    accessToken: await sign<Payload>(payload, ms('2d')),
    refreshToken: await sign({id, provider: 'github', type: 'refresh'}, ms('1d'))
  };
  await redis.setItem(access, tokenPair.accessToken);
  await redis.setItem(refresh, tokenPair.refreshToken);
  setUserSession(event, {
    user:{
      ...user,
      ...tokenPair
    },
    loggedInAt: Date.now()
  })
  return tokenPair;
})