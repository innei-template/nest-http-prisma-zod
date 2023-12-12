import { fastifyApp } from '@core/common/adapter/fastify.adapter'
import { JSONTransformerInterceptor } from '@core/common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from '@core/common/interceptors/response.interceptor'
import { ZodValidationPipe } from '@core/common/pipes/zod-validation.pipe'
import { ModuleMetadata } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'

const interceptorProviders = [JSONTransformerInterceptor, ResponseInterceptor]
export const setupE2EApp = async (module: ModuleMetadata) => {
  const nextModule: ModuleMetadata = {
    exports: module.exports || [],
    imports: module.imports || [],
    providers: module.providers || [],
    controllers: module.controllers || [],
  }

  nextModule.providers!.unshift({
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  })
  nextModule.providers!.unshift(
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

  await app.getHttpAdapter().getInstance().ready()

  return app
}
