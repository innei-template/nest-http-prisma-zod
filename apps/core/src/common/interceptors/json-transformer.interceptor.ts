/**
 * 对响应体进行 JSON 标准的转换
 * @author Innei
 */
import { isObjectLike } from 'lodash'
import { map, Observable } from 'rxjs'
import snakecaseKeys from 'snakecase-keys'

import { RESPONSE_PASSTHROUGH_METADATA } from '@core/constants/system.constant'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JSONTransformerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler()
    // 跳过 bypass 装饰的请求
    const bypass = this.reflector.get<boolean>(
      RESPONSE_PASSTHROUGH_METADATA,
      handler,
    )
    if (bypass) {
      return next.handle()
    }
    const http = context.switchToHttp()

    if (!http.getRequest()) {
      return next.handle()
    }

    return next.handle().pipe(
      map((data) => {
        return this.serialize(data)
      }),
    )
  }

  private serialize(obj: any) {
    if (!isObjectLike(obj)) {
      return obj
    }
    return snakecaseKeys(obj, { deep: true })
  }
}
