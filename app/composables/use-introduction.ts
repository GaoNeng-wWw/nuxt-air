export function useIntroduction() {
  const { data } = useAsyncData('introduction', async () => await queryCollection('introduction').first());
  return { data };
}
