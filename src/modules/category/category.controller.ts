import { Body, Post } from '@nestjs/common'

import { ApiController } from '~/common/decorators/api-controller.decorator'

import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@ApiController('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post('/')
  // @Auth()
  async create(@Body() body: CategoryDto) {
    return this.service.create(body)
  }
}
