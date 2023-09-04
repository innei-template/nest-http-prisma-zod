import { omit } from 'lodash'
import { createFixture } from 'zod-fixture'

import { categorySchemaProjection } from '~/modules/category/category.project'
import { CategoryModel } from '~/schemas'

export const generateMockCategory = () => {
  return omit(createFixture(CategoryModel), ...categorySchemaProjection.keys)
}

const mockCategoryInputData1 = createFixture(CategoryModel)

export { mockCategoryInputData1 }
