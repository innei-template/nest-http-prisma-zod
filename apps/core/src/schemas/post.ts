import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import { CompleteCategory, RelatedCategoryModel } from './index'

export const PostModel = z.object({
  id: z.string(),
  slug: z.string(),
  text: z.string(),
  title: z.string(),
  created: z.date(),
  modified: z.date().nullish(),
  categoryId: z.string(),
})

export class PostDto extends createZodDto(PostModel) {}

export interface CompletePost extends z.infer<typeof PostModel> {
  category: CompleteCategory
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() =>
  PostModel.extend({
    category: RelatedCategoryModel,
  }),
)
