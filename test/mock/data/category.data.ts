import { omit } from 'lodash'
import { createFixture } from 'zod-fixture'

import { categorySchemaProjection } from '@core/modules/category/category.project'
import { CategoryModel } from '@core/schemas'

export const generateMockCategory = () => {
  return omit(createFixture(CategoryModel), ...categorySchemaProjection.keys)
}

const mockCategoryInputData1 = createFixture(CategoryModel)

export { mockCategoryInputData1 }
