import { omit } from 'lodash'
import { createFixture } from 'zod-fixture'

import { PostSchemaProjection } from '~/modules/post/post.protect'
import { PostModel } from '~/schemas'

export const generateMockPost = () => {
  return omit(createFixture(PostModel), ...PostSchemaProjection.keys)
}
const mockPostInputData = generateMockPost()

export { mockPostInputData }
