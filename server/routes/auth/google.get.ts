import ms from "ms";
import prisma from "~/lib/prisma";

export type GoogleOAuthUserPayload = {
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
export default defineOAuthGoogleEventHandler({
  config: {
    clientId: '807761297417-1ibu6p28fc61kiqhu4raefkjgn84dtet.apps.googleusercontent.com',
    clientSecret: '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',
    redirectURL: 'http://localhost:3000/auth/google',
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    authorizationParams:{
      access_type: 'offline',
    },
    scope: ['openid', 'profile', 'email']
  },
  onSuccess: async (event, result) => {
    const {user}:{user:GoogleOAuthUserPayload} = result;
    const name = `${user.given_name} ${user.family_name}`;
    const id = useOAuthId('google', user.email);
    const oauthAccount = await prisma.oAuth.findFirst({
      where:{
        openid:id
      }
    })
    if (!oauthAccount){
      await prisma.user.create({
        data:{
          name,
          bio: '',
          avatar: user.picture,
          owner: false,
          oauth: {
            create:{
              openid: id,
              provider: 'google'
            }
          }
        }
      })
    }
    const tokenPair = {
      accessToken: await sign({id, provider: 'google', avatar: user.picture, type: 'access'}, ms('2d')),
      refreshToken: await sign({id, provider: 'google', avatar: user.picture, type: 'refresh'}, ms('1d')),
    }
    await setUserSession(event, {
      user: {
        id,
        provider: 'google',
        avatar: user.picture,
        ...tokenPair
      },
      loggedInAt: Date.now()
    })
    return sendRedirect(event, '/')
  },
  onError: (event, err) => {
    return sendRedirect(event, '/')
  }
})