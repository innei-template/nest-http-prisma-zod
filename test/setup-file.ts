import { redisHelper } from './helper/redis-mock.helper'
import resetDb from './lib/reset-db'

beforeAll(() => {})

beforeEach(async () => {
  await resetDb()
})

afterAll(async () => {
  // prisma.$disconnect()
  await (await redisHelper).close()
})
