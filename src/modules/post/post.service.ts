import { Injectable } from '@nestjs/common'

import { BizException } from '~/common/exceptions/biz.exception'
import { BusinessEvents } from '~/constants/business-event.constant'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { DatabaseService } from '~/processors/database/database.service'
import { EventManagerService } from '~/processors/helper/helper.event.service'
import { PagerDto } from '~/shared/dto/pager.dto'
import { resourceNotFoundWrapper } from '~/shared/utils/prisma.util'

import { PostInputSchema } from './post.protect'

@Injectable()
export class PostService {
  constructor(
    private readonly db: DatabaseService,
    private readonly eventService: EventManagerService,
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

    const model = await this.db.prisma.post.create({
      data: {
        ...dto,
      },
      include: { category: true },
    })

    this.eventService.event(BusinessEvents.POST_CREATE, model)

    return model
  }

  async paginatePosts(options: PagerDto) {
    const { size, page } = options
    return this.db.prisma.post.paginate(
      {
        include: {
          category: true,
        },
        orderBy: {
          created: 'desc',
        },
      },
      {
        size,
        page,
      },
    )
  }

  async getPostById(id: string) {
    return this.db.prisma.post
      .findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          category: true,
        },
      })
      .catch(
        resourceNotFoundWrapper(new BizException(ErrorCodeEnum.PostNotFound)),
      )
  }
}
