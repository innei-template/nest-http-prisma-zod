import { generateMock } from '@anatine/zod-mock'

import { UserModel } from '~/schemas'

// @anatine/zod-mock has memory leak issues, so pin the seed, and only use one mock per test.
export const mockUserInputData1 = generateMock(UserModel, { seed: 1 })
