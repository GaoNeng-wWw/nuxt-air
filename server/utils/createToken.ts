import jwt from '@tsndr/cloudflare-worker-jwt';
export const sign = <T extends Payload>(payload: T,exp: number, secret=process.env.NUXT_SESSION_PASSWORD!) => {
  return jwt.sign({
    exp,
    ...payload
  }, secret)
}
export type Payload = {
  id: string;
  provider: string;
  avatar: string;
  type: 'access' | 'refresh'
}