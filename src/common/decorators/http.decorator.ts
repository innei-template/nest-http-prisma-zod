import { SetMetadata } from '@nestjs/common'

import { HTTP_IDEMPOTENCE_OPTIONS } from '~/constants/meta.constant'
import * as SYSTEM from '~/constants/system.constant'

import { IdempotenceOption } from '../interceptors/idempotence.interceptor'

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

/**
 * 幂等
 */
export const Idempotence: (options?: IdempotenceOption) => MethodDecorator =
  (options) => (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value)
  }

export const HTTPDecorators = {
  Bypass,
  Idempotence,
}
