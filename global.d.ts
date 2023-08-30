import { Consola } from 'consola'

import 'zx/globals'

declare global {
  export const isDev: boolean

  export const consola: Consola
}

export {}
