import {Extension} from '@tiptap/vue-3';
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion';

export default Extension.create({
  name: 'Command',
  addOptions: ()=>{
    return {
      suggestion: {
        char: '/',
        command: ({editor,props,range}) => {
          props.command({editor, range})
        }
      } as SuggestionOptions
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        ...this.options.suggestion,
        editor: this.editor,
      })
    ]
  },
})