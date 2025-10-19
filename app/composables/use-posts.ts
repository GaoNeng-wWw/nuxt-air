import type { PostCollectionItem } from '@nuxt/content';
import { useThrottleFn } from '@vueuse/core';
import { canLoad } from '~/lib/can-load';
import { DEFAULT_PAGE_SIZE } from '~/lib/constants';

export interface UsePosts {
  tag?: MaybeRefOrGetter<string | undefined>;
  total?: MaybeRefOrGetter<number | null>;
}

export function usePostTotal(tag?: MaybeRefOrGetter<string>) {
  const total: Ref<number | null> = ref(null);
  const loading = ref(true);
  watchEffect(() => {
    const handle = queryCollection('post');
    if (toValue(tag)) {
      handle.where('tags', 'LIKE', `%${toValue(tag)}%`);
    }
    handle.count('*')
      .then((value) => {
        total.value = value;
      })
      .finally(() => {
        loading.value = false;
      });
  });
  return { total, totalLoading: loading };
}

export function usePosts(
  props: UsePosts,
) {
  const activeTag = computed(() => {
    return toValue(props.tag ?? '');
  });
  const total = computed(() => {
    return toValue(props.total) ?? 0;
  });
  const page = ref(0);
  const data: Ref<PostCollectionItem[]> = ref([]);
  const loading = ref(false);
  const hiddenLoadMore = ref(false);
  const showLoading = computed(() => canLoad({ page, size: DEFAULT_PAGE_SIZE, total }) && loading.value);
  const onLoadMore = () => {
    if (!canLoad({ page: toValue(page) + 1, size: DEFAULT_PAGE_SIZE, total }) || loading.value) {
      hiddenLoadMore.value = true;
      return;
    }
    loading.value = true;
    page.value += 1;
  };
  const scope = effectScope();
  scope.run(() => {
    watch(activeTag, (value, oldValue) => {
      if (value !== oldValue) {
        page.value = 0;
        data.value = [];
      };
    });
    watchEffect(() => {
      loading.value = true;
      const handle = queryCollection('post');
      handle.skip(
        ((page.value - 1) * DEFAULT_PAGE_SIZE),
      )
        .limit(DEFAULT_PAGE_SIZE);
      if (activeTag.value) {
        handle.where(
          'tags',
          'LIKE',
          `%${activeTag.value}%`,
        );
      }
      handle
        .order('date', 'DESC')
        .all()
        .then((posts) => {
          data.value = [...data.value, ...posts];
        })
        .finally(() => {
          loading.value = false;
        });
    });
  });
  onUnmounted(() => {
    scope.stop();
  });
  return { data, onLoadMore, showLoading, hiddenLoadMore};
}
