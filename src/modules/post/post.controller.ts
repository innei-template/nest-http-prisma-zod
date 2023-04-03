import { Controller, Get, Query } from '@nestjs/common'

import { HTTPDecorators } from '~/common/decorators/http.decorator'
import { BizException } from '~/common/exceptions/business.excpetion'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { PagerDto } from '~/shared/dto/pager.dto'

import { PostService } from './post.service'

@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @HTTPDecorators.Paginator
  @Get('/')
  async gets(@Query() query: PagerDto) {
    const { page, select, size } = query
    return this.service.model.paginate(
      {},
      {
        page,
        limit: size,
        select,
        lean: true,
      },
    )
  }

  @Get('/*')
  async notFound() {
    throw new BizException(ErrorCodeEnum.PostNotFoundError)
  }
}
