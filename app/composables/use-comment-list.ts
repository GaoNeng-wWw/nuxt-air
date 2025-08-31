import type { Comment, User } from '@prisma/client';
import type { SerializeObject } from 'nitropack/types';
import { canLoad } from '~/lib/can-load';
import { DEFAULT_PAGE_SIZE } from '~/lib/constants';

export interface UseCommenList {
  postId: string;
}
export type IComment = SerializeObject<Comment & { user: User }>;
export function useCommenList({ postId }: UseCommenList) {
  const page = ref(1);
  const size = ref(DEFAULT_PAGE_SIZE);
  const comments: Ref<IComment[]> = ref([]);
  const { data, refresh } = useFetch(`/api/comment/${postId}`, {
    query: { page, size },
  });
  const total = computed(() => data.value?.total ?? 0);
  const next = () => {
    if (!canLoad({ page, size, total })) {
      return;
    }
    page.value += 1;
  };
  const extractComment: Ref<IComment[]> = ref([]);
  const addExtract = (comment: IComment) => {
    extractComment.value.unshift(comment);
  };
  watch(data, () => {
    if (!data.value) {
      return;
    }
    comments.value.push(...data.value.comments);
  }, { immediate: true, deep: true });
  return { comments, next, refresh, extractComment, addExtract };
}
