import type {SerializeObject} from 'nitropack';

export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  pin: boolean;
  createAt: Date;
  updateAt: Date;
  categories: Category[]
}

export const usePosts = () => {
  const {data, status, error} = useFetch('/api/post', {method: 'get', server: false})
  const posts:Ref<SerializeObject<Post>[]> = ref([]);
  const meta = computed(() => data.value?.meta || null);
  const remove = (id: number) => {
    $fetch(`/api/post/${id}`, {method: 'delete'})
    .then(()=>{
      posts.value = posts.value.filter(post => post.id !== id)
    })
  };
  watch(data, ()=>{
    posts.value = data.value?.data ?? [];
  }, {immediate: true})
  return {posts,meta,status,error, remove}
}