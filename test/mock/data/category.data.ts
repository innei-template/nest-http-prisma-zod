import { generateMock } from '@anatine/zod-mock'

import { CategoryModel } from '~/schemas'

const mockCategoryInputData1 = generateMock(CategoryModel, { seed: 1 })

export { mockCategoryInputData1 }
