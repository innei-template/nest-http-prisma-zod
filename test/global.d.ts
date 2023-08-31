import { Consola } from 'consola'

import 'vitest/globals'
import 'zx-cjs/globals'

declare global {
  export type KV<T = any> = Record<string, T>

  export const isDev: boolean

  export const consola: Consola
  export const cwd: string
}

export {}
