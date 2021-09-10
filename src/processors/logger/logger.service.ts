/* eslint-disable prefer-rest-params */
import { ConsoleLogger } from '@nestjs/common'
import { isDev } from '~/utils/environment.utils'

export class MyLogger extends ConsoleLogger {
  debug(message: any, stack?: string, context?: string) {
    if (isDev || global.DEBUG) {
      super.debug.apply(this, arguments)
    }
  }
}
