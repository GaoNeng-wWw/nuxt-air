import type { SerializeObject, Simplify } from 'nitropack';
import ms from 'ms';

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    return;
  }
  const siteInfo = useSiteInfo();
  const { setItem, getItem, hasItem } = useExpireLocalStorage<Simplify<SerializeObject<PublicSiteInfo>>>();
  if (getItem('site-info')) {
    siteInfo.value = getItem('site-info');
    return;
  }
  if (siteInfo.value) {
    if (!hasItem('site-info')) {
      setItem('site-info', siteInfo.value, ms('1d'));
    }
    return;
  }
  $fetch('/api/site-info')
    .then((info) => {
      siteInfo.value = info;
      if (!info) {
        return;
      }
      setItem('site-info', info, ms('1d'));
    });
});
