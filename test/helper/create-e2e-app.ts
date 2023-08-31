import { ModuleMetadata } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

import { HttpCacheInterceptor } from '~/common/interceptors/cache.interceptor'
import { JSONTransformerInterceptor } from '~/common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from '~/common/interceptors/response.interceptor'

import { redisHelper } from './redis-mock.helper'
import { setupE2EApp } from './setup-e2e'

export const createE2EApp = (module: ModuleMetadata) => {
  const proxy: {
    app: NestFastifyApplication
  } = {} as any

  beforeAll(async () => {
    const { CacheService, token } = await redisHelper
    const { ...nestModule } = module
    nestModule.providers ||= []

    nestModule.providers.push(
      {
        provide: APP_INTERCEPTOR,
        useClass: HttpCacheInterceptor, // 3
      },

      {
        provide: APP_INTERCEPTOR,
        useClass: JSONTransformerInterceptor, // 2
      },

      {
        provide: APP_INTERCEPTOR,
        useClass: ResponseInterceptor, // 1
      },
    )

    nestModule.providers.push({ provide: token, useValue: CacheService })
    const app = await setupE2EApp(nestModule)

    proxy.app = app
  })

  return proxy
}
