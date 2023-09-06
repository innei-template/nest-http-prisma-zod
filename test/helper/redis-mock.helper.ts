import IORedis, { Redis } from 'ioredis'

import { CacheService } from '@core/processors/cache/cache.service'
import { Global, Module } from '@nestjs/common'

export class MockCacheService {
  private client: Redis
  constructor(port: number, host: string) {
    this.client = new IORedis(port, host)
  }

  private get redisClient() {
    return this.client
  }

  public get(key) {
    return this.client.get(key)
  }

  public set(key, value: any) {
    return this.client.set(key, value)
  }

  public getClient() {
    return this.redisClient
  }
}

const createMockRedis = async () => {
  let redisPort = 6379
  let redisHost = 'localhost'
  let redisServer: any
  if (process.env.CI) {
    // Skip
  } else {
    const RedisMemoryServer = require('redis-memory-server').default
    redisServer = new RedisMemoryServer({})

    redisHost = await redisServer.getHost()
    redisPort = await redisServer.getPort()
  }
  const cacheService = new MockCacheService(redisPort, redisHost)

  const provide = {
    provide: CacheService,
    useValue: cacheService,
  }
  @Module({
    providers: [provide],
    exports: [provide],
  })
  @Global()
  class CacheModule {}

  return {
    connect: () => null,
    CacheService: cacheService,
    token: CacheService,
    CacheModule,

    async close() {
      await cacheService.getClient().flushall()
      await cacheService.getClient().quit()
      if (!process.env.CI) {
        await redisServer?.stop()
      }
    },
  }
}

export const redisHelper = createMockRedis()
