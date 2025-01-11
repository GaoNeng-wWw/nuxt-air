export interface Post {
  id: number;
  title: string;
  content: string;
  pin: boolean;
  publish: boolean;
  createAt: Date;
  updateAt: Date;
}

export const usePost = () => {
  const {data, status, error} = useFetch('/api/post', {method: 'get'})
  const posts = computed(() => data.value?.data || []);
  const meta = computed(() => data.value?.meta || null);
  return {posts,meta,status,error}
}