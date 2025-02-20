import { z } from 'zod';
import prisma from '~/lib/prisma';

export const CreatePost = z.object({
  title: z.string(),
  content: z.string(),
  pin: z.boolean().optional().default(false),
  categories: z.array(z.number()).optional(),
  publish: z.boolean(),
});

export default defineApi(async (event) => {
  const { title, content, pin, categories = [], publish = true } = await useBody(event, CreatePost);
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
      publish,
    },
  });
  const id = publish ? usePostTotalNameSpace() : useDraftTotalNameSpace();
  await incr(id);
  return post;
}, { guards: [AuthGuard] });
