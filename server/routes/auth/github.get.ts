import prisma from "~/lib/prisma"
import { useOAuthId } from "../../utils/oauth-id"
import ms from "ms";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
    clientId: 'Ov23liPL9rcoGb1qKDwK',
    clientSecret: 'a25bfb1b0867ba8d8e5c19fc97da56d2d0b403f8',
  },
  async onSuccess(event, result) {
    const OAuthId = useOAuthId('github', result.user.id);
    const oauth = await prisma.oAuth.findFirst({
      where:{
        openid: OAuthId,
        provider: 'github'
      }
    })
    if(!oauth){
      await prisma.user.create({
        data:{
          name: result.user.name,
          bio: result.user.bio,
          owner:false,
          avatar: result.user.avatar_url,
          oauth:{
            create:{
              openid: OAuthId,
              provider: 'github'
            }
          }
        }
      })
    }
    const tokenPair = {
      accessToken: await sign({id:OAuthId,provider: 'github', avatar:result.user.avatar_url, type: 'access'}, ms('5s')),
      refreshToken: await sign({id:OAuthId,provider: 'github', type: 'refresh'}, ms('1d')),
    }
    const redis = useRedis();
    await setUserSession(event, {
      user: {
        id: OAuthId,
        provider: 'github',
        avatar: result.user.avatar_url,
        owner: await redis.getItem('site::owner') === OAuthId,
        ...tokenPair
      },
      loggedInAt: Date.now()
    }, {
      maxAge: ms('1d') / 1000
    })
    const {access, refresh} = useTokenNamespace(OAuthId);
    await redis.setItem(access, tokenPair.accessToken);
    await redis.setItem(refresh, tokenPair.refreshToken);
    return sendRedirect(event, '/oauth/redirect')
  },
  onError(event,err){
    console.log(err)
    return sendRedirect(event, '/')
  }
})