import { Controller, Get, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { HTTPDecorators } from '~/common/decorator/http.decorator'
import { ApiName } from '~/common/decorator/openapi.decorator'
import { PagerDto } from '~/shared/dto/pager.dto'

@Controller('posts')
@ApiName
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
}
