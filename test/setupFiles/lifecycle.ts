import consola from 'consola'

import { redisHelper } from '../helper/redis-mock.helper'

declare const global: any

beforeAll(async () => {
  global.isDev = true
  global.cwd = process.cwd()
  global.consola = consola
})

afterAll(async () => {
  await (await redisHelper).close()

  // await prisma.$disconnect()
})

beforeAll(async () => {
  await redisHelper
})

beforeEach(() => {
  global.isDev = true
  global.cwd = process.cwd()
  global.consola = consola
})
