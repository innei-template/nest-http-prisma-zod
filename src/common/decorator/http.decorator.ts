import { SetMetadata } from '@nestjs/common'

import { HTTP_RES_TRANSFORM_PAGINATE } from '~/constants/meta.constant'
import * as SYSTEM from '~/constants/system.constant'

export const Paginator: MethodDecorator = (
  target,
  key,
  descriptor: PropertyDescriptor,
) => {
  SetMetadata(HTTP_RES_TRANSFORM_PAGINATE, true)(descriptor.value)
}

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

export declare interface FileDecoratorProps {
  description: string
}

export const HTTPDecorators = {
  Paginator,
  Bypass,
}
