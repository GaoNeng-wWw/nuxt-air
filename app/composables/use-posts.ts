import type { PostCollectionItem } from '@nuxt/content';
import { useDebounceFn, useThrottleFn } from '@vueuse/core';
import { canLoad } from '~/lib/can-load';

export interface UsePosts {
  tag?: MaybeRefOrGetter<string>;
}

export async function usePosts(
  opts?: UsePosts,
) {
  const page = ref(1);
  const size = ref(10);
  const total = ref(await queryCollection('post').count('*'));
  const posts: Ref<PostCollectionItem[]> = ref([]);
  const data = computed(() => posts.value);
  const loading = ref(false);
  const fullLoaded = computed(() => posts.value.length === total.value);
  const showLoading = computed(() => loading.value && !fullLoaded.value);
  const fetchTotal = (tag?: string) => {
    const handle = queryCollection('post');
    if (tag) {
      handle.where('tags', 'LIKE', `%${tag}%`);
    }
    handle.count('*')
      .then((count) => {
        total.value = count;
      });
  };
  const fetch = (tag?: string) => {
    loading.value = true;
    let handle = queryCollection('post')
      .limit(size.value)
      .skip((page.value - 1) * size.value)
      .order('date', 'DESC');
    if (tag) {
      handle = handle.where('tags', 'LIKE', `%${tag}%`);
    }
    handle
      .all()
      .then((newPosts) => {
        posts.value = [...posts.value, ...newPosts];
        return posts;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const canLoadMore = () => {
    return canLoad({ page, size, total });
  };
  const loadMore = useThrottleFn(() => {
    if (total.value === 0) {
      page.value += 1;
      return;
    }
    page.value += 1;
  }, 200);
  fetch(
    toValue(opts?.tag),
  );
  fetchTotal(toValue(opts?.tag));
  watch(
    () => opts?.tag,
    () => {
      if (opts?.tag) {
        page.value = 0;
        posts.value = [];
      }
    },
    { deep: true },
  );
  watch(page, () => {
    fetch(
      toValue(opts?.tag),
    );
  });
  return {
    data,
    loading,
    showLoading,
    canLoadMore,
    loadMore,
  };
}
