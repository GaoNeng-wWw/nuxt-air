import { createMarkdownParser, createShikiHighlighter, rehypeHighlight } from '@nuxtjs/mdc/runtime';
import MaterialThemeLight from 'shiki/themes/material-theme-ocean.mjs';

export async function useMarkdownParser() {
  let parser: Awaited<ReturnType<typeof createMarkdownParser>>;
  const parse = async (markdown: string) => {
    if (parser) {
      return parser(markdown);
    }
    parser = await createMarkdownParser({
      remark: {
        plugins: {
          highlight: {
            instance: rehypeHighlight,
            options: {
              theme: 'material-theme-palenight',
              highlighter: createShikiHighlighter({
                bundledThemes: {
                  'material-theme-palenight': MaterialThemeLight,
                },
                bundledLangs: {
                  javascript: await import('shiki/langs/javascript.mjs'),
                },
              }),
            },
          },
        },
      },
    });
    return parser(markdown);
  };
  return parse;
}
