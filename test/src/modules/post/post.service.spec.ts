import { PostService } from '@core/modules/post/post.service'
import { Prisma } from '@db/client'
import { createServiceUnitTestApp } from '@test/helper/create-service-unit'
import { prisma } from '@test/lib/prisma'
import { generateMockCategory } from '@test/mock/data/category.data'
import { generateMockPost, mockPostInputData } from '@test/mock/data/post.data'
import { mockedEventManagerService } from '@test/mock/helper/helper.event'

describe('/modules/post/post.service', () => {
  const proxy = createServiceUnitTestApp(PostService)

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

    const result = await proxy.service.create({
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
      proxy.service.create({
        ...mockPostInputData,
        categoryId: id,
      }),
    ).rejects.toThrowErrorMatchingSnapshot()
  })

  it('should throw when category not found', async () => {
    await expect(
      proxy.service.create({
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

    const pagination = await proxy.service.paginatePosts({
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

    const result = await proxy.service.getPostById(post.id)

    expect(result).toMatchObject(post)
  })

  it('should get post throw when 404', async () => {
    expect(
      proxy.service.getPostById('not-found'),
    ).rejects.toThrowErrorMatchingSnapshot()
  })
})
