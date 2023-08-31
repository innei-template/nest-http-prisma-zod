import { createExtendedPrismaClient } from '~/processors/database/prisma.instance'

export const prisma = createExtendedPrismaClient({
  url: process.env.DATABASE_URL,
})
