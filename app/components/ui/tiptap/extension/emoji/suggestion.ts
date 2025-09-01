import type { ClientRectObject, VirtualElement } from '@floating-ui/dom';
import type { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { VueRenderer } from '@tiptap/vue-3';
import View from './view.vue';

export default {
  items(props) {
    const editor = props.editor;
    const query = props.query;
    return editor.storage.emoji.emojis.filter((item) => {
      const { shortcodes, tags } = item;
      return (
        shortcodes.find(code => code.startsWith(query.toLocaleLowerCase()))
        || tags.find(tag => tag.startsWith(query.toLowerCase()))
      );
    });
  },
  render() {
    let component: VueRenderer | null = null;
    const layoutComponent = (props: SuggestionProps<any, any>) => {
      if (!component || !component.element || !props.clientRect) {
        return;
      }
      const { clientRect } = props;
      const rect = clientRect();
      if (!rect) {
        return;
      }
      const virtualElement: VirtualElement = {
        getBoundingClientRect(): ClientRectObject {
          return rect;
        },
      };
      computePosition(virtualElement, component.element as HTMLElement, {
        middleware: [
          shift(),
          flip({ flipAlignment: true }),
          offset(16),
        ],
      })
        .then((pos) => {
          if (!component || !component.element) {
            return;
          }
          const el = component.element as HTMLElement;
          Object.assign(el.style, {
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            position: pos.strategy,
          });
        });
    };
    return {
      onStart(props) {
        component = new VueRenderer(View, { props, editor: props.editor });
        if (!document.body) {
          return;
        }
        if (component.element) {
          document.body.appendChild(component.element);
        }
        layoutComponent(props);
      },
      onUpdate(props) {
        if (!component) {
          return;
        }
        component.updateProps(props);
        layoutComponent(props);
      },
      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          if (!component || !component.element) {
            return true;
          }
          component.element.remove();
          component.destroy();
          return true;
        }
        if (!component) {
          return true;
        }
        return component.ref?.onKeyDown(props.event);
      },
      onExit(_props) {
        if (!component) {
          return;
        }
        component.el?.remove();
        component.destroy();
        component = null;
      },
    };
  },
} as SuggestionOptions;
