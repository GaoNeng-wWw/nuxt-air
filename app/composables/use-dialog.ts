import type { InjectionKey, VNode } from 'vue';
import { UiDialog, UiDialogContent, UiDialogDescription, UiDialogTitle } from '#components';
import { useMouse } from '@vueuse/core';
import { VisuallyHidden } from 'reka-ui';
import { render } from 'vue';

export interface DialogContext {
  show: Ref<boolean>;
  onHiddenFinish: () => void;
  transformOrigin: { x: string; y: string };
  onTriggerClick: (ev: MouseEvent) => void;
  close: () => void;
}
export const DialogKey: InjectionKey<DialogContext> = Symbol('Dialog');
export function createDialogContext(val: DialogContext) {
  provide(DialogKey, val);
}
export function useDialogContext() {
  return inject(DialogKey)!;
}
interface DialogInstance {
  dialog: VNode;
  anchor: HTMLDivElement;
}
interface RenderDialogProps {
  content: string | VNode;
  onDestory?: () => void;
  pure?: boolean;
  x?: number;
  y?: number;
}
export function useDialog() {
  const instances: DialogInstance[] = [];
  const { x, y } = useMouse({ type: 'client' });
  const removeCurrent = () => {
    const cur = instances.pop();
    if (!cur) {
      return;
    }
    nextTick(() => {
      render(null, cur.anchor);
      cur.anchor.remove();
    });
  };
  const createDialogVNode = (
    { content, onDestory, pure, x: _x, y: _y }: RenderDialogProps,
  ) => {
    const staticX = x.value;
    const staticY = y.value;
    return h(
      UiDialog,
      {
        onDestory() {
          removeCurrent();
          onDestory?.();
        },
        show: true,
      },
      () => [
        h(
          UiDialogContent,
          { x: _x ?? staticX, y: _y ?? staticY, pure },
          () => [
            h(VisuallyHidden, null, () => [h(UiDialogTitle), h(UiDialogDescription)]),
            content,
          ],
        ),
      ],
    );
  };
  let ctx = getCurrentInstance();
  const _render = ({ content, onDestory, pure, x, y }: RenderDialogProps) => {
    const vnode = createDialogVNode({ content, onDestory, pure, x, y });
    const anchor = document.createElement('div');
    anchor.style = 'position:absolute;inset:0;';
    instances.push({ dialog: vnode, anchor });
    if (!ctx) {
      ctx = getCurrentInstance();
    }
    if (!ctx) {
      throw new Error('Can not get currentInstance');
    }
    vnode.appContext = ctx?.appContext;
    render(vnode, anchor);
    document.body.appendChild(anchor);
  };
  return {
    render: _render,
    removeCurrent,
  };
}
