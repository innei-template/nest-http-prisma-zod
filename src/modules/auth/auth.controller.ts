import { Controller, Scope } from '@nestjs/common'
import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { AuthService } from './auth.service'

export class TokenDto {
  @IsDate()
  @IsOptional()
  @Transform(({ value: v }) => new Date(v))
  expired?: Date

  @IsString()
  @IsNotEmpty()
  name: string
}

@Controller({
  path: 'auth',
  scope: Scope.REQUEST,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
