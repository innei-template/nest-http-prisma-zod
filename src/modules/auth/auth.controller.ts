import { Body, Post, Scope } from '@nestjs/common'

import { ApiController } from '~/common/decorators/api-controller.decorator'

import { AuthService } from './auth.service'
import { UserLoginDto } from './dtos/auth.dto'

@ApiController({
  path: 'auth',
  scope: Scope.REQUEST,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: UserLoginDto) {
    return body
  }
}
