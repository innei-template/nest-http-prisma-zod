import { ApiController } from '@core/common/decorators/api-controller.decorator'
import { BizException } from '@core/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '@core/constants/error-code.constant'
import { SnowflakeIdDto } from '@core/shared/dto/id.dto'
import { PagerDto } from '@core/shared/dto/pager.dto'
import { Body, Get, Param, Post, Query } from '@nestjs/common'

import { PostDto } from './post.dto'
import { PostService } from './post.service'

@ApiController('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get('/')
  async gets(@Query() query: PagerDto) {
    const paginate = await this.service.paginatePosts(query)
    return paginate
  }

  @Get('/:id')
  async get(@Param() param: SnowflakeIdDto) {
    const { id } = param
    return this.service.getPostById(id)
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
