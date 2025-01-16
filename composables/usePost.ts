import { useLoading } from "./useLoading";
import type { Post } from "./usePosts";

export const usePost = () => {
  const {loading, setLoading} = useLoading();
  const removePost = (id: MaybeRef<number>) => {
    setLoading(true)
    return $fetch(`/api/post/${id}`, {method: 'delete'})
    .finally(()=>setLoading(false))
  }
  const updatePost = (
    id: MaybeRef<number>,
    post: Partial<Omit<Post, 'id' | 'createAt' | 'updateAt' | 'categories'> & {categories: number[]}>
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
          categories: post.categories
        }
      }
    )
    .finally(()=>{
      setLoading(false)
    })
  }
  const fetch = (id: MaybeRef<number>) => {
    setLoading(true);
    return $fetch(`/api/post/${id}`, {method: 'get'})
    .finally(()=>setLoading(false));
  }
  return {updatePost, removePost, fetch, loading}
}