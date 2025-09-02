import type { VNode } from 'vue';
import { render } from 'vue';
import Command from '~/components/ui/drawer/command.vue';

export interface Instance {
  drawer: VNode;
  anchor: HTMLElement;
}

export interface RenderDrawerProps {
  content?: VNode;
  onDestory?: () => void;
}

export function useDrawer() {
  const instances: Instance[] = [];
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
  const createDrawer = (
    { content, onDestory }: RenderDrawerProps,
  ) => {
    return h(
      Command,
      {
        onDestory() {
          removeCurrent();
          onDestory?.();
        },
        show: true
      },
      () => [
        content,
      ],
    );
  };
  let ctx = getCurrentInstance();
  const _render = ({ content, onDestory }: RenderDrawerProps) => {
    const vnode = createDrawer({ content, onDestory });
    const anchor = document.createElement('div');
    anchor.style = 'position:absolute;inset:0;';
    instances.push({ drawer: vnode, anchor });
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
