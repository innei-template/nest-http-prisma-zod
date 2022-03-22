/* eslint-disable import/order */
import { Logger } from '@nestjs/common'
import { mkdirSync } from 'fs'
import 'zx/globals'
import { DATA_DIR, LOG_DIR } from '~/constants/path.constant'
import { consola, registerStdLogger } from './consola.global'
import './dayjs.global'
import { isDev } from './env.global'

// 建立目录
function mkdirs() {
  mkdirSync(DATA_DIR, { recursive: true })
  Logger.log(chalk.blue(`Data dir is make up: ${DATA_DIR}`))

  mkdirSync(LOG_DIR, { recursive: true })
  Logger.log(chalk.blue(`Log dir is make up: ${LOG_DIR}`))
}

function registerGlobal() {
  $.verbose = isDev
  Object.assign(globalThis, {
    isDev,
    consola,
  })
  console.debug = (...rest) => {
    if (isDev) {
      consola.log.call(console, ...rest)
    }
  }
}

export function register() {
  mkdirs()
  registerStdLogger()

  registerGlobal()
}
