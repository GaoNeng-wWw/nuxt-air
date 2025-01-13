import { VueRenderer } from '@tiptap/vue-3';
import type {Range,Editor} from '@tiptap/vue-3';
import tippy, { type GetReferenceClientRect, type Instance, type Props } from 'tippy.js'
import CommandsList from '../componentts/drop-menu.vue'
import { createSuggestion } from '../utils/suggestion-factory';


export type PopupMenuItem = {
  title: string;
  command: ({editor,range}: {editor: Editor, range:Range})=>void
}

export default createSuggestion({
  items: ({ query }: {query: string}) => {
    return [
      {
        title: 'Heading 1',
        command: ({ editor, range }:{editor: Editor, range:Range}) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 1 })
            .run()
        },
      },
    ]
    .filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
  },

  render: () => {
    let component:VueRenderer;
    let popup:Instance<Props>[];

    return {
      onStart: (props) => {
        component = new VueRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect || !component.element) {
          return
        }
        popup = tippy(
          'body', {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
})