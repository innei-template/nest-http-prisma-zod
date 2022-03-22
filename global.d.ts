import { Consola } from 'consola'
import 'zx/globals'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Document, PaginateModel } from 'mongoose'
declare global {
  export const isDev: boolean

  export const consola: Consola

  export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>
}

export {}
