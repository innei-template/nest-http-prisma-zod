import { Get, Query } from '@nestjs/common'

import { ApiController } from '~/common/decorators/api-controller.decorator'
import { BizException } from '~/common/exceptions/biz.excpetion'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { PagerDto } from '~/shared/dto/pager.dto'

import { PostService } from './post.service'

@ApiController('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get('/')
  async gets(@Query() query: PagerDto) {}

  @Get('/*')
  async notFound() {
    throw new BizException(ErrorCodeEnum.PostNotFound)
  }
}
