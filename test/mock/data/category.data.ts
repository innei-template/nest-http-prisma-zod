import { omit } from 'lodash'
import { createFixture } from 'zod-fixture'

import { categorySchemaProjection } from '@core/modules/category/category.project'
import { CategorySchema } from '@prisma/client/zod'

export const generateMockCategory = () => {
  return omit(
    createFixture(CategorySchema, {}),
    ...categorySchemaProjection.keys,
  )
}

const mockCategoryInputData1 = createFixture(CategorySchema)

export { mockCategoryInputData1 }
