import 'zx-cjs/globals'

import consola from 'consola'

declare const global: any

module.exports = () => {
  global.isDev = true
  global.cwd = process.cwd()
  global.consola = consola
}
