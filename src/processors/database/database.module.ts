import { loggingMiddleware, PrismaModule, QueryInfo } from 'nestjs-prisma'

import { Global, Logger, Module } from '@nestjs/common'

import { ConfigModel } from '~/modules/configs/configs.model'
import { PostModel } from '~/modules/post/post.model'
import { getProviderByTypegooseClass } from '~/transformers/model.transformer'

import { UserModel } from '../../modules/user/user.model'
import { databaseProvider } from './database.provider'
import { DatabaseService } from './database.service'
import { snowflakeGeneratorMiddleware } from './middlewares/snowflake'

const models = [UserModel, PostModel, ConfigModel].map((model) =>
  getProviderByTypegooseClass(model),
)
@Module({
  providers: [DatabaseService, databaseProvider, ...models],
  exports: [DatabaseService, databaseProvider, ...models],
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          snowflakeGeneratorMiddleware,

          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log', // default is `debug`
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
        prismaOptions: {
          log: isDev ? ['query', 'error', 'info', 'warn'] : undefined,
        },
      },
    }),
  ],
})
@Global()
export class DatabaseModule {}
