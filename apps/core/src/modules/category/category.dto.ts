import { createZodDto } from 'nestjs-zod/dto'

import { CategorySchema } from '@prisma/client/zod'

import { categorySchemaProjection } from './category.project'

export class CategoryDto extends createZodDto(
  CategorySchema.omit(categorySchemaProjection),
) {}
