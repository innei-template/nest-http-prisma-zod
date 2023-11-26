/* eslint-disable prefer-rest-params */
import { createLogger } from 'nestjs-pretty-logger'

import { LOG_DIR } from '@core/constants/path.constant'

const logger = createLogger({
  writeToFile: {
    loggerDir: LOG_DIR,
  },
})
logger.wrapAll()
// HACK: forhidden pm2 to override this method
Object.defineProperty(process.stdout, 'write', {
  value: process.stdout.write,
  writable: false,
  configurable: false,
})
Object.defineProperty(process.stderr, 'write', {
  value: process.stdout.write,
  writable: false,
  configurable: false,
})

export { logger as consola }
