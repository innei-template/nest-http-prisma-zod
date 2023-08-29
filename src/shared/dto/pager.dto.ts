import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class PagerDto extends createZodDto(
  z.object({
    size: z.coerce.number().int().min(1).max(50).default(10).optional(),
    page: z.coerce.number().int().min(1).default(1).optional(),
    select: z.string().optional(),
  }),
) {}
