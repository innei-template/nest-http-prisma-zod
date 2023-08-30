import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export class SnowflakeIdDto extends createZodDto(
  z.object({
    id: z.string().regex(/^\d{18}$/),
  }),
) {}
