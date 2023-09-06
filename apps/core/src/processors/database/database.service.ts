import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
  createExtendedPrismaClient,
  extendedPrismaClient,
} from './prisma.instance'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: extendedPrismaClient
  constructor(readonly configService: ConfigService) {
    const dbUrl = configService.getOrThrow<string>('DATABASE_URL')
    // const user = configService.getOrThrow('POSTGRES_USER')
    // const password = configService.getOrThrow('POSTGRES_PASSWORD')

    this.client = createExtendedPrismaClient({
      url: dbUrl,
      // .replace('${POSTGRES_USER}', user)
      // .replace('${POSTGRES_PASSWORD}', password),
    })
  }
  async onModuleInit() {
    await this.client.$connect()
  }

  async onModuleDestroy() {
    await this.client.$disconnect()
  }

  public get prisma() {
    return this.client
  }
}
