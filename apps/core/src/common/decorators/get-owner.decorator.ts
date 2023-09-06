import { getNestExecutionContextRequest } from '@core/transformers/get-req.transformer'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Owner = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getNestExecutionContextRequest(ctx).owner
  },
)
