import { SetMetadata } from '@nestjs/common'

import * as SYSTEM from '~/constants/system.constant'

/**
 * @description 跳过响应体处理
 */
export const Bypass: MethodDecorator = (
  target,
  key,
  descriptor: PropertyDescriptor,
) => {
  SetMetadata(SYSTEM.RESPONSE_PASSTHROUGH_METADATA, true)(descriptor.value)
}

export const HTTPDecorators = {
  Bypass,
}
