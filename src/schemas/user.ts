import { createZodDto } from 'nestjs-zod/dto'
import * as z from 'nestjs-zod/z'

import {
  CompleteApiToken,
  CompleteOAuth,
  CompletePost,
  RelatedApiTokenModel,
  RelatedOAuthModel,
  RelatedPostModel,
} from './index'

export const UserModel = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  introduce: z.string().nullish(),
  avatar: z.string().nullish(),
  password: z.string(),
  mail: z.string().nullish(),
  url: z.string().nullish(),
  lastLoginTime: z.date().nullish(),
  lastLoginIp: z.string().nullish(),
  socialIds: z.json(),
  authCode: z.string(),
  created: z.date(),
  modified: z.date().nullish(),
})

export class UserDto extends createZodDto(UserModel) {}

export interface CompleteUser extends z.infer<typeof UserModel> {
  apiTokens: CompleteApiToken[]
  oauths: CompleteOAuth[]
  Post: CompletePost[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    apiTokens: RelatedApiTokenModel.array(),
    oauths: RelatedOAuthModel.array(),
    Post: RelatedPostModel.array(),
  }),
)
