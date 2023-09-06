import { createExtendedPrismaClient } from '@core/processors/database/prisma.instance'

export const prisma = createExtendedPrismaClient({
  url: process.env.DATABASE_URL,
})
