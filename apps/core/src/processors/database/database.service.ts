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
    const dbUrl = configService.getOrThrow('DATABASE_URL')

    this.client = createExtendedPrismaClient({
      url: dbUrl,
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
