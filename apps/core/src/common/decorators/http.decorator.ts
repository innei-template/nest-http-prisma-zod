import { HTTP_IDEMPOTENCE_OPTIONS } from '@core/constants/meta.constant'
import * as SYSTEM from '@core/constants/system.constant'
import { SetMetadata } from '@nestjs/common'

import { IdempotenceOption } from '../interceptors/idempotence.interceptor'

/**
 * @description 跳过响应体处理
 */
const Bypass: MethodDecorator = (
  target,
  key,
  descriptor: PropertyDescriptor,
) => {
  SetMetadata(SYSTEM.RESPONSE_PASSTHROUGH_METADATA, true)(descriptor.value)
}

/**
 * 幂等
 */
const Idempotence: (options?: IdempotenceOption) => MethodDecorator =
  (options) => (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value)
  }

/**
 * @description 过滤响应体中的字段
 */
const ProtectKeys: (keys: string[]) => MethodDecorator =
  (keys) => (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(SYSTEM.OMIT_RESPONSE_PROTECT_KEYS, keys)(descriptor.value)
  }

export const HTTPDecorators = {
  Bypass,
  Idempotence,
  ProtectKeys,
}
