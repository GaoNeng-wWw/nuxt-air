import { z } from "zod";
import { CreateCategory } from "./index.post";
import prisma from "~/lib/prisma";
import status from "http-status";

export const PatchCateogry = CreateCategory.partial();
export const PatchCateogryParam = z.object({
  id: z.number({coerce: true})
})

export default defineApi(async (event) => {
  const {id} = await useParam(event, PatchCateogryParam);
  const {name} = await useBody(event, PatchCateogry);
  const category = await prisma.category.findFirst({
    where:{id}
  })
  if (!category){
    const t = await useTranslation(event);
    throw new HttpException(
      t('common.notFound'),
      status.NOT_FOUND
    )
  }
  const newCategory = await prisma.category.update({
    where:{id},
    data:{
      name: {
        set:name
      }
    }
  })
  return newCategory;
})