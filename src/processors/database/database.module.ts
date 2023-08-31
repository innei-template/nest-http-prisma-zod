import { CustomPrismaModule } from 'nestjs-prisma'

import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { createExtendedPrismaClient } from '~/processors/database/prisma.instance'

import { DatabaseService } from './database.service'

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [
    CustomPrismaModule.forRootAsync({
      isGlobal: true,
      name: 'PrismaService',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.getOrThrow('DATABASE_URL')
        return createExtendedPrismaClient({
          url: dbUrl,
        })
      },
    }),
  ],
})
@Global()
export class DatabaseModule {}
