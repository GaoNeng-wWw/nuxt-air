import type { JSONContent } from '@tiptap/vue-3';

export function walkProseMirrorTree(val: JSONContent, callback: (node: JSONContent) => boolean | undefined) {
  if (val.content === undefined) {
    return;
  }
  for (const content of val.content) {
    if (callback(content) === false) {
      return;
    }
    walkProseMirrorTree(content, callback);
  }
}

export function findNode(targetType: string, root: JSONContent | null): JSONContent | null {
  if (!root) {
    return null;
  }
  if (root.type === targetType) {
    return root;
  }
  if (root.content === undefined) {
    return null;
  }
  for (const child of root.content ?? []) {
    const node = findNode(targetType, child);
    if (node) {
      return node;
    }
  }
  return null;
}
