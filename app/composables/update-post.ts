export interface UpdatePost {
  id: number;
  content: string;
  publish: boolean;
  tagId?: number[];
  title?: string;
}

export function updatePost() {
  return (body: UpdatePost) => {
    return $fetch(
      `/api/post/${body.id}`,
      {
        method: 'patch',
        body,
      },
    );
  };
}
