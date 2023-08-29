import { CustomPrismaModule } from 'nestjs-prisma'

import { Global, Module } from '@nestjs/common'

import { DatabaseService } from './database.service'
import { extendedPrismaClient } from './prisma.instance'

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
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
