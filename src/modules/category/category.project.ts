import { z } from 'zod'

import { CategoryModel } from '~/schemas'
import { createProjectionOmit } from '~/shared/utils/schema.util'

export const categorySchemaProjection = createProjectionOmit(
  CategoryModel.shape,
  [],
  true,
)

export const categorySchemaSerializeProjection = createProjectionOmit(
  CategoryModel.shape,
  [],
)

export type categoryInputSchema = Omit<
  z.infer<typeof CategoryModel>,
  keyof typeof categorySchemaProjection
>
