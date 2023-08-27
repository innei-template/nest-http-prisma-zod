import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().max(255).nonempty(),
  password: z.string().max(255).nonempty(),
})

export class UserLoginDto extends createZodDto(loginSchema) {}
