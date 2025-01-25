import { parse, parseSetCookie, serialize } from 'cookie-es';
export default defineNuxtRouteMiddleware(async (to, _) => {
  if (!to.meta.auth){
    return;
  }
  const serverEvent = useRequestEvent()
  const runtimeConfig = useRuntimeConfig()
  const {clear, fetch,loggedIn} = useUserSession();
  if (!loggedIn.value){
    await fetch();
  }
  const refreshIsExpire = await $fetch('/api/auth/expire', {method: 'get', query: {type: 'refresh'}});
  if (refreshIsExpire){
    await clear()
  } else {
    const accessIsExpire = await $fetch('/api/auth/expire', {method: 'get', query: {type: 'access'}});
    if (!accessIsExpire){
      return;
    }
    useRequestFetch()(
      '/api/auth/refresh',
      {
        onResponse({ response: { headers } }) {
          if (import.meta.server && serverEvent){
            for (const setCookie of headers.getSetCookie()) {
              appendResponseHeader(serverEvent, 'Set-Cookie', setCookie);
              const {name, value} = parseSetCookie(setCookie);
              if (name === runtimeConfig.session.name){
                const cookies = parse(serverEvent.headers.get('cookie') || '');
                cookies[name] = value;
                serverEvent.headers.set('cookie', Object.entries(cookies).map(([name, value]) => serialize(name, value)).join('; '))
                if (serverEvent.node.req.headers){
                  serverEvent.node.req.headers['cookie']= serverEvent.headers.get('cookie') || '';
                }
              }
            }
          }
        }
      }
    )
    await fetch();
  }
})