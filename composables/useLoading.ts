export const useLoading = () => {
  const loading = ref(false);
  const setLoading = (status: boolean | Ref<boolean>) => loading.value = unref(status);
  return {loading,setLoading};
}