import type { Post } from './usePosts';
import { toast } from 'vue-sonner';
import { useLoading } from './useLoading';

export function usePost() {
  const { loading, setLoading } = useLoading();
  const removePost = (id: MaybeRef<number>) => {
    setLoading(true);
    return $fetch(`/api/post/${id}`, { method: 'delete' })
      .finally(() => setLoading(false))
      .catch((err) => {
        if (err.data.statusCode === 403) {
          navigateTo('/');
          toast.error(err.data.message);
        }
      });
  };
  const updatePost = (
    id: MaybeRef<number>,
    post: Partial<Omit<Post, 'id' | 'createAt' | 'updateAt' | 'categories'> & { categories: number[] }>,
  ) => {
    setLoading(true);
    return $fetch(
      `/api/post/${unref(id)}`,
      {
        method: 'PATCH',
        body: {
          title: post.title,
          pin: post.pin,
          content: post.content,
          categories: post.categories,
          publish: post.publish,
        },
      },
    )
      .catch((err) => {
        if (err.data.statusCode === 403) {
          toast.error(err.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetch = (id: MaybeRef<number>) => {
    setLoading(true);
    return $fetch(`/api/post/${id}`, { method: 'get' })
      .finally(() => setLoading(false));
  };
  return { updatePost, removePost, fetch, loading };
}
