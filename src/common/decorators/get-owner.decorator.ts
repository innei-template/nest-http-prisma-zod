import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { getNestExecutionContextRequest } from '~/transformers/get-req.transformer'

export const Owner = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getNestExecutionContextRequest(ctx).owner
  },
)
