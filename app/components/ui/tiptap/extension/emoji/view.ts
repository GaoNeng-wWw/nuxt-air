export interface Item {
  name: string;
  emoji: unknown;
  fallbackImage: string;
}
export interface ViewProps {
  items: Item[];
  command: (item: Item) => void;
}
