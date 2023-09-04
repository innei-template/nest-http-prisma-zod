import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
  createExtendedPrismaClient,
  extendedPrismaClient,
} from './prisma.instance'

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: extendedPrismaClient
  constructor(private readonly configService: ConfigService) {
    const dbUrl = configService.getOrThrow('DATABASE_URL')
    this.client = createExtendedPrismaClient({
      url: dbUrl,
    })
  }
  async onModuleInit() {
    await this.client.$connect()
  }

  public get prisma() {
    return this.client
  }
}
