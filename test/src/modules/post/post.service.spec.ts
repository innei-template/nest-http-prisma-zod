import { PostService } from '@core/modules/post/post.service'
import { CacheService } from '@core/processors/cache/cache.service'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { prisma } from '@test/lib/prisma'
import { generateMockCategory } from '@test/mock/data/category.data'
import { generateMockPost, mockPostInputData } from '@test/mock/data/post.data'
import {
  mockedEventManagerService,
  mockedEventManagerServiceProvider,
} from '@test/mock/helper/helper.event'
import { MockedDatabaseModule } from '@test/mock/processors/database/database.module'

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
    expect(mockedEventManagerService.event).toBeCalledWith(
      'POST_CREATE',
      result,
    )
  })

  it('should throw when post exist', async () => {
    const category = await createMockCategory()
    await prisma.post.create({
      data: {
        ...mockPostInputData,
        categoryId: category.id,
      },
    })
    const { id } = category
    await expect(
      service.create({
        ...mockPostInputData,
        categoryId: id,
      }),
    ).rejects.toThrowErrorMatchingSnapshot()
  })

  it('should throw when category not found', async () => {
    await expect(
      service.create({
        ...mockPostInputData,
        categoryId: 'not-found',
      }),
    ).rejects.toThrowErrorMatchingSnapshot()
  })

  it('should paginate posts successful', async () => {
    const cate = await createMockCategory()
    const mockedDataList = [] as Prisma.PostCreateManyInput[]
    for (let i = 0; i < 20; i++) {
      mockedDataList.push({
        ...generateMockPost(),
        categoryId: cate.id,
      })
    }

    await prisma.post.createMany({
      data: mockedDataList,
    })

    const pagination = await service.paginatePosts({
      page: 1,
      size: 5,
    })

    expect(pagination.pagination).toMatchSnapshot()
    expect(pagination.data[0]!.category).toMatchObject(cate)
  })

  it('should get post by id successful', async () => {
    const cate = await createMockCategory()
    const post = await prisma.post.create({
      data: {
        ...generateMockPost(),
        categoryId: cate.id,
      },
    })

    const result = await service.getPostById(post.id)

    expect(result).toMatchObject(post)
  })

  it('should get post throw when 404', async () => {
    expect(
      service.getPostById('not-found'),
    ).rejects.toThrowErrorMatchingSnapshot()
  })
})
