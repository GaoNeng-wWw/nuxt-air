import { z } from "zod";
import prisma from "~/lib/prisma";
import { useCategoriesNameSpace } from "~/server/utils/redis";

export const CreateCategory = z.object({
  name: z.string().min(1)
});

export default defineApi(async (event) => {
  const {name} = await useBody(event, CreateCategory);
  const ns = useCategoriesNameSpace();
  await incr(ns)
  return await prisma.category.create({
    data:{
      name
    }
  })
})