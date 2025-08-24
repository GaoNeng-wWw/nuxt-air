export function useSaveScrollPosition(el: Ref<HTMLElement | null>) {
  const scrollTop = ref(0);
  const scrollLeft = ref(0);

  onActivated(() => {
    const $el = unref(el);
    if ($el) {
      $el.scrollTop = scrollTop.value;
      $el.scrollLeft = scrollLeft.value;
    }
  });

  onBeforeRouteLeave(() => {
    const $el = unref(el);
    if ($el) {
      scrollTop.value = $el.scrollTop;
      scrollLeft.value = $el.scrollLeft;
    }
  });
}
