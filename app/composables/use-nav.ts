export interface NavState {
  activeTag: string;
  postTitle: string;
  postId: string;
}
export const NAV_STATE_KEY = 'NAV-STATE-KEY';
export function useNav() {
  const state = useState<NavState>(NAV_STATE_KEY, () => {
    const activeTag = '';
    const postTitle = '';
    const postId = '';
    return {
      activeTag,
      postTitle,
      postId,
    };
  });
  return {
    state,
  };
}
