import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const basePagerSchema = z.object({
  size: z.coerce.number().int().min(1).max(50).default(10).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.coerce.number().or(z.literal(1)).or(z.literal(-1)).optional(),
})

export class PagerDto extends createZodDto(basePagerSchema) {}

const withYearPagerSchema = basePagerSchema.extend({
  year: z.coerce.number().int().min(1970).max(2100),
})

export class WithYearPagerDto extends createZodDto(withYearPagerSchema) {}
