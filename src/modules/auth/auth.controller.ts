import { Scope } from '@nestjs/common'

import { ApiController } from '~/common/decorators/api-controller.decorator'

import { AuthService } from './auth.service'

@ApiController({
  path: 'auth',
  scope: Scope.REQUEST,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
