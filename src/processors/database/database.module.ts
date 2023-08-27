import { CustomPrismaModule } from 'nestjs-prisma'

import { Global, Module } from '@nestjs/common'

import { ConfigModel } from '~/modules/configs/configs.model'
import { PostModel } from '~/modules/post/post.model'
import { getProviderByTypegooseClass } from '~/transformers/model.transformer'

import { databaseProvider } from './database.provider'
import { DatabaseService } from './database.service'
import { extendedPrismaClient } from './prisma.instance'

const models = [PostModel, ConfigModel].map((model) =>
  getProviderByTypegooseClass(model),
)
@Module({
  providers: [DatabaseService, databaseProvider, ...models],
  exports: [DatabaseService, databaseProvider, ...models],
  imports: [
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient
      },
    }),
  ],
})
@Global()
export class DatabaseModule {}
