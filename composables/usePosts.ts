import type { SerializeObject } from 'nitropack';
import { toast } from 'vue-sonner';

export interface CreatePost {
  title: string;
  content: string;
  pin?: boolean;
  categories?: number[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  pin: boolean;
  createAt: Date;
  updateAt: Date;
  categories: Category[];
  publish: boolean;
}
export interface UsePostsOptions {
  page?: MaybeRef<number>;
  type?: MaybeRef<'page' | 'scroll'>;
  immediate?: MaybeRef<boolean>;
  category?: MaybeRef<number | null>;
  draftOnly?: MaybeRef<boolean>;
  size?: MaybeRef<number>;
}
export function usePosts({ page: _page = 1, type: _type = 'page', immediate = true, category: _category = null, draftOnly, size: _size = 10 }: UsePostsOptions) {
  const page = ref(_page);
  const type = ref(_type);
  const category = ref(_category);
  const size = ref(_size);
  const { data, status, error } = useFetch(
    '/api/post',
    {
      method: 'get',
      server: false,
      query: ref({ page, publish: !draftOnly, size }),
      watch: [page],
      immediate: unref(immediate),
    },
  );
  const posts: Ref<SerializeObject<Post>[]> = ref([]);
  const meta = computed(() => data.value?.meta || null);
  const loadMore = () => {
    page.value += 1;
  };
  const canLoadMore = () => {
    if (!meta.value) {
      return false;
    }
    return meta.value.totalPages > page.value && status.value !== 'error';
  };
  const remove = (id: number) => {
    return $fetch(`/api/post/${id}`, { method: 'delete' })
      .then(() => {
        posts.value = posts.value.filter(post => post.id !== id);
      })
      .catch((err) => {
        if (err.data.statusCode === 403) {
          navigateTo('/');
          toast.error(err.data.message);
        }
      });
  };
  const add = (data: CreatePost, publish: boolean = false) => {
    return $fetch('/api/post', {
      method: 'POST',
      body: {
        ...data,
        publish,
      },
    })
      .catch((err) => {
        if (err.data.statusCode === 403) {
          navigateTo('/');
          toast.error(err.data.message);
        }
      });
  };
  watch(data, () => {
    if (type.value === 'page') {
      posts.value = data.value?.data ?? [];
      return;
    }
    if (page.value === 1 && posts.value.length > 0) {
      posts.value = data.value?.data ?? [];
      return;
    }
    posts.value.push(...(data.value?.data ?? []));
  }, { immediate: true });
  watch(() => _category, () => {
    category.value = _category;
  });
  return { posts, meta, status, error, remove, add, loadMore, canLoadMore };
}
