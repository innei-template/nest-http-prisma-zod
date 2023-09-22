import { AllExceptionsFilter } from '@core/common/filters/all-exception.filter'
import { JSONTransformerInterceptor } from '@core/common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from '@core/common/interceptors/response.interceptor'
import { AuthModule } from '@core/modules/auth/auth.module'
import { UserModule } from '@core/modules/user/user.module'
import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { MockedHelperModule } from '@test/mock/helper/helper.module'
import { MockedDatabaseModule } from '@test/mock/processors/database/database.module'

import { redisHelper } from './redis-mock.helper'
import { setupE2EApp } from './setup-e2e'

export const createE2EApp = (module: ModuleMetadata) => {
  const proxy: {
    app: NestFastifyApplication
  } = {} as any

  beforeAll(async () => {
    const { CacheService, token, CacheModule } = await redisHelper
    const { ...nestModule } = module
    nestModule.imports ||= []
    nestModule.imports.push(
      MockedDatabaseModule,

      ConfigModule.forRoot({
        isGlobal: true,
      }),
      CacheModule,
      MockedHelperModule,
      AuthModule,
      UserModule,
    )
    nestModule.providers ||= []

    nestModule.providers.push(
      {
        provide: APP_INTERCEPTOR,
        useClass: JSONTransformerInterceptor, // 2
      },

      {
        provide: APP_INTERCEPTOR,
        useClass: ResponseInterceptor, // 1
      },
      {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
      },
    )

    nestModule.providers.push({ provide: token, useValue: CacheService })
    const app = await setupE2EApp(nestModule)

    proxy.app = app
  })

  return proxy
}
