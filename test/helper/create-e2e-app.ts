import { ModuleMetadata } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types'

import { HttpCacheInterceptor } from '~/common/interceptors/cache.interceptor'
import { JSONTransformerInterceptor } from '~/common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from '~/common/interceptors/response.interceptor'
import { getModelToken } from '~/transformers/model.transformer'

import { dbHelper } from './db-mock.helper'
import { redisHelper } from './redis-mock.helper'
import { setupE2EApp } from './setup-e2e'

type ClassType = new (...args: any[]) => any

type ModelMap = Map<
  ClassType,
  {
    name: string
    token: string
    model: ReturnModelType<ClassType, BeAnObject>
  }
>
interface E2EAppMetaData {
  models?: ClassType[]
  pourData?: (modelMap: ModelMap) => Promise<void | (() => Promise<any>)>
}

export const createE2EApp = (module: ModuleMetadata & E2EAppMetaData) => {
  const proxy: {
    app: NestFastifyApplication
  } = {} as any

  let pourDataCleanup: (() => Promise<void>) | undefined

  beforeAll(async () => {
    const { CacheService, token } = await redisHelper
    const { models, pourData, ...nestModule } = module
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
    const modelMap = new Map() as ModelMap
    if (models) {
      models.forEach((model) => {
        const token = getModelToken(model.name)
        const modelInstance = dbHelper.getModel(model)
        nestModule.providers!.push({
          provide: token,
          useValue: modelInstance,
        })
        modelMap.set(model, {
          name: model.name,
          token,
          model: modelInstance,
        })
      })
    }
    if (pourData) {
      const cleanup = await pourData(modelMap)
      // @ts-ignore
      pourDataCleanup = cleanup
    }
    const app = await setupE2EApp(nestModule)

    proxy.app = app
  })

  afterAll(async () => {
    if (pourDataCleanup) {
      return await pourDataCleanup()
    }
  })

  return proxy
}
