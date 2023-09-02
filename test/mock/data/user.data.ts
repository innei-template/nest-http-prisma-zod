import { generateMock } from '@anatine/zod-mock'

import { UserModel } from '~/schemas'

export const mockUserInputData1 = generateMock(UserModel, { seed: 1 })
