import { createZodDto } from 'nestjs-zod/dto'
import { z } from 'nestjs-zod/z'

import { PostModel } from '~/schemas'

import { PostSchemaProjection } from './post.protect'

export class PostDto extends createZodDto(
  PostModel.extend({
    slug: z.string().max(80),
    title: z.string().max(80),
  }).omit(PostSchemaProjection),
) {}
