export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server){
    return;
  }
  const profile = useProfile();
  $fetch('/api/profile')
  .then((realProfile) => profile.value = realProfile)
  .catch(console.log)
})