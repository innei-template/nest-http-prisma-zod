import { mockUserInputData1 } from 'test/mock/data/user.data'
import { authProvider } from 'test/mock/modules/auth.mock'

import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { UserService } from '~/modules/user/user.service'
import { CacheService } from '~/processors/cache/cache.service'
import { DatabaseModule } from '~/processors/database/database.module'
import { DatabaseService } from '~/processors/database/database.service'

// jest.mock('bcrypt', () => ({}))
describe('/modules/user/user.service', () => {
  let service: UserService
  let dbService: DatabaseService
  let prisma: DatabaseService['prisma']

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UserService,
        // {
        //   provide: CacheService,
        //   useClass: MockCacheService,
        // },

        {
          provide: CacheService,
          useValue: {},
        },

        authProvider,
        // {
        //   provide: DatabaseService,
        //   useValue: {
        //     prisma: {
        //       user: {
        //         findFirstOrThrow: jest.fn(),
        //         findUnique: jest.fn(),
        //         exists: jest.fn(),
        //       },

        //       $disconnect: jest.fn(),
        //     },
        //   },
        // },
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

    dbService = app.get(DatabaseService)
    prisma = dbService.prisma
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
    await service.patchUserData(user, {
      name: 'test',
    })

    const updatedUser = await prisma.user.findFirstOrThrow()
    expect(updatedUser.name).toBe('test')
    expect(updatedUser.id).toBe(user.id)
  })
})
