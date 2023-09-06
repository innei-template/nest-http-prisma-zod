import { Cache } from 'cache-manager'
import { Redis } from 'ioredis'

import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'

// Cache 客户端管理器

// 获取器
export type TCacheKey = string
export type TCacheResult<T> = Promise<T | undefined>

/**
 * @class CacheService
 * @classdesc 承载缓存服务
 * @example CacheService.get(CacheKey).then()
 * @example CacheService.set(CacheKey).then()
 */
@Injectable()
export class CacheService {
  private cache!: Cache
  private logger = new Logger(CacheService.name)

  constructor(@Inject(CACHE_MANAGER) cache: Cache) {
    this.cache = cache
    this.redisClient.on('ready', () => {
      this.logger.log('Redis is ready!')
    })
  }

  private get redisClient(): Redis {
    // @ts-expect-error
    return this.cache.store.getClient()
  }

  public get<T>(key: TCacheKey): TCacheResult<T> {
    return this.cache.get(key)
  }

  public set(key: TCacheKey, value: any, ttl?: number | undefined) {
    return this.cache.set(key, value, ttl || 0)
  }

  public getClient() {
    return this.redisClient
  }
}
