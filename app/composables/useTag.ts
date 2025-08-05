import type { Tag } from '@prisma/client';
import type { SerializeObject } from 'nitropack';
import type { CreateTagBody } from './create-tag';
import { canLoad } from '~/lib/can-load';
import { DEFAULT_PAGE_SIZE } from '~/lib/constants';

export interface UseTagOptions {
  immediate?: boolean;
}

export function useTag(
  opts: UseTagOptions,
) {
  const page = ref(1);
  const size = ref(DEFAULT_PAGE_SIZE);
  const selectedTag = ref<SerializeObject<Tag>[]>([]);
  const searchName = ref('');
  const { data, status, error, execute: executeFetchTags } = useAsyncData(`page::${unref(page)}::size::${unref(size)}`, () => fetchTags({
    page,
    size,
  }), {
    watch: [page, size],
    immediate: opts.immediate,
    server: false,
  });
  const tags = ref<SerializeObject<Tag>[]>([]);
  const total = ref(-1);
  const loading = ref(false);
  const executeCreateTag = createTag();
  const canShowShadowTag = computed(() => searchName.value && tags.value.every(t => !t.name.includes(searchName.value)));
  const selectTag = (tag: SerializeObject<Tag>) => {
    selectedTag.value = [tag];
  };
  const create = (tag: CreateTagBody) => {
    loading.value = true;
    return executeCreateTag(tag)
      .then((tag: Tag) => tag)
      .finally(() => loading.value = false);
  };
  const nextPage = () => {
    if (!canLoad({ page, size, total }) && !loading.value && !searchName.value) {
      return;
    }
    page.value += 1;
  };
  const prevPage = () => {
    if (page.value === 0) {
      return;
    }
    page.value -= 1;
  };
  const to = (p: number) => {
    page.value = p;
  };
  watch(data, () => {
    tags.value = tags.value.concat(...data.value?.tags ?? []);
    total.value = data.value?.total ?? -1;
  }, { immediate: true, deep: true });
  watch(status, () => {
    loading.value = status.value === 'pending';
  });
  return { tags, total, status, error, loading, selectedTag, searchName, canShowShadowTag, nextPage, prevPage, create, executeFetchTags, selectTag, to };
}
