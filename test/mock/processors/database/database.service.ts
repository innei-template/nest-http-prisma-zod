import { prisma } from 'test/lib/prisma'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { extendedPrismaClient } from '~/processors/database/prisma.instance'

@Injectable()
export class MockedDatabaseService {
  private client: extendedPrismaClient
  constructor(readonly configService: ConfigService) {
    this.client = prisma
  }

  public get prisma() {
    return this.client
  }
}
