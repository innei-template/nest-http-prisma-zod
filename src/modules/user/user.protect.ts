import { z } from 'zod'

import { UserModel } from '~/schemas'
import { createProjectionOmit } from '~/shared/utils/schema.util'

export const UserSchemaProjection = createProjectionOmit(
  UserModel.shape,
  ['lastLoginIp', 'authCode', 'lastLoginIp', 'lastLoginTime', 'socialIds'],
  true,
)

export const UserSchemaSerializeProjection = createProjectionOmit(
  UserModel.shape,
  ['password', 'authCode'],
)

export type UserSchema = z.infer<typeof UserModel>
