import status from "http-status";
import { z } from "zod"
import prisma from "~/lib/prisma";

export const DeleteReply = z.object({
  id: z.number({coerce: true})
})

export default defineApi(async (event) => {
  const {id} = await useParam(event, DeleteReply);
  const t = await useTranslation(event);
  if (!await prisma.reply.findFirst({where:{id}})){
    throw new HttpException(t('common.notFound'), status.NOT_FOUND);
  }
  const reply = await prisma.reply.delete({
    where:{
      id
    }
  })
  return reply.id;
  // TOOD： only owner can do
})