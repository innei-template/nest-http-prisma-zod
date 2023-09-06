import { omit } from 'lodash'
import { z } from 'zod'
import { createFixture } from 'zod-fixture'

import { UserRegisterDto } from '@core/modules/user/dtos/register.dto'
import { UserSchemaProjection } from '@core/modules/user/user.protect'
import { UserModel } from '@core/schemas'

export const generateMockUser = () => {
  // @anatine/zod-mock has memory leak issues, so pin the seed, and only use one mock per test.
  const mockUserInputData = omit(
    createFixture(
      UserModel.extend({
        avatar: z.string().url(),
        mail: z.string().email(),
        url: z.string().url(),
        introduce: z.string(),
      }),
    ),
    ...UserSchemaProjection.keys,
  )

  mockUserInputData.socialIds = {
    github: 'innei',
  }
  return mockUserInputData as UserRegisterDto
}

const mockUserInputData1 = generateMockUser()

export { mockUserInputData1 }
