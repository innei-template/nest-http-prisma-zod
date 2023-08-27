import { PrismaService } from 'nestjs-prisma'

import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BizException } from '~/common/exceptions/biz.excpetion'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { resourceNotFoundWrapper } from '~/shared/utils/prisma.util'

import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async getUserAuthCode(id: string) {
    const { authCode } = await this.prisma.user
      .findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          authCode: true,
        },
      })
      .catch(
        resourceNotFoundWrapper(
          new BizException(ErrorCodeEnum.AuthFailUserNotExist),
        ),
      )

    return authCode
  }

  async signToken(id: string) {
    const authCode = await this.getUserAuthCode(id)
    const payload: JwtPayload = {
      id,
      authCode,
    }

    return this.jwtService.sign(payload)
  }
  async verifyPayload(payload: JwtPayload): Promise<boolean> {
    const authCode = await this.getUserAuthCode(payload.id)
    return authCode === payload.authCode
  }
}
