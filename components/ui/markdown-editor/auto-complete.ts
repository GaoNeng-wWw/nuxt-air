import type { Completion, CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { syntaxTree } from '@codemirror/language';

const heading = ['#', '##', '###', '####', '#####', '######'].map(tag => ({ label: tag, type: 'keyword' }));

function codeBlock(): Completion {
  return {
    label: '```',
    type: 'keyword',
    apply(view, _, from, to) {
      view.dispatch(
        {
          changes: {
            from,
            to,
            insert: '```\n```',
          },
        },
      );
      view.dispatch({
        selection: {
          anchor: from + 3,
        },
      });
    },
  };
}

function unorderedList(): Completion {
  return {
    label: '-',
    type: 'keyword',
    apply: '- ',
  };
}

export function MarkdownAutoComplete(ctx: CompletionContext): CompletionResult | null {
  const tree = syntaxTree(ctx.state);
  if (ctx.view?.state.selection.main) {
    const cursor = ctx.view?.state.selection.main.head;
    const node = tree.resolve(cursor);
    if (!node) {
      return null;
    }
    if (node.name.toLocaleLowerCase().includes('code')) {
      return null;
    }
  }
  const word = ctx.matchBefore(/.*/);
  if (!word || (word.from === word.to && ctx.explicit)) {
    return null;
  }
  return {
    from: word.from,
    options: [
      ...heading,
      codeBlock(),
      unorderedList(),
    ],
  };
}
