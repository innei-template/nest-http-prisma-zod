import { createZodDto } from 'nestjs-zod'
import * as z from 'nestjs-zod/z'

import { UserModel } from '~/schemas'

export class UserRegisterDto extends createZodDto(
  UserModel.omit({
    authCode: true,

    lastLoginIp: true,
    lastLoginTime: true,
    socialIds: true,

    // base
    id: true,
  }).extend({
    socialIds: z.json().default({}),
  }),
) {}
