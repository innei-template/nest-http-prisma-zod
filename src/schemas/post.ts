import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import { CompleteUser, RelatedUserModel } from './index'

export const PostModel = z.object({
  id: z.string(),
  slug: z.string(),
  text: z.string(),
  title: z.string(),
  createdAt: z.date(),
  userId: z.string().nullish(),
})

export class PostDto extends createZodDto(PostModel) {}

export interface CompletePost extends z.infer<typeof PostModel> {
  User?: CompleteUser | null
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() =>
  PostModel.extend({
    User: RelatedUserModel.nullish(),
  }),
)
