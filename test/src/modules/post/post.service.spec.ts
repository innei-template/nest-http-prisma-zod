import { prisma } from 'test/lib/prisma'
import { generateMockCategory } from 'test/mock/data/category.data'
import { mockPostInputData } from 'test/mock/data/post.data'
import { mockedEventManagerServiceProvider } from 'test/mock/helper/hepler.event'
import { MockedDatabaseModule } from 'test/mock/processors/database/database.module'

import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

import { PostService } from '~/modules/post/post.service'
import { CacheService } from '~/processors/cache/cache.service'

describe('/modules/post/post.service', () => {
  let service: PostService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        PostService,
        mockedEventManagerServiceProvider,
        {
          provide: CacheService,
          useValue: {},
        },
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

    service = app.get<PostService>(PostService)
  })

  const createMockCategory = async () => {
    return await prisma.category.create({
      data: {
        ...generateMockCategory(),
      },
    })
  }

  it('should create post successful', async () => {
    const category = await createMockCategory()
    const { id } = category
    const result = await service.create({
      ...mockPostInputData,
      categoryId: id,
    })

    expect(result).toMatchObject({
      ...mockPostInputData,
      categoryId: id,
      category,
    })
  })
})
