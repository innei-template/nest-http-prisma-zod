import { prisma } from './prisma'

// eslint-disable-next-line import/no-default-export
export default async () => {
  await prisma.$transaction(
    async (ctx) => {
      await Promise.all([
        ctx.user.deleteMany(),
        ctx.post.deleteMany(),
        ctx.category.deleteMany(),
      ])
    },
    {
      maxWait: 1000,
      timeout: 3000,
    },
  )
}
