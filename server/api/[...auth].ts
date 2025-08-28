import { auth } from '#shared/auth';

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
