import type { Component, InjectionKey, VNode } from 'vue';
import { UiDialog, UiDialogContent } from '#components';
import { render } from 'vue';

export interface DialogContext {
  show: Ref<boolean>;
  onHiddenFinish: () => void;
  transformOrigin: { x: string; y: string };
  onTriggerClick: (ev: MouseEvent) => void;
}
export const DialogKey: InjectionKey<DialogContext> = Symbol('Dialog');
export function createDialogContext(val: DialogContext) {
  provide(DialogKey, val);
}
export function useDialogContext() {
  return inject(DialogKey)!;
}
interface DialogInstance {
  dialog: Component;
  anchor: HTMLDivElement;
}
interface RenderDialogProps {
  content: string | VNode;
  onDestory?: () => void;
}
export function useDialog() {
  const instances: DialogInstance[] = [];
  const removeCurrent = () => {
    const cur = instances.pop();
    if (!cur) {
      return;
    }
    render(null, cur.anchor);
    cur.anchor.remove();
  };
  const createDialogVNode = (
    { content, onDestory }: RenderDialogProps,
  ) => {
    return h(
      UiDialog,
      {
        onDestory() {
          removeCurrent();
          onDestory?.();
        },
      },
      () => [
        h(
          UiDialogContent,
          null,
          () => content,
        ),
      ],
    );
  };
  const _render = ({ content, onDestory }: RenderDialogProps) => {
    const vnode = createDialogVNode({ content, onDestory });
    const anchor = document.createElement('div');
    anchor.style = 'position:absolute;inset:0;';
    instances.push({ dialog: vnode, anchor });
    render(vnode, anchor);
    document.body.appendChild(anchor);
  };
  return {
    render: _render,
    removeCurrent,
  };
}
