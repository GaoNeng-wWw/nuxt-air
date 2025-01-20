import type {SerializeObject} from 'nitropack';

export type CreatePost = {
  title: string;
  content: string;
  pin?: boolean;
  categories?: number[]
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
export type UsePostsOptions = {
  page?: MaybeRef<number>,
  type?: MaybeRef<'page' | 'scroll'>,
  immediate?: MaybeRef<boolean>
}
export const usePosts = (
  {page:_page=1, type:_type='page', immediate = true}: UsePostsOptions
) => {
  const page = ref(_page);
  const type = ref(_type);
  const {data, status, error} = useFetch(
    '/api/post',
    {
      method: 'get',
      server: false,
      query: ref({page}),
      watch: [page],
      immediate: unref(immediate)
    })
  const posts:Ref<SerializeObject<Post>[]> = ref([]);
  const meta = computed(() => data.value?.meta || null);
  const loadMore = () => {
    page.value += 1;
  }
  const canLoadMore = () => {
    if (!meta.value){
      return false;
    }
    return meta.value.totalPages > page.value && status.value !== 'error';
  }
  const remove = (id: number) => {
    $fetch(`/api/post/${id}`, {method: 'delete'})
    .then(()=>{
      posts.value = posts.value.filter(post => post.id !== id)
    })
  };
  const add = (data: CreatePost) => {
    return $fetch('/api/post',{
      method: 'POST',
      body: data
    })
  }
  watch(data, ()=>{
    if (type.value === 'page'){
      posts.value = data.value?.data ?? [];
      return;
    }
    if (page.value === 1 && posts.value.length > 0){
      posts.value = data.value?.data ?? [];
      return;
    }
    posts.value.push(...(data.value?.data ?? []));
  }, {immediate: true})
  return {posts,meta,status,error, remove, add, loadMore, canLoadMore}
}