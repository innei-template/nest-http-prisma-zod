import { HttpException } from '@nestjs/common'

import { ErrorCode, ErrorCodeEnum } from '~/constants/error-code.constant'

export class BizException extends HttpException {
  constructor(code: ErrorCodeEnum) {
    const [message, chMessage, status] = ErrorCode[code]
    super(HttpException.createBody({ code, message, chMessage }), status)
  }
}
