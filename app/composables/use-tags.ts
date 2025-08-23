export function useTags() {
  const { data } = useAsyncData('tags', async () => await queryCollection('tags').first());
  return { tags: computed(() => data.value?.tags) };
}
