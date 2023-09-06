import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

export const TagModel = z.object({
  id: z.string(),
  name: z.string(),
  created: z.date(),
})

export class TagDto extends createZodDto(TagModel) {}
