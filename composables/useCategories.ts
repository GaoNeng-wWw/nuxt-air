import type { SerializeObject } from 'nitropack';
export interface UseCategoriesOpts {
  page: number | Ref<number>
}
export type Category = {
  id: number;
  name: string;
}
export const useCategories = (
  {page:_page=1}:UseCategoriesOpts
) => {
  const page = ref(_page)
  const {data, status, error} = useFetch('/api/categories', {query: {page}, method: 'get', server: false});
  const categories:Ref<SerializeObject<Category>[]> = ref([]);
  const meta = computed(() => data.value?.meta ?? null);
  const {loading,setLoading} = useLoading({initializeValue: false});
  const loadMore = () => {
    page.value += 1;
  }
  const canLoadMore = () => {
    if (!meta.value){
      return false;
    }
    return meta.value.totalPages > page.value;
  }
  const addCategory = (category: Omit<Category,'id'> | string) => {
    setLoading(true)
    const _category = typeof category === 'string' ? {name: category} : category;
    const handle = $fetch('/api/categories', {method: 'post', body: {..._category}});
    handle.finally(() => setLoading(false));
    return handle;
  }
  const remove = (id: MaybeRef<number>) => {
    setLoading(true)
    const handle = $fetch(`/api/categories/${unref(id)}`, {method: 'delete'});
    handle.finally(()=>{
      setLoading(false);
    })
    return handle;
  }
  const patch = (id:MaybeRef<number>, name?: MaybeRef<string>) => {
    setLoading(true)
    if (name === undefined){
      return;
    }
    const patchHandle = $fetch(
      `/api/categories/${unref(id)}`,
      {
        method: 'patch',
        body:{
          name
        }
      }
    )
    return patchHandle;
  }
  watch(data, ()=>{
    if (status.value === 'error'){
      return;
    }
    categories.value = data.value?.categories ?? [];
  })
  watch(()=>_page, () => {
    page.value = unref(_page);
  }, {deep: true});
  return {data,status,error, page, meta, loadMore, canLoadMore,addCategory,remove,patch,categories,loading}
}