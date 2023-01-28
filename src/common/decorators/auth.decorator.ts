import { UseGuards, applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { JWTAuthGuard } from '../guard/auth.guard'

export function Auth() {
  const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    []

  decorators.push(
    ApiBearerAuth(),
    UseGuards(JWTAuthGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  )
  return applyDecorators(...decorators)
}
