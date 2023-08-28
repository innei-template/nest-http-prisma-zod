import { createZodDto } from 'nestjs-zod'
import * as z from 'nestjs-zod/z'

import { UserModel } from '~/schemas'

import { UserSchemaProjection } from '../user.protect'

export class UserRegisterDto extends createZodDto(
  UserModel.omit(UserSchemaProjection).extend({
    socialIds: z.json().default({}),
  }),
) {}
