import { ref } from 'vue';

interface UseUnscrollbarScroll {
  axis: 'x' | 'y';
}
export function useUnscrollbarScroll(
  { axis }: UseUnscrollbarScroll,
) {
  let curX = 0;
  let curY = 0;
  const offsetX = ref(0);
  const offsetY = ref(0);
  const getMaxWidth = (target: HTMLElement) => target.offsetWidth - (target.parentElement?.offsetWidth ?? 0);
  const getMaxHeight = (target: HTMLElement) => target.offsetHeight - (target.parentElement?.offsetHeight ?? 0);
  const setOffset = (val: number) => {
    if (axis === 'x') {
      offsetX.value = -val;
      curX = val;
    } else {
      offsetY.value = val;
      curY = val;
    }
  };
  const onWheel = (
    ev: WheelEvent,
  ) => {
    const target = ev.currentTarget as HTMLElement;
    const { deltaX, deltaY } = ev;
    const dis = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    const maxWidth = getMaxWidth(target);
    const maxHeight = getMaxHeight(target);
    const finalDis = axis === 'x' ? Math.max(Math.min(curX + dis, maxWidth), 0) : Math.max(Math.min(curY + dis, maxHeight), 0);
    setOffset(finalDis);
  };

  return { onWheel, offsetX, offsetY };
}

export const useDampingRolling = useUnscrollbarScroll;
