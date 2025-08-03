import { canLoad } from '~/lib/can-load';
import { DEFAULT_PAGE_SIZE } from '~/lib/constants';

export function useTag() {
  const page = ref(1);
  const size = ref(DEFAULT_PAGE_SIZE);
  const total = ref(-1);
  const { data, status, error } = useAsyncData(`page::${unref(page)}::size::${unref(size)}`, () => fetchTags({
    page,
    size,
  }), {
    watch: [page, size],
  });
  const nextPage = () => {
    if (!canLoad({ page, size, total })) {
      return;
    }
    page.value += 1;
  };
  const prevPage = () => {
    if (page.value === 0) {
      return;
    }
    page.value -= 1;
  };

  return { data, status, error, nextPage, prevPage };
}
