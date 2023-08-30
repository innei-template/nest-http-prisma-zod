import { compareSync } from 'bcrypt'
import dayjs from 'dayjs'
import { isDate } from 'lodash'
import { nanoid } from 'nanoid'

import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BizException } from '~/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '~/constants/error-code.constant'
import { DatabaseService } from '~/processors/database/database.service'
import { resourceNotFoundWrapper } from '~/shared/utils/prisma.util'

import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  get jwtServicePublic() {
    return this.jwtService
  }

  private async getUserAuthCode(id: string) {
    const { authCode } = await this.db.prisma.user
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

  async validateUsernameAndPassword(username: string, password: string) {
    const user = await this.db.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user || !compareSync(password, user.password)) {
      await sleep(3000)
      throw new BizException(ErrorCodeEnum.AuthFail)
    }

    return user
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

  async generateAuthCode() {
    return nanoid(10)
  }

  isCustomToken(token: string) {
    return token.startsWith('txo') && token.length - 3 === 40
  }

  async verifyCustomToken(token: string) {
    const apiTokenRecord = await this.db.prisma.apiToken.findFirst({
      where: { token },
    })

    if (!apiTokenRecord) {
      return false
    }

    if (typeof apiTokenRecord.expired === 'undefined') {
      return true
    } else if (isDate(apiTokenRecord.expired)) {
      const isExpired = dayjs(new Date()).isAfter(apiTokenRecord.expired)
      return isExpired ? false : true
    }
  }
}
