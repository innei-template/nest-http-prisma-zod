import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import { CompleteUser, RelatedUserModel } from './index'

export const ApiTokenModel = z.object({
  id: z.string(),
  userId: z.string(),
  created: z.date(),
  token: z.string(),
  expired: z.date().nullish(),
  name: z.string(),
})

export class ApiTokenDto extends createZodDto(ApiTokenModel) {}

export interface CompleteApiToken extends z.infer<typeof ApiTokenModel> {
  user: CompleteUser
}

/**
 * RelatedApiTokenModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedApiTokenModel: z.ZodSchema<CompleteApiToken> = z.lazy(() =>
  ApiTokenModel.extend({
    user: RelatedUserModel,
  }),
)
