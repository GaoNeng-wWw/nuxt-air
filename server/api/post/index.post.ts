import { z } from 'zod';
import prisma from '~/lib/prisma';

export const CreatePost = z.object({
  title: z.string(),
  content: z.string(),
  pin: z.boolean().optional().default(false),
  categories: z.array(z.number()).optional(),
});

export default defineApi(async (event) => {
  const { title, content, pin, categories=[] } = await useBody(event, CreatePost);
  const categoryDatas = await prisma.category.findMany({
    where: {
      id: {
        in: categories,
      },
    },
  });
  const post = await prisma.post.create({
    data: {
      title,
      content,
      pin,
      categories: {
        connect: categoryDatas,
      },
      publish: true,
    },
  });
  const id = usePostTotalNameSpace();
  await incr(id);
  return post;
},{guards: [AuthGuard]});
