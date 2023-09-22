import { Global, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'

@Module({
  imports: [PassportModule],
  providers: [AuthService],
  exports: [AuthService],
})
@Global()
export class AuthModule {}
