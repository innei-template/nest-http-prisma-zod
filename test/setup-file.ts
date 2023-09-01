import { redisHelper } from './helper/redis-mock.helper'
import { prisma } from './lib/prisma'
import resetDb from './lib/reset-db'

import 'zx-cjs/globals'

import consola from 'consola'

declare const global: any

beforeAll(() => {
  global.isDev = true
  global.cwd = process.cwd()
  global.consola = consola
})

beforeEach(async () => {
  await resetDb()
})

afterAll(async () => {
  prisma.$disconnect()
  await (await redisHelper).close()
})
