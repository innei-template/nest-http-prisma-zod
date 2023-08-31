import { MockCacheService } from 'test/helper/redis-mock.helper'
import { prisma } from 'test/lib/prisma'
import { authProvider } from 'test/mock/modules/auth.mock'
import { beforeEach, describe, it } from 'vitest'

import { generateMock } from '@anatine/zod-mock'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { UserService } from '~/modules/user/user.service'
import { CacheService } from '~/processors/cache/cache.service'
import { DatabaseModule } from '~/processors/database/database.module'
import { DatabaseService } from '~/processors/database/database.service'
import { UserModel } from '~/schemas'

describe('/modules/user/user.service', () => {
  let service: UserService
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CacheService,
          useClass: MockCacheService,
        },

        authProvider,
      ],
      imports: [
        DatabaseModule,

        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test', '.env'],
        }),
      ],
    }).compile()
    await app.init()
    service = app.get(UserService)

    const db = app.get(DatabaseService)
    await db.prisma.$transaction([
      db.prisma.user.deleteMany(),

      db.prisma.post.deleteMany(),
      db.prisma.category.deleteMany(),
    ])
  })

  it('should register user successfully', async () => {
    const userModel = generateMock(UserModel)
    await service.register(userModel)

    const user = await prisma.user.findUnique({
      where: {
        username: userModel.username,
      },
    })

    expect(user).toBeDefined()
    expect(user?.username).toBe(userModel.username)
  })

  it('should throw if existed', async () => {
    const userModel = generateMock(UserModel)
    await service.register(userModel)

    await expect(service.register(userModel)).rejects.toThrowError()
  })
})
