import { HttpException } from '@nestjs/common'
import { ErrorCode, ErrorCodeEnum } from '~/constants/error-code.constant'

export class BusinessException extends HttpException {
  constructor(code: ErrorCodeEnum) {
    const [message, chMessage, status] = ErrorCode[code]
    super(
      HttpException.createBody({ code, message, chMessage }, message, status),
      status,
    )
  }
}
