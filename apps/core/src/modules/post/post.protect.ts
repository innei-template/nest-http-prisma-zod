import { z } from 'zod'

import { PostModel } from '@core/schemas'
import { createProjectionOmit } from '@core/shared/utils/schema.util'

export const PostSchemaProjection = createProjectionOmit(
  PostModel.shape,
  [],
  true,
)
export const PostSchemaSerializeProjection = createProjectionOmit(
  PostModel.shape,
  [],
)

export type PostInputSchema = Omit<
  z.infer<typeof PostModel>,
  keyof typeof PostSchemaProjection
>
