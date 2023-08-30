import { createZodDto } from 'nestjs-zod/dto'
import { z } from 'nestjs-zod/z'

import { CategoryModel } from '~/schemas'

import { categorySchemaProjection } from './category.project'

export class CategoryDto extends createZodDto(
  CategoryModel.extend({
    slug: z.string().max(80),
    name: z.string().max(80),
  }).omit(categorySchemaProjection),
) {}
