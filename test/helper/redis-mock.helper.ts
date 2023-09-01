import IORedis, { Redis } from 'ioredis'
import RedisMemoryServer from 'redis-memory-server'

import { Global, Module } from '@nestjs/common'

import { CacheService } from '~/processors/cache/cache.service'

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
  const redisServer = new RedisMemoryServer({})

  const redisHost = await redisServer.getHost()
  const redisPort = await redisServer.getPort()

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
      await redisServer.stop()
    },
  }
}

export const redisHelper = createMockRedis()
