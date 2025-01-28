import status from "http-status";
import { z } from "zod"
import prisma from "~/lib/prisma";

export const GetCategoryMeta = z.object({
  id:z.number({coerce: true})
})

export default defineApi(async (event) => {
  const {id} = await useParam(event, GetCategoryMeta);
  const category = await prisma.category.findFirst({
    where: {
      id
    }
  })
  const t = await useTranslation(event);
  if (!category){
    throw new HttpException(t('common.notFound'), status.NOT_FOUND);
  }
  return category;
})