import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { UserModel } from '@core/schemas'

import { UserSchemaProjection } from '../user.protect'

export class UserRegisterDto extends createZodDto(
  UserModel.omit(UserSchemaProjection).extend({
    socialIds: z.record(z.string(), z.string()).optional(),
  }),
) {}
