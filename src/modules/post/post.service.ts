import { Injectable } from '@nestjs/common'
import { Post } from '@prisma/client'

import { BizException } from '~/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { DatabaseService } from '~/processors/database/database.service'

import { PostInputSchema } from './post.protect'

@Injectable()
export class PostService {
  constructor(
    private readonly db: DatabaseService, // private readonly eventService: EventManagerService,
  ) {}

  async create(dto: PostInputSchema) {
    const { slug, categoryId } = dto
    const exist = await this.db.prisma.post.findUnique({
      where: {
        slug_categoryId: {
          slug,
          categoryId,
        },
      },
      select: { id: true },
    })

    if (exist) {
      throw new BizException(ErrorCodeEnum.PostExist)
    }

    const hasCategory = await this.db.prisma.category.exists({
      where: {
        id: categoryId,
      },
    })
    if (!hasCategory) {
      throw new BizException(ErrorCodeEnum.CategoryNotFound)
    }

    const model: Post = await this.db.prisma.post.create({
      data: {
        ...dto,
      },
    })

    // this.eventService.event(BusinessEvents.POST_CREATE, model)

    return model
  }
}
