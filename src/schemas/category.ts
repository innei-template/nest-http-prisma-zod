import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import { CategoryType } from './enums'
import { CompletePost, RelatedPostModel } from './index'

export const CategoryModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(CategoryType),
  slug: z.string(),
  created: z.date(),
})

export class CategoryDto extends createZodDto(CategoryModel) {}

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  Post: CompletePost[]
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() =>
  CategoryModel.extend({
    Post: RelatedPostModel.array(),
  }),
)
