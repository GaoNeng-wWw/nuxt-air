export const useRedis = () => useStorage('redis')
export const usePostTotalNameSpace = () => 'POST-TOTAL'
export const getPostTotal = () => {
  const redis = useRedis()
  const ns = usePostTotalNameSpace()
  return redis.getItem<number>(ns)
}
