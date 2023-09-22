import { compareSync } from 'bcrypt'
import dayjs from 'dayjs'
import { isDate } from 'lodash'

import { BizException } from '@core/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '@core/constants/error-code.constant'
import { DatabaseService } from '@core/processors/database/database.service'
import { JWTService } from '@core/processors/helper/helper.jwt.service'
import { sleep } from '@core/shared/utils/tool.utils'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JWTService,
  ) {}

  get jwtServicePublic() {
    return this.jwtService
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
    return this.jwtService.sign(id)
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
