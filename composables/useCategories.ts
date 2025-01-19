import type { SerializeObject } from 'nitropack';
export type UseCategoriesTypes = 'page' | 'scroll';
export interface UseCategoriesOpts {
  page: number | Ref<number>,
  type: UseCategoriesTypes | Ref<UseCategoriesTypes> 
}
export type Category = {
  id: number;
  name: string;
}
export const useCategories = (
  {page:_page=1, type:_types='page'}:UseCategoriesOpts
) => {
  const page = ref(_page)
  const type = ref(_types);
  const {data, status, error} = useFetch(
    '/api/categories',
    {
      query: ref({page}),
      method: 'get',
      server: false,
      watch: [page],
    });
  const categories:Ref<SerializeObject<Category>[]> = ref([]);
  const meta = computed(() => data.value?.meta || null);
  const {loading,setLoading} = useLoading({initializeValue: false});
  const loadMore = () => {
    page.value += 1;
  }
  const canLoadMore = () => {
    if (!meta.value){
      return false;
    }
    return meta.value?.totalPages > page.value && status.value !== 'pending';
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
    handle.then((removedCategory) => categories.value = categories.value.filter((category) => category.id !== removedCategory.id))
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
    if (!data.value?.meta){
      return;
    }
    if (type.value === 'page'){
      categories.value = data.value?.categories ?? [];
      return;
    }
    if (type.value === 'scroll') {
      categories.value.push(...data.value?.categories??[]);
    }
  }, {deep: true})
  watch(()=>_page, () => {
    page.value = unref(_page);
  }, {deep: true});
  return {data,status,error, page, meta, loadMore, canLoadMore,addCategory,remove,patch,categories,loading}
}