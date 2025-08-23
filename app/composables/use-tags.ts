export function useTags() {
  const { data } = useAsyncData('tags', async () => await queryCollection('tags').first());
  const tagMap = new Map();
  watch(data, () => {
    const tags = data.value?.tags ?? [];
    for (const tag of tags) {
      tagMap.set(tag.id, tag);
    }
  }, { deep: true, immediate: true });
  return { tags: computed(() => data.value?.tags), tagMap };
}
