import { Controller } from '@nestjs/common'

import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'

@Controller(['master', 'user'])
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
}
