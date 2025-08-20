export function useScrollPosition(el: Ref<HTMLElement | null>) {
  const scrollTop = ref(0);
  const scrollLeft = ref(0);
  onActivated(() => {
    if (!el.value) {
      return;
    }
    el.value.scrollTop = scrollTop.value;
    el.value.scrollLeft = scrollLeft.value;
  });
  onBeforeRouteLeave(() => {
    const $el = unref(el);
    if (!$el) {
      return;
    }
    scrollTop.value = $el.scrollTop;
    scrollLeft.value = $el.scrollLeft;
  });
}
