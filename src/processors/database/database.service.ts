import { Inject, Injectable } from '@nestjs/common'

import { ExtendedPrismaService } from './prisma.instance'

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma_: ExtendedPrismaService,
  ) {}

  public get prisma() {
    return this.prisma_.client
  }
}
