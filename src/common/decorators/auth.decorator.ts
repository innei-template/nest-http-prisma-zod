import { UseGuards, applyDecorators } from '@nestjs/common'

import { JWTAuthGuard } from '../guard/auth.guard'

export function Auth() {
  const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] =
    []

  decorators.push(UseGuards(JWTAuthGuard))
  return applyDecorators(...decorators)
}
