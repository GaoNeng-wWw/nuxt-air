import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { page = 1, size = 20 } = await useQuery(event, PageQuery)
  const posts = await prisma.post.findMany({
    take: size,
    skip: page - 1,
  })
  const totalPage = await getPostTotal() ?? 0
  const meta = usePaginationMeta({
    currentPage: page,
    pageSize: size,
    total: totalPage,
  })
  return {
    data: posts,
    meta,
  }
})
