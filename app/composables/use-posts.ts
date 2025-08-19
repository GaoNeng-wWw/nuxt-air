import type { Post } from '@prisma/client';
import type { SerializeObject } from 'nitropack';
import { canLoad } from '~/lib/can-load';
import { DEFAULT_PAGE_SIZE } from '~/lib/constants';

export interface UsePosts {
  immediate?: boolean;
  publish: MaybeRefOrGetter<boolean>;
}
export default function usePosts(opts: UsePosts) {
  const posts = ref<SerializeObject<Post>[]>([]);
  const total = ref(-1);
  const page = ref(1);
  const size = ref(DEFAULT_PAGE_SIZE);
  const { data, status, error, execute } = useFetch('/api/post', {
    query: {
      publish: toValue(opts.publish),
      page,
      size,
    },
    watch: [page, size],
  });
  const loadMore = () => {
    page.value += 1;
  };
  const canLoadMore = () => {
    return status.value !== 'pending' && canLoad({ page, size, total });
  };
  watch(data, () => {
    if (!data.value) {
      return;
    }
    posts.value = posts.value.concat(data.value.post);
    total.value = data.value.total;
  }, { deep: true, immediate: true });
  watch(() => opts.publish, () => {
    posts.value = [];
    page.value = 1;
    execute();
  });
  return {
    posts,
    total,
    page,
    size,
    status,
    error,
    loadMore,
    canLoadMore,
    execute,
  };
}
