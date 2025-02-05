export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/oauth') || to.path.startsWith('/auth')){
    return;
  }
  const lock = useLock();
  if (lock.value){
    if (to.path.startsWith('/setup')){
      return navigateTo('/');
    }
    return;
  }
  try {
    const installed = await $fetch('/api/setup', {method: 'get'});
    lock.value = installed;
    if (installed){
      if (to.path.startsWith('/setup')){
        return navigateTo('/');
      }
      return;
    }
    if (!to.path.startsWith('/setup')){
      return navigateTo('/setup');
    }
  } catch {
    if (to.path === '/setup'){
      return;
    }
    return navigateTo('/setup')
  }
})