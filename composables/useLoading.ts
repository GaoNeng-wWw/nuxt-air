export type UseLoadingOptions = {
  initializeValue: boolean | ComputedRef<boolean> | Ref<boolean>
}
export const useLoading = (opts?: UseLoadingOptions) => {
  const loading = ref(opts?.initializeValue ?? false);
  const setLoading = (status: boolean | Ref<boolean>) => loading.value = unref(status);
  return {loading,setLoading};
}