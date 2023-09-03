import { ModuleMetadata } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'

import { fastifyApp } from '~/common/adapter/fastify.adapter'
import { JSONTransformerInterceptor } from '~/common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from '~/common/interceptors/response.interceptor'
import { ZodValidationPipe } from '~/common/pipes/zod-validation.pipe'
import { LoggerModule } from '~/processors/logger/logger.module'
import { MyLogger } from '~/processors/logger/logger.service'

const interceptorProviders = [JSONTransformerInterceptor, ResponseInterceptor]
export const setupE2EApp = async (module: ModuleMetadata) => {
  const nextModule: ModuleMetadata = {
    exports: module.exports || [],
    imports: module.imports || [],
    providers: module.providers || [],
    controllers: module.controllers || [],
  }

  nextModule.imports.unshift(LoggerModule)
  nextModule.providers.unshift({
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  })
  nextModule.providers.unshift(
    ...interceptorProviders.map((interceptor) => ({
      provide: APP_INTERCEPTOR,
      useClass: interceptor,
    })),
  )
  const testingModule = await Test.createTestingModule(nextModule).compile()

  const app = testingModule.createNestApplication<NestFastifyApplication>(
    fastifyApp,
    { logger: ['log', 'warn', 'error', 'debug'] },
  )

  await app.init()
  app.useLogger(app.get(MyLogger))
  await app.getHttpAdapter().getInstance().ready()

  return app
}
