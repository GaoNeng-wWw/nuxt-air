import ms from 'ms';

export function useSiteInfo() {
  return useState('SITE-INFO', () => {
    const value = ref<PublicSiteInfo | null>(null);
    const expire = ms('1d');
    const { setItem } = useExpireLocalStorage();
    watch(value, (newValue, oldValue) => {
      if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
        return;
      }
      setItem('site-info', newValue, expire);
    });
    return value;
  });
}
