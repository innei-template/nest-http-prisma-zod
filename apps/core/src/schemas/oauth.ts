import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import { CompleteUser, RelatedUserModel } from './index'

export const OAuthModel = z.object({
  id: z.string(),
  userId: z.string(),
  platform: z.string(),
  oauthId: z.string(),
})

export class OAuthDto extends createZodDto(OAuthModel) {}

export interface CompleteOAuth extends z.infer<typeof OAuthModel> {
  user: CompleteUser
}

/**
 * RelatedOAuthModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOAuthModel: z.ZodSchema<CompleteOAuth> = z.lazy(() =>
  OAuthModel.extend({
    user: RelatedUserModel,
  }),
)
