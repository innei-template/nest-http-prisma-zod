import { Body, Get, Post, Query } from '@nestjs/common'

import { ApiController } from '~/common/decorators/api-controller.decorator'
import { BizException } from '~/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { PagerDto } from '~/shared/dto/pager.dto'

import { PostDto } from './post.dto'
import { PostService } from './post.service'

@ApiController('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get('/')
  async gets(@Query() query: PagerDto) {
    return query
  }

  @Post('/')
  // @Auth()
  async create(@Body() body: PostDto) {
    return this.service.create(body)
  }

  @Get('/*')
  async notFound() {
    throw new BizException(ErrorCodeEnum.PostNotFound)
  }
}
