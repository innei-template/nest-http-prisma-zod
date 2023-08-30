import { Injectable } from '@nestjs/common'

import { BizException } from '~/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { DatabaseService } from '~/processors/database/database.service'

import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly database: DatabaseService) {
    this.createDefaultCategory()
  }

  async create(dto: CategoryDto) {
    const { name, slug } = dto
    const existed = await this.database.prisma.post.exists({
      where: {
        slug,
      },
    })

    if (existed) {
      throw new BizException(ErrorCodeEnum.CategoryAlreadyExists)
    }

    const doc = await this.database.prisma.category.create({
      data: { name, slug: slug ?? name },
    })
    return doc
  }

  async findPostsInCategory(id: string) {
    return await this.database.prisma.post.findMany({
      where: {
        categoryId: id,
      },
    })
  }

  async deleteById(id: string) {
    const category = await this.database.prisma.category.findUnique({
      where: {
        id,
      },
    })
    if (!category) {
      throw new BizException(ErrorCodeEnum.NoContentCanBeModified)
    }
    const postsInCategory = await this.findPostsInCategory(category.id)
    if (postsInCategory.length > 0) {
      throw new BizException(ErrorCodeEnum.CategoryCannotDeleted)
    }
    const res = await this.database.prisma.category.delete({
      where: {
        id,
      },
    })
    await this.createDefaultCategory()
    return res
  }

  async createDefaultCategory() {
    if ((await this.database.prisma.category.count()) === 0) {
      return await this.database.prisma.category.create({
        data: {
          name: '默认分类',
          slug: 'default',
        },
      })
    }
  }
}
