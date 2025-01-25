export default defineNuxtRouteMiddleware(async () => {
  const {user,fetch} = useUserSession();
  await fetch()
  if (!user.value){
    return;
  }
  const profile = useProfile();
  if (profile.value){
    return;
  }
  $fetch('/api/profile')
  .then((realProfile) => profile.value = realProfile)
  .catch();
})