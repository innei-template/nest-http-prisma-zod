import { ApiController } from '@core/common/decorators/api-controller.decorator'
import { Scope } from '@nestjs/common'

import { AuthService } from './auth.service'

@ApiController({
  path: 'auth',
  scope: Scope.REQUEST,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
