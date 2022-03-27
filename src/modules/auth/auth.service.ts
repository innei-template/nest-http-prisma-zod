import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import dayjs from 'dayjs'
import { isDate, omit } from 'lodash'
import { customAlphabet } from 'nanoid/async'
import { TokenDto } from './auth.controller'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import {
  TokenModel,
  UserModel as User,
  UserDocument,
} from '~/modules/user/user.model'
import { InjectModel } from '~/transformers/model.transformer'
import { BusinessException } from '~/common/exceptions/business.excpetion'
import { ErrorCodeEnum } from '~/constants/error-code.constant'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) {}

  async signToken(_id: string) {
    const { authCode } = (await this.userModel
      .findById(_id)
      .select('authCode'))!

    const payload = {
      _id,
      authCode,
    }

    return this.jwtService.sign(payload)
  }
  async verifyPayload(payload: JwtPayload): Promise<UserDocument | null> {
    const user = await this.userModel.findById(payload._id).select('+authCode')
    if (!user) {
      throw new BusinessException(ErrorCodeEnum.MasterLostError)
    }
    return user && user.authCode === payload.authCode ? user : null
  }
}
