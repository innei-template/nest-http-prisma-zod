import { beforeAll } from 'vitest'

import 'zx/globals'

import consola from 'consola'

import { redisHelper } from '../helper/redis-mock.helper'

declare const global: any

beforeAll(async () => {
  await import('zx/globals')

  global.isDev = true
  global.cwd = process.cwd()
  global.consola = consola
  // await prisma.$connect()
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
