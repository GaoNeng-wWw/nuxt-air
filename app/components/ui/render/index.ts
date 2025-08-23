import type { VNode } from 'vue';

export function div(node: DivLayout) {
  return h(
    'div',
    {
      class: node.class,
      style: node.style,
    },
    node.children.map(render),
  );
}
export function text(node: TextLayout) {
  return h(
    'span',
    { class: node.class, style: node.style },
    node.children,
  );
}
export function listItem(node: ListItem) {
  return h(
    'li',
    {
      class: node.class,
      style: node.style,
    },
    () => node.children.map(render),
  );
}
export function list(node: ListLayout) {
  return h(
    'ul',
    { class: node.class, style: node.style },
    () => node.children.map(render),
  );
}
export function cols(node: ColsLayout) {
  return h(
    'div',
    {
      class: ['cols-2', node.class],
      style: node.style,
    },
    () => node.childrne.map(render),
  );
}
export function img(node: ImageLayout) {
  return h(
    'img',
    {
      class: node.class,
      style: node.style,
      src: node.url,
    },
  );
}

export function render(node: Layout): VNode {
  switch (node.name) {
    case 'Div':
      return div(node);
    case 'Text':
      return text(node);
    case 'ListItem':
      return listItem(node);
    case 'List':
      return list(node);
    case 'Cols':
      return cols(node);
    case 'Image':
      return img(node);
    default:
      throw new Error(`Unknown Error`);
  }
}
