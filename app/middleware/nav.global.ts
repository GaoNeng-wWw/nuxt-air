export default defineNuxtRouteMiddleware((to) => {
  const path = to.path;
  const { state } = useNav();

  queryCollection(
    'post',
  )
    .path(path)
    .first()
    .then((item) => {
      if (!item) {
        state.value.postId = '';
        state.value.postTitle = '';
        return item;
      }
      state.value.postId = item?.id ?? '';
      state.value.postTitle = item?.title ?? '';
    });
});
