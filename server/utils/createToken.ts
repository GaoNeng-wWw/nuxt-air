import jwt from '@tsndr/cloudflare-worker-jwt';
export const sign = <T extends Payload>(payload: T,exp: number, secret=process.env.NUXT_JWT_PASSWORD) => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + Math.floor(Number(exp) / 1000),
    ...payload
  }, secret)
}
export type Payload = {
  id: string;
  provider: string;
  avatar?: string;
  type: 'access' | 'refresh'
}