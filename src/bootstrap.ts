import chalk from 'chalk'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication } from '@nestjs/platform-fastify'

import { CROSS_DOMAIN, PORT } from './app.config'
import { AppModule } from './app.module'
import { fastifyApp } from './common/adapter/fastify.adapter'
import { SpiderGuard } from './common/guards/spider.guard'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { consola } from './global/consola.global'
import { MyLogger } from './processors/logger/logger.service'
import { isDev } from './shared/utils/environment.util'

// const APIVersion = 1
const Origin = CROSS_DOMAIN.allowedOrigins

declare const module: any

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    { logger: ['error', 'debug'] },
  )

  const hosts = Origin.map((host) => new RegExp(host, 'i'))

  app.enableCors({
    origin: (origin, callback) => {
      const allow = hosts.some((host) => host.test(origin))

      callback(null, allow)
    },
    credentials: true,
  })

  isDev && app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalGuards(new SpiderGuard())

  await app.listen(+PORT, '0.0.0.0', async () => {
    app.useLogger(app.get(MyLogger))
    consola.info('ENV:', process.env.NODE_ENV)
    const url = await app.getUrl()
    const pid = process.pid

    const prefix = 'P'
    if (isDev) {
      consola.debug(`[${prefix + pid}] OpenApi: ${url}/api-docs`)
    }
    consola.success(`[${prefix + pid}] Server listen on: ${url}`)

    Logger.log(`Server is up. ${chalk.yellow(`+${performance.now() | 0}ms`)}`)
  })
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
