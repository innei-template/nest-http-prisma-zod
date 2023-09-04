import { generateMock } from '@anatine/zod-mock'

import { PostModel } from '~/schemas'

const mockPostInputData = generateMock(PostModel, { seed: 1 })

export { mockPostInputData }
