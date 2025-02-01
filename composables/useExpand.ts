export type TreeNode<T> = {
  children: TreeNode<T>[];
} & T;

export type LinearNode<T> = {
  depth: number;
  children: T[];
} & T;

export const useExpand = () => {
  const expand = <T extends object>(
    data: ({ children: TreeNode<T>[] } & T) | ({ children: TreeNode<T>[] } & T)[]
  ): LinearNode<T>[] => {
    const result: LinearNode<T>[] = [];
    
    const traverse = (node: TreeNode<T>, currentDepth: number) => {
      const { children, ...rest } = node;
      
      result.push({
        ...rest,
        children,
        depth: currentDepth,
      } as LinearNode<T>);
      
      children.forEach(child => {
        traverse(child, currentDepth + 1);
      });
    };

    if (Array.isArray(data)) {
      data.forEach(rootNode => traverse(rootNode, 0));
    } else {
      traverse(data, 0);
    }

    return result;
  };

  return { expand };
};