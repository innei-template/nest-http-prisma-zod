import { prisma } from 'test/lib/prisma'
import { mockUserInputData1 } from 'test/mock/data/user.data'
import { authProvider } from 'test/mock/modules/auth.mock'
import { MockedDatabaseModule } from 'test/mock/processors/database/database.module'

import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { UserService } from '~/modules/user/user.service'
import { CacheService } from '~/processors/cache/cache.service'

describe('/modules/user/user.service', () => {
  let service: UserService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,

        {
          provide: CacheService,
          useValue: {},
        },

        authProvider,
      ],
      imports: [
        MockedDatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test', '.env'],
        }),
      ],
    }).compile()
    await app.init()
    service = app.get(UserService)
  })

  it('should register user successfully', async () => {
    const userModel = mockUserInputData1
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
    const userModel = mockUserInputData1
    await service.register(userModel)

    await expect(service.register(userModel)).rejects.toThrowError()
  })

  it('should patch user successfully', async () => {
    const userModel = mockUserInputData1
    await service.register(userModel)
    const user = await prisma.user.findFirstOrThrow()
    await service.patchUserData(user.id, {
      name: 'test',
    })

    const updatedUser = await prisma.user.findFirstOrThrow()
    expect(updatedUser.name).toBe('test')
    expect(updatedUser.id).toBe(user.id)
  })
})
