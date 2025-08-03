export interface CreateTagBody {
  name: string;
  desc: string;
}
export function createTag() {
  return (body: CreateTagBody) => {
    return $fetch('/api/tag', {
      method: 'delete',
      body,
    });
  };
}
