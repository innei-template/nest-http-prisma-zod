import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

export const PostModel = z.object({
  id: z.string(),
  slug: z.string(),
  text: z.string(),
  title: z.string(),
  created: z.date(),
  modified: z.date().nullish(),
})

export class PostDto extends createZodDto(PostModel) {}
