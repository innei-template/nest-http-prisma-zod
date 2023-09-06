import { omit } from 'lodash'
import { createFixture } from 'zod-fixture'

import { PostSchemaProjection } from '@core/modules/post/post.protect'
import { PostModel } from '@core/schemas'

export const generateMockPost = () => {
  return omit(createFixture(PostModel), ...PostSchemaProjection.keys)
}
const mockPostInputData = generateMockPost()

export { mockPostInputData }
