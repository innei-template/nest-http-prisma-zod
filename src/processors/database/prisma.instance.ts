import {
  CustomPrismaService,
  loggingMiddleware,
  QueryInfo,
} from 'nestjs-prisma'

import { Logger } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

import { snowflakeGeneratorMiddleware } from './middlewares/snowflake'

const prismaClient = new PrismaClient()
prismaClient.$use(snowflakeGeneratorMiddleware)
prismaClient.$use(
  loggingMiddleware({
    logger: new Logger('PrismaMiddleware'),
    logLevel: 'log', // default is `debug`
    logMessage: (query: QueryInfo) =>
      `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
  }),
)

export const extendedPrismaClient = prismaClient.$extends({
  model: {
    $allModels: {
      // Define a new operation `customCall`.
      // T corresponds to the current model,
      // A corresponds to the arguments for the operation.
      async exists<T, A>(
        // `this` is the current type (for example
        // it might be `prisma.user` at runtime).
        this: T,
        x: Prisma.Exact<
          A,
          // For `customCall`, use the arguments from model `T` and the
          // operation `findFirst`. Add `customProperty` to the operation.
          Pick<Prisma.Args<T, 'findFirst'>, 'where'>
        >,

        // Get the correct result types for the model of type `T`,
        // and the arguments of type `A` for `findFirst`.
        // `Prisma.Result` computes the result for a given operation
        // such as `select {id: true}` in function `main` below.
        //
      ): Promise<boolean> {
        // Override type safety here, because we cannot
        // predict the result types in advance.

        if (typeof x !== 'object') {
          return false
        }
        if (!('where' in x)) {
          return false
        }
        const count = await (this as any).count({ where: x.where })

        return count > 0
      },
    },
  },
})

export type extendedPrismaClient = typeof extendedPrismaClient

export type ExtendedPrismaService = CustomPrismaService<extendedPrismaClient>
