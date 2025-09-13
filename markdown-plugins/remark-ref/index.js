import { visit } from 'unist-util-visit';
/**
 * Syntax: [[@id]]
 * HTML: <a href="#ref"><sup>number-id</sup></a>
 */

const pattern = /\[\[@(.*)\]\]/g;
export default function () {
  return (ast, file) => {
    const frontmatter = file.data;
    const paper = frontmatter.references;
    if (!paper) {
      return;
    }
    const map = new Map();
    for (let i = 0; i < paper.length; i++) {
      map.set(paper[i].id, i + 1);
    }
    visit(ast, 'text', (node) => {
      let value = node.value;
      if (pattern.test(value)) {
        value = value.replace(pattern, (val) => {
          const id = val.replace(/\[\[/, '').replace('@', '').replace(/\]\]/, '').toString();
          return `<a href="#references"><sup>${map.get(id.trim())}</sup></a>`;
        });
      }
      if (value !== node.value) {
        Object.assign(node, { type: 'html', value });
      }
    });
  };
}